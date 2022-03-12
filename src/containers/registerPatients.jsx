import React, { Component } from 'react';
import InputForm from '../components/InputForm.jsx';
import RadioForm from '../components/RadioForm.jsx';
import SelectForm from '../components/SelectForm.jsx';
import { withRouter } from "react-router-dom";

import { cpfMask } from '../components/mask'
import { toast } from 'react-toastify';
import CPF from '../components/CpfForm.jsx';
import Header from '../components/Header'

class Register extends Component {
    DATA;
    constructor(props) {
        super(props);


        this.eventName = this.eventName.bind(this);
        this.eventBirthDate = this.eventBirthDate.bind(this);
        this.eventCpf = this.eventCpf.bind(this);
        this.eventGender = this.eventGender.bind(this);
        this.eventAddress = this.eventAddress.bind(this);
        this.eventStatus = this.eventStatus.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            name: '',
            birthDate: '',
            cpf: '',
            gender: 'male',
            address: '',
            status: '1'
        }
    }

    // Event handlers
    eventName(event) {
        this.setState({ name: event.target.value })
    }

    eventBirthDate(event) {
        this.setState({ birthDate: event.target.value })
    }

    eventCpf(event) {
        this.setState({ cpf: cpfMask(event.target.value) })
    }

    eventGender(event) {
        this.setState({ gender: event.target.value })
    }

    eventAddress(event) {
        this.setState({ address: event.target.value })
    }

    eventStatus(event) {
        this.setState({ status: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault()
        if (localStorage.getItem('newPatient')) {
            var error = false;
            var newPatient = JSON.parse(localStorage.getItem('newPatient'))
            if (localStorage.getItem('patients')) {
                var patients = JSON.parse(localStorage.getItem('patients'))
                for (let i = 0; i < patients.length; i++) {
                    const e = patients[i];
                    newPatient.id = e.id + 1;
                    if (e.cpf === newPatient.cpf) {
                        toast.error('CPF já existente!', {
                            theme: "colored",
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        error = true;
                        break;
                    }
                }
                if (!error) {
                    patients.push(newPatient);
                    localStorage.setItem('patients', JSON.stringify(patients));
                    localStorage.removeItem('newPatient')
                    toast.success('Paciente cadastrado!', {
                        theme: "colored",
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                error = false;
            } else {
                var patients = [];
                newPatient.id = 1;
                patients.push(newPatient);
                localStorage.setItem('patients', JSON.stringify(patients));
                localStorage.removeItem('newPatient')
                alert('Paciente cadastrado!')
                this.props.history.go(0)
            }

        }
    }


    UNSAFE_componentDidMount() {
        this.DATA = JSON.parse(localStorage.getItem('newPatient'));

        console.log(this.DATA);
        if (localStorage.getItem('newPatient')) {
            this.setState({
                id: '',
                name: this.DATA.name,
                birthDate: this.DATA.birthDate,
                cpf: this.DATA.cpf,
                gender: this.DATA.gender,
                address: this.DATA.address,
                status: this.DATA.status
            })
        } else {
            this.setState({
                name: '',
                birthDate: '',
                cpf: '',
                gender: 'male',
                address: '',
                status: '1'
            })
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('newPatient', JSON.stringify(nextState));
    }

    render() {
        return (
            <>
                <div className="Main">
                    <Header title="Adicionar Paciente" />
                    <div className="register">
                        <form action="#" onSubmit={this.onFormSubmit}>
                            <div className="row">
                                <InputForm label="Nome do Paciente" value={this.state.name} onChange={this.eventName} flex="xl" required />
                            </div>
                            <div className="row">
                                <InputForm label="Data de nascimento" type="date" value={this.state.birthDate} onChange={this.eventBirthDate} flex="lg" required />
                                <CPF value={this.state.cpf} onChange={this.eventCpf} label="CPF" flex="lg" />
                                <SelectForm value={this.state.gender} onChange={this.eventGender} label="Genero" flex="lg">
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                    <option value="other">Outro</option>
                                </SelectForm>
                            </div>
                            <div className="row">
                                <InputForm label="Endereço" value={this.state.address} onChange={this.eventAddress} flex="xl" />
                                <RadioForm label="Status" flex="sm">
                                    <div className="row flex-center">
                                        <label className="small"><input type="radio" name="status" onChange={this.eventStatus} value="1" defaultChecked />Ativo</label>
                                        <label className="small"><input type="radio" name="status" onChange={this.eventStatus} value="0" />Inativo</label>
                                    </div>
                                </RadioForm>
                            </div>
                            <div className="row flex-end">
                                <div className="input-group">
                                    <button type="submit" className="btn btn-success">Adicionar</button>
                                </div>
                            </div>
                        </form>
                    </div></div>
            </>
        )
    }
}

export default withRouter(Register);