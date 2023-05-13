"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice0El = document.querySelector(".dice--0");
const dice1El = document.querySelector(".dice--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const name0El = document.getElementById("name--0");
const name1El = document.getElementById("name--1");

// --------------------------------------------------------
// Dodatek:
// - 2 kości w grze
// - jeśli wypadną 2 takie same kości to punkty x2
// - jeśli którakolwiek z kości to 1 -> switchPlayer

// - zdobądź punkty w okolicach pełnych setek by wygrać. Kolejna setka to przedział większy o 1. Jak przekroczysz 505 to wygrywa przeciwnik.
// --------------------------------------------------------

// Starting conditions
let scores, currentScore, activePlayer, playing;

// Initialize game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  name0El.textContent = "PLAYER 1";
  name1El.textContent = "PLAYER 2";

  dice0El.classList.add("hidden");
  dice1El.classList.add("hidden");
};
init();

// Animate rolls
const spinning0 = [
  { transform: "translateX(-50%) rotate(0) scale(1)" },
  { transform: "translateX(-50%) rotate(90deg) scale(1.25)" },
  { transform: "translateX(-50%) rotate(180deg) scale(1)" },
];
const spinning1 = [
  { transform: "translateX(-50%) rotate(0) scale(1)" },
  { transform: "translateX(-50%) rotate(-90deg) scale(1.25)" },
  { transform: "translateX(-50%) rotate(-180deg) scale(1)" },
];

// Switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Player rolls a dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    dice0El.classList.remove("hidden");
    dice1El.classList.remove("hidden");

    let roll0 = Math.trunc(Math.random() * 6 + 1);
    let roll1 = Math.trunc(Math.random() * 6 + 1);
    dice0El.src = `dice-${roll0}.png`;
    dice1El.src = `dice-${roll1}.png`;

    let rollingTime0 = Math.trunc(Math.random() * 150 + 120);
    let rollingTime1 = Math.trunc(Math.random() * 150 + 120);
    dice0El.animate(spinning0, {
      duration: rollingTime0,
      iterations: 1,
    });
    dice1El.animate(spinning1, {
      duration: rollingTime1,
      iterations: 1,
    });

    if (roll0 === 1 || roll1 === 1) {
      switchPlayer();
    } else {
      currentScore += roll0 === roll1 ? 2 * (roll0 + roll1) : roll0 + roll1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// Player holds their score
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (
      (scores[activePlayer] >= 100 && scores[activePlayer] <= 101) ||
      (scores[activePlayer] >= 200 && scores[activePlayer] <= 202) ||
      (scores[activePlayer] >= 300 && scores[activePlayer] <= 303) ||
      (scores[activePlayer] >= 400 && scores[activePlayer] <= 404) ||
      (scores[activePlayer] >= 500 && scores[activePlayer] <= 505)
    ) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document.getElementById(`name--${activePlayer}`).textContent = "WINNER!";
    } else {
      if (scores[activePlayer] > 505) {
        switchPlayer();
        playing = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        document.getElementById(`name--${activePlayer}`).textContent =
          "WINNER!";
      } else switchPlayer();
    }
  }
});

// Player resets game
btnNew.addEventListener("click", init);
