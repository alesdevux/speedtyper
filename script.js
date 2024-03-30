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
  $input.value = '';

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

function onKeyDown(event) {
  const $activeWord = $paragraph.querySelector('word-view.active');
  const $activeLetter = $activeWord.querySelector('letter-view.active');

  const { key } = event;
  if (key === ' ') {
    event.preventDefault();

    const $nextWord = $activeWord.nextElementSibling;
    const $nextLetter = $nextWord.querySelector('letter-view');

    $activeWord.classList.remove('active', 'marked');
    $activeLetter.classList.remove('active');
    $nextWord.classList.add('active');
    $nextLetter.classList.add('active');

    $input.value = '';

    const hasMissedLetters = $activeWord.querySelectorAll('letter-view:not(.correct)').length > 0;

    const addCheckClassForWord = hasMissedLetters ? 'marked' : 'correct';
    $activeWord.classList.add(addCheckClassForWord);
    return;
  }

  if (key === 'Backspace') {
    console.log('backspace');
    const $prevWord = $activeWord.previousElementSibling;
    const $prevLetter = $activeLetter.previousElementSibling;
    
    if(!$prevWord && !$prevLetter) {
      event.preventDefault();
      return;
    }
    
    const $wordMarked = $paragraph.querySelector('word-view.marked');
    if($wordMarked && !$prevLetter) {
      event.preventDefault();
      $prevWord.classList.remove('marked');
      $prevWord.classList.add('active');

      const $letterToFocus = $prevWord.querySelector('letter-view:last-child');

      $activeLetter.classList.remove('active');
      $letterToFocus.classList.add('active');

      $input.value = [
        ...$prevWord.querySelectorAll('letter-view.correct, letter-view.incorrect')
      ].map($el => {
        return $el.classList.contains('correct') ? $el.innerText : ' ';
      }).join('');
    }
  }
}

function onKeyUp() {
  const $activeWord = $paragraph.querySelector('word-view.active');
  const $activeLetter = $activeWord.querySelector('letter-view.active');

  const currentWord = $activeWord.innerText.trim();
  $input.maxLength = currentWord.length;
  console.log({ value: $input.value, currentWord });

  const $allLetters = $activeWord.querySelectorAll('letter-view');

  $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'));
  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];
    
    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? 'correct' : 'incorrect';
    $letter.classList.add(letterClass);
  });

  $activeLetter.classList.remove('active', 'is-last');
  const inputLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputLength];

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active')
  } else {
    $activeLetter.classList.add('active', 'is-last');
    // if (!$activeWord.nextElementSibling) endGame();
  }
}

function useTimer() {
  const interval = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(interval);
      // endGame();
    }
  }, 1000);
}

function endGame() {
  console.log('Game Over');
}
