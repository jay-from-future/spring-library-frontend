import React from 'react';
import {LoginForm} from '../dialog/LoginForm';
import {UserCredentials} from '../domain/UserCredentials';
import {getHistory} from '../service/history';
import base64 from 'base-64';

const auth = process.env.REACT_APP_AUTH_URL;

// todo these values shouldn't be hardcoded
const clientId = 'spring-library-jwt-client';
const clientSecret = 'admin1234';

type LoginPageState = {
    isInvalidCredentials: boolean,
    isLoading: boolean
}

export class LoginPage extends React.Component<any, LoginPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isInvalidCredentials: false,
            isLoading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(userCredentials: UserCredentials) {
        console.debug('LoginService.handleUserAuthentication');

        // block input fields and login button and reset alerts
        this.setState({
            isLoading: true,
            isInvalidCredentials: false
        });

        const method = 'POST';
        const body = 'grant_type=password&username=' + userCredentials.username + '&password=' + userCredentials.password;

        console.debug('LoginService.handleUserAuthentication body: ', body);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            // todo set client_id and client_secret to the parameters
            'Authorization': 'Basic ' + base64.encode(clientId + ':' + clientSecret)
        };

        fetch(`${auth}/oauth/token`, {
            method,
            headers,
            body
        }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('todo handle error', response);
                    // todo handle error
                    return undefined;
                }
            },
            error => {
                console.error('todo handle error', error);
                return undefined;
            }
        ).then(result => {
            console.debug('LoginService.handleUserAuthentication: response from the server: ', result);

            if (result && result.access_token) {
                // var decoded = jwt_decode(result.access_token);
                // console.debug(decoded);

                this.setState({
                    isLoading: false
                });

                localStorage.setItem('access_token', result.access_token);
                const history = getHistory();
                history.push('/');

            } else {
                // todo handle error
                console.error('todo handle error', result);
                this.setState({
                    isLoading: false,
                    isInvalidCredentials: true
                });
            }
        });
    };

    render() {
        const {isInvalidCredentials, isLoading} = this.state;
        return (
            <LoginForm onSubmit={this.handleSubmit} isInvalidCredentials={isInvalidCredentials} isLoading={isLoading}/>
        );
    }
}