import React, { Component } from 'react';
import './stylesheets/Card.css';

class Card extends Component {

  constructor(props) {
    super(props);
    const angle = Math.random() * 90 - 45;
    const x = Math.random() * 40 - 20;
    const y = Math.random() * 40 - 20;
    this._transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  }

  render() {

    return (
      <div className='Card__container'>
        <img
          className="Card"
          src={ this.props.image }
          alt={ this.props.name }
          style={ {transform: this._transform} }
        />
      </div>
    );
  }
}

export default Card;