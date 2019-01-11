import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Moment from 'react-moment';
import 'moment-timezone';

import './AdminPage.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@inject('store')
@observer
class AdminPage extends Component {
    selectedSort = 'createdAt';

    sortTable(sortParam) {
        this.selectedSort = sortParam;
        this.props.store.marketerStore.fetchMarketers(sortParam)
    }

    render() {
        const { marketers } = this.props.store.marketerStore;
        return (
            <div className="admin-page">
                <table>
                    <thead>
                        <tr>
                            <td>
                                #
                            </td>
                            <td onClick={() => this.sortTable('firstName')}
                                className={(this.selectedSort === 'firstName') ? 'selected' : ''}>
                                Name
                            </td>
                            <td onClick={() => this.sortTable('email')} className={(this.selectedSort === 'email') ? 'selected' : ''}>
                                Email
                            </td>
                            <td>
                                LinkedIn
                            </td>
                            <td>
                                Website URL
                            </td>
                            <td onClick={() => this.sortTable('experience')}
                                className={(this.selectedSort === 'experience') ? 'selected' : ''}>
                                Experience
                            </td>
                            <td onClick={() => this.sortTable('budget')} className={(this.selectedSort === 'budget') ? 'selected' : ''}>
                                Biggest Budget
                            </td>
                            <td onClick={() => this.sortTable('createdAt')} className={(this.selectedSort === 'createdAt') ? 'selected' : ''}>
                                Created
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {marketers.map((marketer, idx) => {
                            return <tr key={marketer._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    {
                                        !!marketer.firstName || !!marketer.lastName
                                            ? <span>{marketer.firstName} {marketer.lastName}</span>
                                            : <span>Not Provided</span>
                                    }
                                </td>
                                <td>{marketer.email}</td>
                                <td>
                                    {
                                        !!marketer.linkedInUrl
                                            ? <a
                                                href={marketer.linkedInUrl}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faLinkedin} />
                                            </a>
                                            : <span>None</span>
                                    }

                                </td>
                                <td>
                                    {
                                        !!marketer.siteUrl
                                            ? <a
                                                href={marketer.siteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            </a>
                                            : <span>None</span>
                                    }
                                </td>
                                <td>
                                    {
                                        marketer.experience
                                            ? <span>{marketer.experience} Years</span>
                                            : <span>Not Provided</span>
                                    }

                                </td>
                                <td>{marketer.budget / 1000}K$</td>
                                <td><Moment format="HH:mm DD.MM.YYYY">{marketer.createdAt}</Moment></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )

    }
}

export default AdminPage;