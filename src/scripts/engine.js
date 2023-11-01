const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audioMap = {};

pianoKeys.forEach((key) => {
  const keyName = key.dataset.key;
  audioMap[keyName] = new Audio(`src/tunes/${keyName}.wav`);


  key.addEventListener("mousedown", () => {
    key.classList.add("active");
    audioMap[keyName].currentTime = 3;
    audioMap[keyName].play();
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove("active");
    audioMap[keyName].pause();
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("active");
    audioMap[keyName].pause();
  });

  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
    audioMap[e.key].isPlaying = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (mapedKeys.includes(e.key)) {
    audioMap[e.key].pause();
    audioMap[e.key].isPlaying = false;
  }
});

const handleVolume = (e) => {
  for (const key in audioMap) {
    audioMap[key].volume = e.target.value;
  }
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

$(document).ready(function () {
  $('.switcher').click(function () {
    $('.switcher__button').toggleClass('switcher__button-before');
    $('.switcher').toggleClass('switcher-before');
  });
});

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

function playTune(key) {
  audioMap[key].currentTime = 0;
  audioMap[key].play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setInterval(() => {
    clickedKey.classList.remove("active");
  },500);
}