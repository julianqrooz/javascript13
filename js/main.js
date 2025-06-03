const wordsEasy = [
  "Hello",
  "Name",
  "Code",
  "Town",
  "Scala",
  "Funny",
  "Task",
  "Roles",
  "Test",
  "Rust",
  "Java",
];

const wordsNormal = [
  "Working",
  "Runner",
  "Paradigm",
  "Styling",
  "Cascade",
  "Leetcode",
  "Internet",
  "Coding",
  "Country",
  "Github",
];

const wordsHard = [
  "Dependencies",
  "Playing",
  "Documentation",
  "Destructuring",
  "Programming",
  "Javascript",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Development",
];

// Setting Levels
const levels = {
  Easy: 4,
  Normal: 5,
  Hard: 6,
};

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let Choosen = document.querySelector(".Choose-a-level");
let lis = document.querySelectorAll(".Choose-a-level li");
let easylevel = document.querySelector(".Choose-a-level .easy");
let normallevel = document.querySelector(".Choose-a-level .normal");
let hardlevel = document.querySelector(".Choose-a-level .hard");
let details = document.querySelector(".details");
let message = document.querySelector(".message");
let restartbutton = document.querySelector(".restart");

let defaultLevelName = "Easy";
let defaultLevelSeconds = levels[defaultLevelName];
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = wordsEasy.length;

easylevel.onclick = function () {
  lvlNameSpan.innerHTML = "Easy";
  secondsSpan.innerHTML = levels.Easy;
  timeLeftSpan.innerHTML = levels.Easy;
  scoreTotal.innerHTML = wordsEasy.length;
  details.style.display = "none";
  message.style.display = "block";
  easylevel.style.color = "greenyellow";
  normallevel.style.color = "inherit";
  hardlevel.style.color = "inherit";
};
normallevel.onclick = function () {
  lvlNameSpan.innerHTML = "Normal";
  secondsSpan.innerHTML = levels.Normal;
  timeLeftSpan.innerHTML = levels.Normal;
  scoreTotal.innerHTML = wordsNormal.length;
  details.style.display = "none";
  message.style.display = "block";
  easylevel.style.color = "inherit";
  normallevel.style.color = "rgb(173, 63, 63)";
  hardlevel.style.color = "inherit";
};
hardlevel.onclick = function () {
  lvlNameSpan.innerHTML = "Hard";
  secondsSpan.innerHTML = levels.Hard;
  timeLeftSpan.innerHTML = levels.Hard;
  scoreTotal.innerHTML = wordsHard.length;
  details.style.display = "none";
  message.style.display = "block";
  hardlevel.style.color = "red";
  easylevel.style.color = "inherit";
  normallevel.style.color = "inherit";
};
input.onpaste = function () {
  return false;
};

startButton.onclick = function () {
  this.remove();
  input.focus();
  details.style.display = "none";
  message.style.display = "block";
  easylevel.style.display = "none";
  normallevel.style.display = "none";
  hardlevel.style.display = "none";
  genWords();
};

function genWords() {
  if (lvlNameSpan.textContent === "Easy") {
    easylevel.style.display = "block";
    easylevel.style.cursor = "auto";
    genWordsEasy();
  } else if (lvlNameSpan.textContent === "Normal") {
    normallevel.style.display = "block";
    normallevel.style.cursor = "auto";
    genWordsNormal();
  } else {
    hardlevel.style.display = "block";
    hardlevel.style.cursor = "auto";
    genWordsHard();
  }
}
function genWordsEasy() {
  let randomWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];
  let wordIndex = wordsEasy.indexOf(randomWord);
  wordsEasy.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < wordsEasy.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsEasy[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}
function genWordsNormal() {
  let randomWord = wordsNormal[Math.floor(Math.random() * wordsNormal.length)];
  let wordIndex = wordsNormal.indexOf(randomWord);
  wordsNormal.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < wordsNormal.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsNormal[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}
function genWordsHard() {
  let randomWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
  let wordIndex = wordsHard.indexOf(randomWord);
  wordsHard.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < wordsHard.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsHard[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  restart();
  reSeconds();
  let yourScore = scoreGot.innerHTML;
  let timer = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(timer);
      if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (wordsEasy.length > 0 && lvlNameSpan.textContent === "Easy") {
          genWordsEasy();
        } else if (
          wordsNormal.length > 0 &&
          lvlNameSpan.textContent === "Normal"
        ) {
          genWordsNormal();
        } else if (wordsHard.length > 0 && lvlNameSpan.textContent === "Hard") {
          genWordsHard();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

function reSeconds() {
  if (lvlNameSpan.textContent === "Easy") {
    timeLeftSpan.innerHTML = levels["Easy"];
  } else if (lvlNameSpan.textContent === "Normal") {
    timeLeftSpan.innerHTML = levels["Normal"];
  } else {
    timeLeftSpan.innerHTML = levels["Hard"];
  }
}

function restart() {
  restartbutton.style.display = "block";
  restartbutton.addEventListener("click", () => {
    window.location.reload();
  });
}
