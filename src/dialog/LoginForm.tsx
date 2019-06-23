import React, {ChangeEvent, FormEvent} from 'react';
import '../styles/login.css';
import {UserCredentials} from '../domain/UserCredentials';

type LoginFormProps = {
    onSubmit: { (userCredentials: UserCredentials): void },
    isInvalidCredentials: boolean,
    isLoading: boolean
}

type LoginFormState = {
    username: string,
    password: string
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        console.debug('LoginForm.handleUsernameChange', e.currentTarget.value);
        this.setState({
            username: e.currentTarget.value
        });
    }

    handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        console.debug('LoginForm.handlePasswordChange');
        this.setState({
            password: e.currentTarget.value
        });
    }

    handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.debug('LoginForm.handleSubmit');
        const {username, password} = this.state;
        this.props.onSubmit(new UserCredentials(username, password));
    }

    render() {
        const {username, password} = this.state;
        const {isInvalidCredentials, isLoading} = this.props;

        return (
            <main role='main' className='flex-shrink-0'>
                <div className='container text-center'>
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
                        <div className="alert alert-danger" role="alert" hidden={!isInvalidCredentials}>
                            Incorrect username or password.
                        </div>
                        <fieldset>
                            <label htmlFor="inputUsername" className="sr-only">Username</label>
                            <input type="text" id="inputUsername" className="form-control" placeholder="Username"
                                   required autoFocus autoComplete="username" value={username}
                                   onChange={this.handleUsernameChange} disabled={isLoading} tabIndex={1}/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control"
                                   placeholder="Password" required autoComplete="current-password" value={password}
                                   onChange={this.handlePasswordChange} disabled={isLoading} tabIndex={2}/>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" hidden={isLoading}
                                    tabIndex={3}>Log in
                            </button>
                            <button className="btn btn-lg btn-primary btn-block" type="button" disabled
                                    hidden={!isLoading}>
                                <span className="spinner-border" role="status" aria-hidden="true"/>
                                Log in
                            </button>
                        </fieldset>
                    </form>
                </div>
            </main>
        );
    }
}