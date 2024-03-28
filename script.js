const $time = document.querySelector('time');
const $paragraph = document.querySelector('#paragraph');
const $input = document.querySelector('input');

const INITIAL_TIME = 30;

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.`;

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(' ');
  currentTime = INITIAL_TIME;
  $time.textContent = currentTime;

  $paragraph.innerHTML = words.map((word, index) => {
    const letters = word.split('');

    return `
      <word-view>
        ${letters
          .map(letter => `<letter-view>${letter}</letter-view>`)
          .join('')
        }
      </word-view>
    `;
  }).join(' ');

  const $firstWord = document.querySelector('word-view');
  $firstWord.classList.add('active');
  $firstWord.querySelector('letter-view').classList.add('active');

  useTimer();
}

function initEvents() {
  document.addEventListener('keydown', () => {
    $input.focus();
  });
  $input.addEventListener('keydown', onKeyDown);
  $input.addEventListener('keyup', onKeyUp);
}

function onKeyDown() {}
function onKeyUp() {
  const $activeWord = document.querySelector('word-view.active');
  const $activeLetter = $activeWord.querySelector('letter-view.active');

  const currentWord = $activeWord.textContent.trim();
  $input.maxLength = currentWord.length;
  console.log({ value: $input.value, currentWord });

  const $allLetters = $activeWord.querySelectorAll('letter-view');

  $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'));
  $input.value.split('').forEach((letter, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];
    
    const isCorrect = letter === letterToCheck;
    const letterClass = isCorrect ? 'correct' : 'incorrect';
    $letter.classList.add(letterClass);
  });
}

function useTimer() {
  const interval = setInterval(() => {
    currentTime--;

    if (currentTime === 0) {
      clearInterval(interval);
      endGame();
    }

    $time.textContent = currentTime;
  }, 1000);
}

function endGame() {
  console.log('Game Over');
}
