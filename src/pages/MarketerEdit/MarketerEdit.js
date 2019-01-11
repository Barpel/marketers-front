import React, { Component } from 'react';
import './MarketerEdit.scss';

import { observer, inject } from 'mobx-react';

import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomRange from '../../components/CustomRange/CustomRange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@inject('store')
@observer
class MarketerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marketer: {
                firstName: '',
                lastName: '',
                email: '',
                siteUrl: '',
                linkedInUrl: '',
                experience: 0,
                budget: 1000
            },
            customSelectProps: {
                values: [0, 1, 2, 3],
                contentList: ['No Experience', '0-1 Years', '1-2 Years', 'Above 2 years'],
                name: 'experience'
            },
            showConfirmation: false,
            alert: { show: false, msg: '' }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRange = this.handleRange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    store = this.props.store;
    marketerStore = this.props.store.marketerStore;

    handleRange(ev) {
        this.setState({
            marketer: {
                ...this.state.marketer,
                budget: ev.target.value
            }
        });
        // console.log(this.state.marketer.budget);
    }

    handleSelect(name, val) {
        this.setState({
            marketer: {
                ...this.state.marketer,
                [name]: val
            }
        });
        // console.log(this.state.marketer[name]);
    }

    handleChange(ev) {
        var prop = ev.target.name
        this.setState({
            marketer: {
                ...this.state.marketer,
                [prop]: ev.target.value
            }
        })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const { email } = this.state.marketer;
        var isEmailValid = this.marketerStore.validateEmail(email);
        if (isEmailValid) {
            this.marketerStore.fetchMarketerByEmail(email)
                .then(marketer => {
                    if (!marketer) {
                        this.marketerStore.saveMarketer(this.state.marketer)
                            .then(res => {
                                this.setState({ showConfirmation: true });
                            })
                    } else this.toggleAlert('Already Registered!')
                })
        } else {
            this.toggleAlert('Please enter a valid email');
        }
    }

    resetForm() {
        this.setState({
            marketer: {
                firstName: '',
                lastName: '',
                email: '',
                siteUrl: '',
                linkedInUrl: '',
                experience: null,
                budget: 1000
            }
        })
    }

    toggleAlert(msg) {
        this.setState({
            alert: {
                show: true,
                msg
            }
        })
        setTimeout(() => {
            this.setState({ alert: { show: false, msg: '' } })
        }, 5000)
    }

    render() {
        const { marketer, showConfirmation, alert } = this.state
        return (
            <div className="marketer-edit-wrapper">
                <h1>Register</h1>
                {
                    !showConfirmation &&
                    <form onSubmit={this.handleSubmit} className="marketer-edit-form">
                        <label>
                            <input type="text" name="firstName"
                                onChange={this.handleChange} value={marketer.firstName} placeholder="First Name" />
                        </label>
                        <label>
                            <input type="text" name="lastName" onChange={this.handleChange} value={marketer.lastName} placeholder="Last Name" />
                        </label>
                        <label>
                            <input type="text" name="email"
                                onChange={this.handleChange} value={marketer.email} required placeholder="Email" />
                        </label>
                        <label>
                            <input type="text" name="siteUrl" onChange={this.handleChange} value={marketer.siteUrl} placeholder="Website Link" />
                        </label>
                        <label>
                            <input type="text" name="linkedInUrl" onChange={this.handleChange} value={marketer.linkedInUrl} placeholder="LinkedIn" />
                        </label>
                        <label>
                            <h3>
                                How many years of experience do you have with Facebook Marketing? <br />
                            </h3>
                            <CustomSelect onOptSelected={this.handleSelect}
                                selectProps={this.state.customSelectProps}></CustomSelect>
                        </label>
                        <label>
                            <CustomRange minVal={1000} maxVal={500000} currVal={marketer.budget}
                                onRangeChange={this.handleRange} step={1000} title="What was the biggest campagin budget you managed in a single month?"></CustomRange>
                        </label>
                        <button type="submit" className="submit-btn">Save</button>
                        <button type="button" className="reset-btn" onClick={this.resetForm}>Clear Form</button>
                    </form>
                }
                {
                    showConfirmation &&
                    <div className="after-edit-container">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle
                                className="path circle"
                                fill="none"
                                stroke="#73AF55"
                                strokeWidth="6"
                                strokeMiterlimit="10"
                                cx="65.1"
                                cy="65.1"
                                r="62.1"
                            ></circle>
                            <polyline
                                className="path check"
                                fill="none"
                                stroke="#73AF55"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                points="100.2,40.2 51.5,88.8 29.8,67.5 "
                            ></polyline>
                        </svg>
                        <h3 className="success">Success! <br />
                            Thank you, we will send you an email shortly.
                        </h3>
                    </div>
                }
                <div className={(alert.show) ? 'custom-alert shown' : 'custom-alert'}>
                    <h3>{alert.msg}</h3>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>

            </div>
        )
    }
}

export default MarketerEdit;



