HTMLCollection.prototype.forEach = Array.prototype.forEach
NodeList.prototype.forEach = Array.prototype.forEach
HTMLCollection.prototype.filter = Array.prototype.filter
NodeList.prototype.filter = Array.prototype.filter

var totalClicksCounter = 0
var clicksTotal = document.querySelector('#counter')
clicksTotal.innerHTML = `Clicks total: 0`
const toggle = document.querySelector('#toggle')
var tilesCollection = document.querySelectorAll('hiding-tile')

class HidingTile extends HTMLElement {
  constructor() {
    super()
    this.tileClicksCounter = 0
    this.onclick = () => {
      if (toggle.checked === false) {
        this.tileClicksCounter++
        totalClicksCounter++
        clicksTotal.innerHTML = `Clicks total: ${totalClicksCounter}`
        this.innerHTML = this.tileClicksCounter
        var currentTile = this
        let tilesExceptCurrent = tilesCollection.filter(function (tile) {
          if (tile.id !== currentTile.id) return tile
        })
        tilesExceptCurrent.forEach((item) => {
          item.className = 'tile'
        })
        if (this.className === 'fakehidden') {
          this.className = 'tile'
        } else if (this.className === 'tile') {
          this.className = 'fakehidden'
        }
      } else if (toggle.checked === true) {
        totalClicksCounter++
        this.tileClicksCounter++
        clicksTotal.innerHTML = `Clicks total: ${totalClicksCounter}`
        this.innerHTML = this.tileClicksCounter
        if (this.className === 'fakehidden') {
          this.className = 'tile'
        } else if (this.className === 'tile') {
          this.className = 'fakehidden'
        }
      }
    }
  }
}
customElements.define('hiding-tile', HidingTile)

const resetButton = document.querySelector('#reset')
resetButton.onclick = () => {
  totalClicksCounter = 0
  clicksTotal.innerHTML = `Clicks total: 0`
  tilesCollection.forEach((item) => {
    item.className = 'tile'
    item.innerHTML = ''
    item.tileClicksCounter = 0
    let itemId = parseInt(item.id.replace(/tile/, ''))
    if (itemId > 9) {
      item.parentNode.removeChild(item)
    }
  })
}

const addTileButton = document.querySelector('#addTile')
addTileButton.onclick = () => {
  let wrapper = document.getElementById('wrapper')
  let lastChildId = wrapper.lastElementChild.previousElementSibling.id
  let lastChildIdNumber = parseInt(lastChildId.replace(/tile/, ''))
  let newChildId = `tile${lastChildIdNumber + 1}`
  let newChild = `<hiding-tile class="tile" id="${newChildId}"></hiding-tile>`
  wrapper.insertAdjacentHTML('beforeend', newChild)
  tilesCollection = document.querySelectorAll('hiding-tile')
  addTileButton.parentNode.appendChild(addTileButton)
}
