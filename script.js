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
        //TODO: activate computer move here
      })
    })
  }
  return { activatePlayerEvents, iconX, iconO }
})()

const aiLogic = (() => {})()

controls.activatePlayerEvents(controls.iconX)
