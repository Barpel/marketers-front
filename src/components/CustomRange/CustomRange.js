import React from 'react';
import './CustomRange.scss';

export default props => {
    return (
        <div className="custom-range">
            <h3>{props.title}</h3>
            <div className="range-container">
                <input type="range" min={props.minVal} max={props.maxVal} className="range" value={props.currVal} onChange={props.onRangeChange} step={props.step} />
            </div>
            <div className="vals-container">
                <span>{props.minVal / 1000}K$</span>
                <span>{props.currVal / 1000}K$</span>
                <span>{props.maxVal / 1000}K$</span>
            </div>
        </div>
    )
}