import { webContentText } from "./data.js";
import { initGame } from "./script.js";

const $html = document.querySelector('html');
const language = navigator.language;
const $ca = document.querySelector('#ca-ES');
const $es = document.querySelector('#es-ES');
const $en = document.querySelector('#en-US');
const $languageOptions = [$ca, $es, $en];

updateSelectedLanguage(language);
initLanguageEvents();

function updateSelectedLanguage(language) {
  if (language !== $html.lang) $html.lang = language;

  $languageOptions.forEach($option => $option.classList.remove('active'));

  updateWebText(language);

  if (language === 'ca-ES') return $ca.classList.add('active');
  if (language === 'es-ES') return $es.classList.add('active');
  return $en.classList.add('active');
}

function updateWebText(language) {
  Object.keys(webContentText[language]).forEach(section => {
    const $sectionsToTranslate = document.querySelectorAll(`.${section}`);
    $sectionsToTranslate.forEach($element => {
      const text = webContentText[language][section][$element.id];
      $element.textContent = text;
    });
  });
}

export function accuracyFormat(accuracy) {
  let accuracyPercentage = accuracy.toFixed(2);
  if ($html.lang !== 'en-US') {
    accuracyPercentage = accuracyPercentage.replace('.', ',');
  }

  return `${accuracyPercentage}%`;
}

function initLanguageEvents() {
  $languageOptions.forEach($option => {
    $option.addEventListener('click', () => {
      const newLanguage = $option.id;

      updateSelectedLanguage(newLanguage);
      initGame();
    });
  });
}