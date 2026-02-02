// get saved theme from localstorage 
window.addEventListener('DOMContentLoaded', () => {
  const localTheme = localStorage.getItem('dictionaryTheme')
  if (localTheme === 'light') {
    document.body.classList.add('light')
    document.querySelector('.theme-button').classList.add('right')
  }
})

// set theme on theme button toggle
document.querySelector('.theme-button').addEventListener('click', () => {
  document.querySelector('.theme-button').classList.toggle('right')
  document.body.classList.toggle('light')
  if (document.body.classList.contains('light')) {
    localStorage.setItem('dictionaryTheme', 'light')
  } else {
    localStorage.setItem('dictionaryTheme', 'dark')
  }
})

// set font family from font selection
document.querySelector('select').addEventListener('change', () => {
  const selectionValue = document.querySelector('select').value
  document.body.style.fontFamily = selectionValue
  console.log(selectionValue)
})
