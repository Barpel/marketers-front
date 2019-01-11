import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { Redirect } from 'react-router-dom';

import './AdminLogin.scss';

@inject('store')
@observer
class AdminLogin extends Component {
    marketerStore = this.props.store.marketerStore;
    adminStore = this.props.store.adminStore;

    constructor(props) {
        super(props)
        this.state = { admin: { username: '', password: '' }, isLoggedIn: false }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        const props = ev.target.name;
        this.setState({
            admin: {
                ...this.state.admin,
                [props]: ev.target.value
            }
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.adminStore.loginAdmin(this.state.admin);
        this.setState({ isLoggedIn: this.adminStore.isAdminLogged })
    }

    render() {

        const { admin, isLoggedIn } = this.state;
        return (
            <section className="admin-login">
                {
                    !isLoggedIn &&
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h1>Administrator Login</h1>
                        <label>
                            <input type="text" placeholder="Username" name="username"
                                onChange={this.handleChange} value={admin.username} />
                        </label>
                        <label>
                            <input type="password" placeholder="Password" name="password"
                                onChange={this.handleChange} value={admin.password} />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                }
                {
                    isLoggedIn &&
                    <Redirect to="/admin" />
                }
            </section>
        )
    }
}

export default AdminLogin;