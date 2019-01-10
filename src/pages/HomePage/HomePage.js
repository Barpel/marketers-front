import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { NavLink } from 'react-router-dom';

import './HomePage.scss';

import landingImg from '../../assets/imgs/landing.jpg';

@inject('store')
@observer
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    marketerStore = this.props.store.marketerStore;

    render() {
        return (
            <section className="home-page">
                <img src={landingImg} alt="This must be the place" />
                <h1>
                    Welcome!<br />

                    <span>{this.marketerStore.marketersCount}</span>
                     &nbsp;Amazing {this.marketerStore.marketersCount > 1 ? 'Marketers have ' : 'Marketer has '} already joined us!
                </h1>
                <NavLink to="/marketer/register">
                    <button>Join</button>
                </NavLink>
            </section>
        )
    }
}

export default HomePage;