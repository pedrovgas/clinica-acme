import React, { Component } from 'react';
import InputForm from '../components/InputForm.jsx';
import RadioForm from '../components/RadioForm.jsx';
import SelectForm from '../components/SelectForm.jsx';
import { cpfMask } from '../components/mask'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import CPF from '../components/CpfForm.jsx';
import Header from '../components/Header'

class Edit extends Component {
    DATA;
    constructor(props) {

        super(props);
        const id = this.props.match.params.id;
        const patients = JSON.parse(localStorage.getItem('patients'))
        const editPatient = [];

        patients.forEach(e => {
            if (e.id == id) {
                this.state = {
                    id: id,
                    name: e.name,
                    birthDate: e.birthDate,
                    cpf: e.cpf,
                    gender: e.gender,
                    address: e.address,
                    status: e.status
                }
            }
        });

        this.eventName = this.eventName.bind(this);
        this.eventBirthDate = this.eventBirthDate.bind(this);
        this.eventCpf = this.eventCpf.bind(this);
        this.eventGender = this.eventGender.bind(this);
        this.eventAddress = this.eventAddress.bind(this);
        this.eventStatus = this.eventStatus.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);
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
        if (localStorage.getItem('editPatient')) {
            var error = false;
            var editPatient = JSON.parse(localStorage.getItem('editPatient'))
            if (localStorage.getItem('patients')) {
                var patients = JSON.parse(localStorage.getItem('patients'))
                patients.forEach(e => {
                    if (editPatient.cpf == e.cpf && editPatient.id != e.id) {
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
                    }
                });
                if (!error) {
                    patients.forEach(e => {
                        if (editPatient.id == e.id) {
                            e.name = editPatient.name;
                            e.birthDate = editPatient.birthDate;
                            e.cpf = editPatient.cpf;
                            e.gender = editPatient.gender;
                            e.address = editPatient.address;
                            e.status = editPatient.status;
                        }
                    });
                    toast.success('Paciente atualizado!', {
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
                    this.props.history.push("/consultar-pacientes");
                }
                error = false;
            }
        }
    }


    UNSAFE_componentDidMount() {
        this.DATA = JSON.parse(localStorage.getItem('editPatient'));

        console.log(this.DATA);
        if (localStorage.getItem('editPatient')) {
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
                status: 1
            })
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('editPatient', JSON.stringify(nextState));
    }

    render() {
        return (
            <>
                <div className="Main">
                    <Header title="Editar Pacientes" />
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
                                        <label className="small"><input type="radio" name="status" onChange={this.eventStatus} value="1" defaultChecked={this.state.status == "1" ? "checked" : ""} /> Ativo</label>
                                        <label className="small"><input type="radio" name="status" onChange={this.eventStatus} value="0" defaultChecked={this.state.status == "0" ? "checked" : ""} /> Inativo</label>
                                    </div>
                                </RadioForm>
                            </div>
                            <div className="row flex-end">
                                <div className="input-group">
                                    <button type="submit" className="btn btn-success">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div></div>
            </>
        )
    }
}

export default withRouter(Edit);