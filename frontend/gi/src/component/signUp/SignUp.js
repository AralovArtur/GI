import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import axios from "axios";
import {API_BASE_URL} from "../../constant";

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 5,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

export default class SignUp extends Component {

    handleSignUp = (credentials) => {

        axios.post( API_BASE_URL + '/auth/signUp', credentials)
            .then(response => {
                console.log(response);
                alert(response.data.message);
                this.props.history.push('/login');
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data);
            });
    };

    render() {
        return (
            <>
                <Form {...layout} name='basic' className={'form-margin'} onFinish={this.handleSignUp}>
                    <Form.Item
                        label='Full name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                max: 40,
                                message: 'Invalid full name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                max: 15,
                                message: 'Invalid username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                max: 40,
                                message: 'Invalid email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                max: 100,
                                message: 'Invalid password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined/>}
                            type='password'
                            placeholder='Password'
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}