import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import UploadFile from './component/uploadFile/UploadFile';
import Patient from './component/patient/Patient';
import Login from './component/login/Login';
import SignUp from './component/signUp/SignUp';
import Navbar from './component/navbar/Navbar';
import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL, CURRENT_USER, IS_AUTHENTICATED} from "./constant";

class GI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: localStorage.getItem(CURRENT_USER) || null,
            isAuthenticated: localStorage.getItem(IS_AUTHENTICATED) || 'false',
        };
    }

    handleLogout = () => {
        localStorage.setItem(CURRENT_USER, null);
        localStorage.setItem(IS_AUTHENTICATED, 'false');
        this.setState({currentUser: null, isAuthenticated: 'false'});
    };

    handleLogin = (credentials) => {
        axios.post(API_BASE_URL + '/auth/login', credentials)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                this.getCurrentUser()
                    .then(response => {
                        console.log(response);
                        this.setState({
                            currentUser: response.data,
                            isAuthenticated: 'true',
                        });
                        localStorage.setItem(IS_AUTHENTICATED, 'true');
                        localStorage.setItem(CURRENT_USER, response.data);
                        this.props.history.push('/patients');
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Something went wrong, please try again!');
                    });
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401)
                    alert('Your Username or Password is incorrect. Please try again!');
                else
                    alert('Something went wrong, please try again!');
            });
    };

    getCurrentUser() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('No access token set.');
        }

        return axios.get(API_BASE_URL + '/user/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    render() {
        return (
            <>
                <Navbar isAuthenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}/>
                <Switch>
                    <Route path='/patients' exact={true} component={Patient}/>
                    <Route path='/uploadFile' exact={true} component={UploadFile}/>
                    <Route path='/login' render={() => <Login handleLogin={this.handleLogin}/>}/>
                    <Route path='/signUp' exact={true} component={SignUp}/>
                </Switch>
            </>
        )
    }
}

export default withRouter(GI);
