// get saved theme from localstorage
window.addEventListener("DOMContentLoaded", () => {
  const localTheme = localStorage.getItem("dictionaryTheme");
  if (localTheme === "light") {
    document.body.classList.add("light");
    document.querySelector(".theme-button").classList.add("right");
  }
});

// set theme on theme button toggle
document.querySelector(".theme-button").addEventListener("click", () => {
  document.querySelector(".theme-button").classList.toggle("right");
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    localStorage.setItem("dictionaryTheme", "light");
  } else {
    localStorage.setItem("dictionaryTheme", "dark");
  }
});

// set font family from font selection
document.querySelector("select").addEventListener("change", () => {
  const selectionValue = document.querySelector("select").value;
  document.body.style.fontFamily = selectionValue;
});

// store current audio to prevent overlapping playback
let currentAudio = null;

// fetch data from freedictionary api
async function getWordData(word) {
  // set loading when fetching
  document.querySelector(".result-panel").style.display = "none";
  const data = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );
  if (!data.ok) return alert(`${word} not found!`);

  const wordData = await data.json();
  if (wordData) document.querySelector(".result-panel").style.display = "block";

  console.log(wordData[0]);

  // get all data
  const wordName = wordData[0].word;
  const wordElement = document.querySelector(".word");
  wordElement.innerHTML = `<h1>${wordName}</h1>`;
  wordElement.style.cssText = "display: block;";

  // get phonetic
  const phoneticName =
    wordData[0].phonetic ||
    wordData[0].phonetics[0].text ||
    wordData[0].phonetics[1].text ||
    wordData[0].phonetics[2].text;
  const phoneticElement = document.querySelector(".phonetic");
  phoneticElement.innerHTML = `<h3>${phoneticName}</h3>`;
  phoneticElement.style.display = "block";

  // get audio
  const pronunciationAudioURL =
    wordData[0].phonetics[0].audio || wordData[0].phonetics[1].audio;
  currentAudio = new Audio(pronunciationAudioURL);
  if (currentAudio) {
    const pronunciationElement = document.querySelector(".pronunciation");
    pronunciationElement.addEventListener("click", () => {
      currentAudio.currentTime = 0;
      currentAudio.play();
    });
    pronunciationElement.style.display = "block";
  }

  // get meaning
  const wordDefinition =
    wordData[0].meanings[0].definitions[0].definition ||
    wordData[0].meanings[1].definitions[0].definition ||
    wordData[0].meanings[2].definitions[0].definition;
  const meaningElement = document.querySelector(".definition");
  meaningElement.innerHTML = `<h3>Definition: ${wordDefinition}</h3>`;
  meaningElement.style.display = "block";
  // console.log(meaningName)
}

// get details when search button clicked
document.querySelector(".search-icon").addEventListener("click", () => {
  const inputWord = document.querySelector("input").value;
  resetEverything();
  getWordData(inputWord);
});

// get details on enter button click
window.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter" || ev.code === "Enter") {
    const inputWord = document.querySelector("input").value;
    resetEverything();
    getWordData(inputWord);
  }
});

// reset everything
function resetEverything() {
  currentAudio = null;
  document.querySelector(".word").style.display = "none";
  document.querySelector(".phonetic").style.display = "none";
  document.querySelector(".pronunciation").style.display = "none";
  document.querySelector(".definition").style.display = "none";
}
