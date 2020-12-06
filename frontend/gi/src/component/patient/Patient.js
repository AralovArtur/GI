import React, {Component} from 'react';
import PatientTable from './PatientTable';
import PatientInput from './PatientInput';
import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constant";

export default class Patient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            patientsToShow: []
        }
    }

    getPatients = () => {
        return axios.get(API_BASE_URL + '/patients', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    };


    async componentDidMount() {
        let patients = await this.getPatients();
        this.setState({patients: patients});
        this.setState({patientsToShow: this.state.patients});
    }

    handlePatientsToShow = (event) => {
        let insertedIdCode = event.target.value;
        let patientsToShow = [...this.state.patients].filter(patient => {
            return patient.personalCode.includes(insertedIdCode);
        });
        this.setState({patientsToShow: patientsToShow});
    };


    render() {
        return (
            <>
                <PatientInput handlePatientsToShow={this.handlePatientsToShow}/>
                <PatientTable patientsToShow={this.state.patientsToShow}/>
            </>
        );
    }
}