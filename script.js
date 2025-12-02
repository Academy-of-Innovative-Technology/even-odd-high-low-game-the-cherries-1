 document.addEventListener("DOMContentLoaded", function () {
      let secretNumber = Math.floor(Math.random() * 10001);
      let wins = 0, losses = 0, rounds = 0, streak = 0, retries = 0;

      const guessInput = document.querySelector(".guess");
      const guessesDiv = document.querySelector(".guesses");
      const winsDiv = document.querySelector(".wins");
      const lossesDiv = document.querySelector(".losses");
      const roundsDiv = document.querySelector(".rounds");
      const streakDiv = document.querySelector(".streak");
      const retriesDiv = document.querySelector(".retries");
      const hintCheckbox = document.querySelector(".hint");

      const submitBtn = document.querySelector(".submit");
      const retryBtn = document.querySelector(".retry");
      const giveUpBtn = document.querySelector(".giveUp");
      const resetBtn = document.querySelector(".reset");

      function updateScore() {
        winsDiv.textContent = wins;
        lossesDiv.textContent = losses;
        roundsDiv.textContent = rounds;
        streakDiv.textContent = streak;
        retriesDiv.textContent = retries;
      }

      function resetRound() {
        secretNumber = Math.floor(Math.random() * 10001);
        guessesDiv.textContent = "";
        guessInput.value = "";
        retries = 0;
        updateScore();
      }

      function showHint(number) {
        if (!hintCheckbox.checked) return "";
        return number % 2 === 0 ? "Even" : "Odd";
      }

      function handleGuess() {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 0 || guess > 10000) {
          alert("Enter a valid number between 0 and 10000.");
          return;
        }

        retries++;
        guessesDiv.textContent += `Your guess: ${guess} - `;

        if (guess === secretNumber) {
          guessesDiv.textContent += `Correct! \n`;
          wins++;
          rounds++;
          streak++;
          updateScore();
          resetRound();
        } else {
          guessesDiv.textContent += guess < secretNumber ? "Too low" : "Too high";
          guessesDiv.textContent += ` (${showHint(secretNumber)})\n`;
          streak = 0;
          updateScore();
        }

        guessInput.value = "";
        guessInput.focus();
      }

      function handleRetry() {
        retries++;
        guessInput.value = "";
        guessesDiv.textContent += `Retry! You have tried ${retries} times\n`;
        updateScore();
      }

      function handleGiveUp() {
        guessesDiv.textContent += `You gave up! The number was ${secretNumber}.\n`;
        losses++;
        rounds++;
        streak = 0;
        updateScore();
        resetRound();
      }

      function handleReset() {
        wins = 0; losses = 0; rounds = 0; streak = 0; retries = 0;
        resetRound();
      }

      submitBtn.addEventListener("click", handleGuess);
      retryBtn.addEventListener("click", handleRetry);
      giveUpBtn.addEventListener("click", handleGiveUp);
      resetBtn.addEventListener("click", handleReset);

      updateScore();
    });