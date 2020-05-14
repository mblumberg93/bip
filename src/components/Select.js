import React, { Component } from 'react';

class Select extends Component {
    handleChange(e) {
        if (e.target.value) {
            this.props.handleChange(e.target.value);
        }
    }

    render() {
        const options = this.props.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.name}</option>
        });
        return (
            <div className="custom-select">
                <label>
                    { this.props.label }
                    <select onChange={this.handleChange.bind(this)} value={this.props.value}>
                        <option key="please-select" value={null}>Select an Option</option>
                        { options }
                    </select>
            </label>
          </div>
        );
    }
}

export default Select;