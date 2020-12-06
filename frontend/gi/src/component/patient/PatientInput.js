import React, {Component} from 'react';
import {Input} from 'antd';

export default class PatientInput extends Component {

    render() {
        return (
            <Input placeholder='Personal identification code' onChange={this.props.handlePatientsToShow}/>
        );
    }
}