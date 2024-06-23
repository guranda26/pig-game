'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let firstScore = document.getElementById('score--0');
let secondScore = document.getElementById('score--1');
const buttonRoll = document.querySelector('.btn--roll');
const buttonNew = document.querySelector('.btn--new');
const buttonHold = document.querySelector('.btn--hold');
let randomNum;
let diceEl = document.querySelector('.dice');
let currentScore1 = document.querySelector('#current--0');
let currentScore2 = document.querySelector('#current--1');

let scores, sumCurrentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  sumCurrentScore = 0;
  activePlayer = 0;
  playing = true;

  firstScore.textContent = 0;
  secondScore.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  sumCurrentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// Rolling dice functionality
buttonRoll.addEventListener('click', () => {
  if (playing) {
    randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNum);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNum}.png`;
    if (randomNum !== 1) {
      sumCurrentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        sumCurrentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += sumCurrentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
