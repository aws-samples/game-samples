class Queue {
    constructor () {
        this.data = []
    }

    enqueue (item) {
        this.data.push(item)
    }

    dequeue () {
        return this.data.shift()
    }
}


class SimonModel {
    constructor () {
        this.moves = new Queue()
        this.inputs = ['red', 'blue', 'green', 'yellow']
        this.level = 1
        this.counter = 0 

        this.addToSequence()
    }

    randomPiece () {
        const randIndex = Math.floor(this.inputs.length * Math.random())
        return this.inputs[randIndex]
    }

    addToSequence () {
        this.moves.enqueue(this.randomPiece())
    }

    levelUp () {
        this.addToSequence()
        this.level++
        this.counter = 0
    }

    newLevel () {
        return this.counter === 0
    }

    continue (piece) {
        this.moves.enqueue(piece)
        this.counter ++
        if (this.counter === this.level) this.levelUp()
    }
    
    move (piece) {
        this.moves.dequeue() === piece ? this.continue(piece) : endGame()
    }
}


class SimonView {
    constructor () {
        this.pieces = Array.from(document.getElementsByClassName('piece'))
        this.model = new SimonModel()

        this.pieces.forEach(piece => piece.addEventListener('click', e => this.gameMove(e)))
        setTimeout(() => this.lightUp(this.model.moves.data[0]), 1000)
    }

    gameMove (e) {
        const clickedColor = e.target.id
        this.model.move(clickedColor)
        if (this.model.newLevel()) this.levelUp()
    }

    levelUp () {
        this.model.moves.data.forEach((move, idx) => setTimeout(() => this.lightUp(move), idx * 1000))
    }

    lightUp (move) {
        const btn = document.getElementById(move)
        btn.classList.add('activated')
        setTimeout(() => btn.classList.remove('activated'), 500)
    }
}


function startGame () {
    pieces.forEach(piece => piece.classList.remove('disabled'))
    let sv = new SimonView()
    start.classList.add('disabled')
}


function endGame () {
    start.classList.remove('disabled')
    pieces.forEach(piece => piece.classList.add('disabled'))
    sv = null
}


const start = document.getElementById('start')
start.addEventListener('click', startGame)

const pieces = Array.from(document.getElementsByClassName('piece'))
