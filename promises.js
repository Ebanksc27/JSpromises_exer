// 1. fact about favorite number
fetch('http://numbersapi.com/7?json')
  .then(response => response.json())
  .then(data => {
    console.log(data.text);  // This will log fun fact about number
  })
  .catch(error => {
    console.error('ERROR:', error);
  });

// 2. multiple numbers in a single request by separation with commas
fetch('http://numbersapi.com/7,8,9?json')
  .then(response => response.json())
  .then(data => {
    for(let num in data) {
      console.log(`${num}: ${data[num].text}`);
    }
  })
  .catch(error => {
    console.error('ERROR:', error);
  });

// 3. Four facts about favorite number with Prommise.all
const getFact = () => {
    return fetch('http://numbersapi.com/7?json')
      .then(response => response.json())
      .then(data => data.text);
  };
  
  Promise.all([getFact(), getFact(), getFact(), getFact()])
    .then(facts => {
      facts.forEach(fact => console.log(fact));
    })
    .catch(error => {
      console.error('ERROR:', error);
    });

// Part 2 Deck of Cards logic
// initializes a new deck when the page loads. When you click the "Draw a Card" button, 
// it fetches a card from the deck and displays its image. 
// If there are no cards left in the deck, it disables the button and alerts the user.
const drawCardButton = document.getElementById('drawCard');
const cardImage = document.getElementById('cardImage');

let deckId;

// Initialize a new deck when the page loads
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
  })
  .catch(error => {
    console.error('There was an error with the fetch operation:', error);
  });

drawCardButton.addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      if (data.remaining === 0) {
        drawCardButton.disabled = true;
        alert('No more cards left in the deck!');
        return;
      }
      const card = data.cards[0];
      cardImage.src = card.image;
      cardImage.style.display = 'block';
    })
    .catch(error => {
      console.error('There was an error with the fetch operation:', error);
    });
});



// Part 2: Deck of Cards. 
// 1. Request single card from newly shuffled deck
fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
  .then(response => response.json())
  .then(data => {
    const { value, suit } = data.cards[0];
    console.log(`${value} of ${suit}`);
  })
  .catch(error => {
    console.error('ERROR', error);
  });

// 2. Request two cards from the deck
let deckId;

fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
    const { value, suit } = data.cards[0];
    console.log(`${value} of ${suit}`);
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  })
  .then(response => response.json())
  .then(data => {
    const { value, suit } = data.cards[0];
    console.log(`${value} of ${suit}`);
  })
  .catch(error => {
    console.error('ERROR:', error);
  });

  



