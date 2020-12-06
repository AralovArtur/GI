import React, {Component} from 'react';
import {Table} from 'antd';

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code'
    },
    {
        title: 'DEP',
        dataIndex: 'dep',
        key: 'dep'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Personal Code',
        dataIndex: 'personalCode',
        key: 'personalCode'
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
    },
    {
        title: 'Visit Time',
        dataIndex: 'visitTime',
        key: 'visitTime'
    },
];

export default class PatientTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10
        }
    }

    handleTableChange = (pagination) => {
        this.setState({pageSize: pagination.pageSize});
    };

    render() {
        return (
            <Table onChange={this.handleTableChange} rowKey={record => record.code} columns={columns}
                   dataSource={this.props.patientsToShow} pagination={this.state} scroll={{y: 500}}/>
        );
    }
}