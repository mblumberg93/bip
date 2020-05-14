import React, { Component } from 'react';

class Cup extends Component {
    handleClick() {
        this.props.handleClick();
    }

    render() {
        return (
            <div key={"square_" + this.props.side + this.props.index}
                 className={"cup cup-" + this.props.side + (this.props.visible ? " cup-visible" : "") + (this.props.active ? "" : " cup-inactive")}
                 onClick={() => this.handleClick()}>
            </div>
        );
    }
}

export default Cup;