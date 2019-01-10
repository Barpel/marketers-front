import React, { Component } from 'react';
import './MarketerEdit.scss';

import { observer, inject } from 'mobx-react';

import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomRange from '../../components/CustomRange/CustomRange';

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
                experience: null,
                budget: 1000
            },
            customSelectProps: {
                values: [0, 1, 2, 3],
                contentList: ['No Experience', '0-1 Years', '1-2 Years', 'Above 2 years'],
                name: 'experience'
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRange = this.handleRange.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
        var isEmailValid = this.marketerStore.validateEmail(this.state.marketer.email);
        if (isEmailValid) {
            this.marketerStore.saveMarketer(this.state.marketer)
                .then(marketer => {
                    console.log(this.marketerStore.marketer);
                })
        } else {
            alert('Please enter a valid email');
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

    render() {
        const { marketer } = this.state
        return (
            <div className="marketer-edit-wrapper">
                <h1>Register</h1>
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
            </div>
        )
    }
}

export default MarketerEdit;



