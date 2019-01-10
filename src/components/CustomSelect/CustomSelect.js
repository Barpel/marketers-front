import React, { Component } from 'react';
import './CustomSelect.scss';

export default class CustomSelect extends Component {
    constructor(props) {
        super(props)
        this.state = { optsClass: 'hidden', selectTitle: props.selectProps.name }
        // this.showOpts = this.showOpts.bind(this)
    }
    style = {}
    showOpts() {
        if (this.state.optsClass === 'hidden') {
            this.setState({ optsClass: 'shown' })
        } else this.setState({ optsClass: 'hidden' })
    }
    changeTitle(content) {
        this.setState({ selectTitle: content })
    }
    render() {
        const { optsClass, selectTitle } = this.state
        return (
            <div className="custom-select" >
                <span onClick={() => this.showOpts()}>
                    <span >{selectTitle}</span>
                    <span>⮟</span>
                </span>
                <ul className={optsClass}>
                    {this.props.selectProps.contentList.map((content, idx) =>
                        <li key={idx}
                            onClick={() => {
                                this.props.onOptSelected(this.props.selectProps.name,
                                    this.props.selectProps.values[idx])
                                this.changeTitle(content)
                                this.showOpts()
                            }}
                            ref={idx}>
                            {content}
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}