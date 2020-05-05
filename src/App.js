import React, { Component } from "react";
import "./App.css";
import Cards from "./components/Cards";
import "./components/Card.css";
import front1 from "./img/front1.png";
import front2 from "./img/front2.png";
import front3 from "./img/front3.png";
import front4 from "./img/front4.png";
import front5 from "./img/front5.png";
import front6 from "./img/front6.png";
import front7 from "./img/front7.png";
import front8 from "./img/front8.png";

class App extends Component {
  state = {
    allCards: [
      {
        id: 1,
        description: "Card 1",
        frontImg: front1,
        flipped: false,
        matched: false,
      },
      {
        id: 2,
        description: "Card 1",
        frontImg: front1,
        flipped: false,
        matched: false,
      },
      {
        id: 3,
        description: "Card 2",
        frontImg: front2,
        flipped: false,
        matched: false,
      },
      {
        id: 4,
        description: "Card 2",
        frontImg: front2,
        flipped: false,
        matched: false,
      },
      {
        id: 5,
        description: "Card 3",
        frontImg: front3,
        flipped: false,
        matched: false,
      },
      {
        id: 6,
        description: "Card 3",
        frontImg: front3,
        flipped: false,
        matched: false,
      },
      {
        id: 7,
        description: "Card 4",
        frontImg: front4,
        flipped: false,
        matched: false,
      },
      {
        id: 8,
        description: "Card 4",
        frontImg: front4,
        flipped: false,
        matched: false,
      },
      {
        id: 9,
        description: "Card 5",
        frontImg: front5,
        flipped: false,
        matched: false,
      },
      {
        id: 10,
        description: "Card 5",
        frontImg: front5,
        flipped: false,
        matched: false,
      },
      {
        id: 11,
        description: "Card 6",
        frontImg: front6,
        flipped: false,
        matched: false,
      },
      {
        id: 12,
        description: "Card 6",
        frontImg: front6,
        flipped: false,
        matched: false,
      },
      {
        id: 13,
        description: "Card 7",
        frontImg: front7,
        flipped: false,
        matched: false,
      },
      {
        id: 14,
        description: "Card 7",
        frontImg: front7,
        flipped: false,
        matched: false,
      },
      {
        id: 15,
        description: "Card 8",
        frontImg: front8,
        flipped: false,
        matched: false,
      },
      {
        id: 16,
        description: "Card 8",
        frontImg: front8,
        flipped: false,
        matched: false,
      },
    ],
    flippedBoth: 0,
    firstCard: "",
    secondCard: "",
    points: 0,
    mistakes: 0,
  };

  componentDidMount() {
    this.shuffleAll();
  }

  handleClick = (card) => {
    if (this.state.flippedBoth === 0) {
      this.flipInUI(card);
      this.setState({ firstCard: card });
      this.countFlipped();
    } else if (this.state.flippedBoth === 1) {
      this.flipInUI(card);
      this.setState({ secondCard: card });
      this.countFlipped();
    }
  };

  flipInUI = (card) => {
    const allCards = [...this.state.allCards];
    const index = allCards.indexOf(card);
    allCards[index] = { ...allCards[index] };
    allCards[index].flipped = !allCards[index].flipped;
    this.setState({ allCards });
  };

  unFlipInUI = () => {
    const allCards = [...this.state.allCards];
    const unMatchedCards = allCards.filter((card) => card.matched !== true);
    unMatchedCards.map((card) => (card.flipped = false));
    this.setState({ allCards });
  };

  countFlipped = () => {
    const flippedBoth = this.state.flippedBoth;
    this.setState({ flippedBoth: flippedBoth + 1 });
    setTimeout(() => {
      this.handleEval();
    }, 200);
  };

  handleEval = () => {
    let { points, mistakes } = this.state;

    if (this.state.flippedBoth === 2) {
      if (
        this.state.firstCard.description === this.state.secondCard.description
      ) {
        points = points + 1;
        this.setState({ points });
        this.blockMatched();
      } else {
        mistakes = mistakes + 1;
        this.setState({ mistakes });
        this.resetFlipped();
        this.unFlipInUI();
      }
    }
  };

  blockMatched = () => {
    const allCards = [...this.state.allCards];
    const matchedCards = allCards.filter((card) => card.flipped === true);
    matchedCards.map((card) => (card.matched = true));
    allCards[matchedCards] = { ...allCards[matchedCards] };
    allCards[matchedCards].matched = true;
    this.setState({ allCards });
    setTimeout(() => {
      this.resetFlipped();
    }, 200);
  };

  resetFlipped = () => {
    const flippedBoth = 0;
    const firstCard = false;
    const secondCard = false;
    this.setState({ flippedBoth, firstCard, secondCard });
  };

  shuffleAll() {
    const allCards = [...this.state.allCards];
    let counter = allCards.length;
    while (counter > 0) {
      let randomIndex = Math.floor(Math.random() * counter);
      counter--;
      let addCurrent = { ...allCards[counter] };
      let addRandom = { ...allCards[randomIndex] };
      allCards[counter] = addRandom;
      allCards[randomIndex] = addCurrent;
    }
    this.setState({ allCards });
  }

  handleRestart = () => {
    const allCards = [...this.state.allCards];
    allCards.map((card) => [(card.matched = false), (card.flipped = false)]);
    this.setState({ allCards });
    this.setState({
      flippedBoth: 0,
      firstCard: "",
      secondCard: "",
      points: 0,
      mistakes: 0,
    });
    this.shuffleAll();
  };

  render() {
    const { allCards, points, mistakes } = this.state;

    return (
      <>
        <h1 className="main__title">Memory game</h1>
        <h3 className="main__subtitle">
          Can you remember where the cards are?
        </h3>
        <div className="main__scores">
          <h4>
            Points:
            <span className="main__scores-points">{points}</span>
          </h4>
          <h4>
            Mistakes:
            <span className="main__scores-mistakes">{mistakes}</span>
          </h4>
        </div>
        <Cards allCards={allCards} onClick={this.handleClick} />
        {points === 8 && (
          <button className="btn-restart" onClick={this.handleRestart}>
            Restart game
          </button>
        )}
        <p className="footer"> ©2020 The Glitch UI </p>
      </>
    );
  }
}

export default App;
