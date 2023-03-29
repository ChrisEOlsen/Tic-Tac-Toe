const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell")

  let gameArray = ["", "", "", "", "", "", "", "", ""]

  //draw starting gameboard
  const drawGame = () => {
    let index = 0
    cells.forEach(cell => {
      cell.innerHTML = gameArray[index]
      index++
    })
  }

  return { gameArray, drawGame, cells }
})()

const controls = (() => {
  const iconX = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/></svg>`
  const iconO = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"/></svg>`

  const activatePlayerEvents = iconChoice => {
    gameBoard.cells.forEach(cell => {
      cell.addEventListener("click", e => {
        if (e.target.dataset.id == undefined) return
        gameBoard.gameArray.splice(e.target.dataset.id, 1, iconChoice)
        gameBoard.drawGame()
        //Activate computer move here
        setTimeout(() => aiLogic.findBestMove(), 400)
      })
    })
  }
  return { activatePlayerEvents, iconX, iconO }
})()

const aiLogic = (() => {
  //this will be the index of the best move - defined inside scanWinScenarios()
  let blockIndex
  const winScenarios = ["012", "345", "678", "036", "147", "258", "048", "246"]
  let gameOver = false

  const scanWinScenarios = icon => {
    for (let i = 0; i < winScenarios.length; i++) {
      let line = winScenarios[i].split("")
      let count = 0
      let excluded = []
      for (let x = 0; x < line.length; x++) {
        gameBoard.gameArray[line[x]] == icon ? count++ : excluded.push(line[x])
        if (count == 2 && gameBoard.gameArray[excluded] == "") blockIndex = excluded[0]
      }
    }
  }

  const findBestMove = () => {
    let emptySpaces = []
    //find and save all empty spaces
    for (let i = 0; i < gameBoard.gameArray.length; i++) {
      if (gameBoard.gameArray[i] == "") emptySpaces.push(i)
    }

    //CHECK WIN X

    //game over if board is full
    if (emptySpaces.length == 0) return console.log("full")
    //check if immediate win is possible
    scanWinScenarios(controls.iconO)
    //if not possible, then check for necessary block move
    if (blockIndex == undefined) scanWinScenarios(controls.iconX)
    //execute block index
    if (blockIndex != undefined) {
      gameBoard.gameArray.splice(blockIndex, 1, controls.iconO)
    } else {
      //choose center by default to increase win chance
      if (gameBoard.gameArray[4] == "") gameBoard.gameArray.splice(4, 1, controls.iconO)
      else gameBoard.gameArray.splice(emptySpaces[Math.floor(Math.random() * emptySpaces.length)], 1, controls.iconO)
    }

    //CHECK WIN O

    gameBoard.drawGame()
    blockIndex = undefined
  }
  //check for wins here
  return { findBestMove }
})()

controls.activatePlayerEvents(controls.iconX)
