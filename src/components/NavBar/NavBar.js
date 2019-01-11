import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';

export default props => {
    return (
        <header className="nav-bar">
            <nav>
                <ul>
                    <NavLink exact activeClassName="active-link" to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink activeClassName="active-link" to="/marketer/register">
                        <li>Register</li>
                    </NavLink>
                    <NavLink activeClassName="active-link" to="/login">
                        <li>Admin</li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}