const themeButton = document.querySelector('.theme')
const searchInput = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')
const resultElement = document.querySelector('.result')

// toggle theme
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light')
})

// get result when click on result button
searchButton.addEventListener('click', async () => {
  // if searchInput is empty return to this function
  if (!searchInput.value) return
  getResult()
})

// get result when enter button clicked
window.addEventListener('keydown', (ev) => {
  // if ev.code or ev.key (for mobile) is Enter then run
  if (ev.code === 'Enter' || ev.key === 'Enter') {
    // if searchInput is empty return to this function
    if (!searchInput.value) return
    getResult()
  }
})


async function getResult() {
  // get searchQuery
  const searchQuery = searchInput.value

  // fetch data using dictionaryapi 
  const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)

  // if data response is not ok return from this function
  if (!data.ok) return resultElement.innerHTML = `<h1>"${searchQuery}" Not Found</h1>`

  // get result in json format
  const result = await data.json()

  // if there is no result return or any issue with data.json()
  if (!result) return 

  // reset result inner html
  resultElement.innerHTML = ''
  
  // result will have license, meanings, phonetic, phonetics, sourceUrls, word
  
  // first append word
  const word = document.createElement('div')
  const resultWord = result[0].word
  word.innerHTML = `<h2>${resultWord}</h2>`
  resultElement.appendChild(word)
  resultElement.appendChild(document.createElement('br'))
  
  // append phonetic
  const phonetic = document.createElement('div') 
  console.log(result)
  const resultPhonetic = result[0].phonetics[0].text || result[0].phonetics[1].text || result[0].phonetics[2].text
  phonetic.innerHTML = `<h3>${resultPhonetic}</h3>`
  resultElement.appendChild(phonetic)

  // append phonetic audio
  const phoneticAudio = document.createElement('audio')
  const resultPhoneticAudio = result[0].phonetics[0].audio || result[0].phonetics[1].audio || result[0].phonetics[2].audio
  phoneticAudio.src = resultPhoneticAudio
  phoneticAudio.controls = true
  resultElement.appendChild(phoneticAudio)
  resultElement.appendChild(document.createElement('br'))

  // append meaning
  const meaning = document.createElement('div')
  const resultMeaning = result[0].meanings[0].definitions[0].definition
  meaning.innerHTML = `<h3>${resultMeaning}</h3>`
  resultElement.appendChild(meaning)
}