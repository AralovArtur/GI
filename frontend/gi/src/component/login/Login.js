import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './Login.css';

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


export default class Login extends Component {

    render() {
        return (
            <>
                <Form {...layout} name='basic' className='form-margin' onFinish={this.props.handleLogin}>
                    <Form.Item
                        label='Username'
                        name='usernameOrEmail'
                        rules={[
                            {
                                required: true,
                                max: 15,
                                message: 'Invalid username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder='Username'/>
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
                            Login
                        </Button>
                        <Button htmlType='submit'>
                            <a href='/signUp'>Sign up</a>
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}