import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import { toast } from 'react-toastify';
import Header from '../components/Header'

class Patients extends Component {
    state = {
        filter: "",
        data: JSON.parse(localStorage.getItem('patients')),
    };

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    handleToggleStatus = id => {
        const patients = JSON.parse(localStorage.getItem('patients'));
        patients.forEach(e => {
            if (e.id == id) {
                if(e.status == "1"){
                    e.status = 0;
                }else{
                    e.status = 1;
                }
            }
        });
        toast.success('Status atualizado!', {
            theme: "colored",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.setItem('patients', JSON.stringify(patients));
        localStorage.removeItem('editPatient')
        this.props.history.go(0)
    };


    formatDate(input) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1], day = datePart[2];

        return day + '/' + month + '/' + year;
    }


    render() {
        const { filter, data } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                item.name.toLowerCase().includes(lowercasedFilter)
            );
        });

        return (
            <>
                <div className="Main">
                    <Header title="Consultar Pacientes" />
                    <div className="consult">
                        <div className="patients-filter">
                            <span className="material-icons">search</span>
                            <input value={filter} onChange={this.handleChange} />
                        </div>
                        <div className="container">
                            <table id="table-patients">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Data Nasc.</th>
                                        <th>Sexo</th>
                                        <th>Endereço</th>
                                        <th>Status</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(item => (
                                        <tr key={item.id} className={item.status == 1 ? '' : 'disabled'}>
                                            <td>{item.name} </td>
                                            <td>{item.cpf}</td>
                                            <td>{this.formatDate(item.birthDate)}</td>
                                            <td>{item.gender == 'male' ? 'Masculino' : item.gender == 'female' ? 'Feminino' : 'Outro'}</td>
                                            <td>{item.address}</td>
                                            <td>{item.status == 1 ? 'Ativo' : 'Inativo'}</td>
                                            <td className="text-center">
                                                <Link to={"/editar-pacientes/" + item.id}>
                                                    <button className="btn-sm btn-primary"><span className="material-icons">edit</span></button>
                                                </Link>
                                                {item.status == 1 ?
                                                    <button onClick={() => this.handleToggleStatus(item.id)} className={"btn-sm btn-danger"}><span className="material-icons">toggle_off</span></button>
                                                    :
                                                    <button onClick={() => this.handleToggleStatus(item.id)} className={"btn-sm btn-muted"}><span className="material-icons">toggle_on</span></button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Patients);
