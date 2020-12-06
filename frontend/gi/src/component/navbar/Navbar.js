import React from 'react';
import {Menu} from 'antd';
import {HomeOutlined, UploadOutlined, UserOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Navbar.css'

const {SubMenu} = Menu;

export default class Navbar extends React.Component {

    render() {
        return (
            <nav className='navBar'>
                <div className='left-menu'>
                    <Menu mode='horizontal'>
                        {this.props.isAuthenticated === 'false' ? <Menu.Item key='home' icon={<HomeOutlined/>}>
                            <Link to='/'>Home</Link>
                        </Menu.Item> : <><Menu.Item key='patients' icon={<UsergroupAddOutlined/>}>
                            <Link to='/patients'>Patients</Link>
                        </Menu.Item>
                            <Menu.Item key='uploadFile' icon={<UploadOutlined/>}>
                                <Link to='/uploadFile'>Upload File</Link>
                            </Menu.Item>
                        </>}
                    </Menu>
                </div>
                <div className='right-menu'>
                    <Menu mode='horizontal'>
                        <SubMenu key='sub1' icon={<UserOutlined/>}>
                            {this.props.isAuthenticated === 'false' ?
                                <Menu.Item key='login'><a href='/login'>Login</a></Menu.Item>
                                : <Menu.Item key='logout'><Link to='/login'
                                                                onClick={this.props.handleLogout}>Logout</Link></Menu.Item>}
                            <Menu.Item key='signUp'><Link to='/signUp'>Sign up</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </nav>
        );
    }
}