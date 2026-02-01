document.querySelector('.theme').addEventListener('click', () => {
  document.body.classList.toggle('light')
})

document.querySelector('.search-button').addEventListener('click', async () => {
  getResult()
})


async function getResult() {
  const searchQuery = document.querySelector('.search-input').value
  const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
  const result = await data.json()
  if (result) {
    const audioURL = result[0].phonetics[0].audio
    const audioElement = document.createElement('audio')
    audioElement.controls = true
    audioElement.src = audioURL
    document.querySelector('.result').appendChild(audioElement)
    console.log(result)
  }
}