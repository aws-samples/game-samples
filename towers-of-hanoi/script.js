let moves = 0
let moveDisc = false
let selectedDock = null
let origDiv = null

let scoreDiv = document.getElementById('score')

function getFirstDisc (div) {
  return div.getElementsByTagName('div')[0]
}

function checkDiscSizes (divOne, divTwo) {
  return getFirstDisc(divOne).dataset.size > divTwo.dataset.size
}

function checkIfDisc (div) {
  return div.getElementsByTagName('div').length === 0
}

function toggleMoveType () {
  moveDisc = !moveDisc
}

function selectDock (div) {
  selectedDock = getFirstDisc(div)
  // Escapes event if person clicks empty div.
  if (!selectedDock) return
  origDiv = div
  div.className += ' selected'
  toggleMoveType()
}

function moveToDock (div) {
  if (checkIfDisc(div) || checkDiscSizes(div, selectedDock)) {
    moves++
    div.insertBefore(selectedDock, div.firstChild)
    console.log(scoreDiv)
    scoreDiv.innerHTML = moves
  }
  origDiv.classList.remove('selected')
  toggleMoveType()
}

function handleClick (e) {
  moveDisc ? moveToDock(this) : selectDock(this)
}

Array.from(document.getElementsByClassName('dock')).forEach(dock => {
  dock.addEventListener('click', handleClick)
})
