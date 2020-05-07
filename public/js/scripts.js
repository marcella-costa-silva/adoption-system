const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const modalClose = document.querySelector('.modal-close')
const iframe = document.querySelector('iframe')

for (let card of cards) {
  card.addEventListener('click', () => {
    const videoId = card.getAttribute('id')
    window.location.href = `/video?id=${videoId}`

    // modalOverlay.classList.add('active')
    // iframe.src = `https://www.youtube.com.br/embed/${videoId}`
  })
}

// modalClose.addEventListener('click', () => {
//   modalOverlay.classList.remove('active')
//   iframe.src = ''
// })