import React, { Component } from 'react';
import Card from "./Card";
import './stylesheets/Deck.css';

const axios = require('axios');
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      drawnCards: []
    };

    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    console.log(deck.data);
    this.setState({
      deck: deck.data
    })
  }

  async getCard() {
    const deck_id = this.state.deck.deck_id;
    try {
      const CARD_URL = `${API_BASE_URL}/${deck_id}/draw/`;
      const cardAPIResponse = await axios.get(CARD_URL);
      if (!cardAPIResponse.data.success) {
        throw new Error("The deck has run out of cards!");
      }
      const drawnCard = cardAPIResponse.data.cards[ 0 ];

      this.setState((currentState) => ({
        deck: cardAPIResponse.data,
        drawnCards: [
          ...currentState.drawnCards,
          {
            id: drawnCard.code,
            image: drawnCard.image,
            name: `${drawnCard.value} ${drawnCard.suit}`
          }
        ]
      }));
      console.log(this.state.drawnCards);
    }
    catch (error) {
      alert(error);
    }
  }

  render() {
    const cards = this.state.drawnCards.map(card => {
      return <Card
        key={ card.id }
        id={ card.id }
        name={ card.name }
        image={ card.image }
      />
    });

    return (
      <div className='Deck'>
        <h1>Card Dealer</h1>
        <button onClick={ this.getCard }>Get Card</button>
        <div className='Deck__cards-container'>
          { cards }
        </div>
      </div>
    );
  }
}

export default Deck;