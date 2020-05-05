import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className={this.getCardClasses()} onClick={this.blockClick()}>
        {this.props.card.flipped && (
          <img
            src={this.props.card.frontImg}
            alt={this.props.card.description}
          />
        )}
      </div>
    );
  }

  getCardClasses() {
    let classes = "Card showFace-";
    classes += this.props.card.flipped === false ? "back" : "front";
    return classes;
  }

  blockClick = () => {
    if (this.props.card.matched === true) {
      return null;
    } else {
      return () => this.props.onClick(this.props.card);
    }
  };
}

export default Card;
