import React, { useEffect, useState } from "react";

const pokemonList = [
    'Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur',
    'Jigglypuff', 'Meowth', 'Eevee', 'Psyduck'
  ];
  
const shuffledCards = () => {
    const cards = [...pokemonList, ...pokemonList]
      .sort(() => Math.random() - 0.5)
      .map((name, index) => ({ id: index, name, flipped: false, matched: false, incorrect: false }));
    return cards;
};

const Dashboard = () => {
    const [cards, setCards] = useState(shuffledCards());
    const [selectedCards, setSelectedCards] = useState([]);
  
    const handleCardClick = (index) => {
      if (selectedCards.length === 2 || cards[index].flipped) return;
  
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setSelectedCards([...selectedCards, index]);
    };
  
    useEffect(() => {
      if (selectedCards.length === 2) {
        const [first, second] = selectedCards;
        if (cards[first].name === cards[second].name) {
          setCards(prevCards => prevCards.map(card =>
            card.name === cards[first].name ? { ...card, matched: true, incorrect: false } : card
          ));
        } else {
          setCards(prevCards => prevCards.map((card, idx) =>
            idx === first || idx === second ? { ...card, incorrect: true } : card
          ));
          setTimeout(() => {
            setCards(prevCards => prevCards.map((card, idx) =>
              idx === first || idx === second ? { ...card, flipped: false, incorrect: false } : card
            ));
          }, 1000);
        }
        setSelectedCards([]);
      }
    }, [selectedCards, cards]);

    return (
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? (card.matched ? 'matched' : card.incorrect ? 'incorrect' : 'flipped') : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped || card.matched ? card.name : ''}
          </div>
        ))}
      </div>
    );
};

export default Dashboard;


