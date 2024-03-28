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
}
function initEvents() {}
