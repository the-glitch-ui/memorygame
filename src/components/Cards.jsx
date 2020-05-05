import React, { Component } from "react";
import Card from "./Card";

class Cards extends Component {
  render() {
    const { allCards, onClick } = this.props;

    return (
      <div className="cards-container">
        {allCards.map(card => (
          <Card key={card.id} card={card} onClick={onClick} />
        ))}
      </div>
    );
  }
}

export default Cards;
