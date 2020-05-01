import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        this.props.handleChange(e.target.value);
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
                        { options }
                    </select>
            </label>
          </div>
        );
    }
}

export default Select;