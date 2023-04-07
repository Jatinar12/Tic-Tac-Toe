const tiles = document.querySelectorAll(".tile");
const Player_X = "X";
const Player_O = "O";
let turn = Player_X;

let board = Array(tiles.length);
board.fill(null);

const strike = document.getElementById("strike");    //elements
const gameArea = document.getElementById("game-area");
const gameText = document.getElementById("text");
const playAgain = document.querySelector("#play-again").addEventListener("click", () => newGame());


tiles.forEach((tiles) => tiles.addEventListener("click", tileClicked));

function tileClicked(event) {
       if(gameArea.classList.contains("visible")) {
        return;
       }

       const tile = event.target;
       const tileNumber = tile.dataset.index;

       if(tile.innerText != "") {
         return;
       }

       if(turn === Player_X) {
        tile.innerText = Player_X;
        board[tileNumber-1] = Player_X;
        turn = Player_O;
     
       }
       else {
        tile.innerText = Player_O;
        board[tileNumber-1] = Player_O;
        turn = Player_X;
       }
   
    checkWinner();
    }

    function checkWinner() {
        for(const winCombination of winCombinations) {
           
            const {combo, strikeClass} = winCombination;
            const tileValue1 = board[combo[0]-1];
            const tileValue2 = board[combo[1]-1];
            const tileValue3 = board[combo[2]-1];

            if(
                tileValue1 != null &&
                tileValue1 === tileValue2 &&
                tileValue1 === tileValue3  )
                {
                    strike.classList.add(strikeClass);
                    gameOverScreen(tileValue1);
                    return;
                }
        }

        const allTile = board.every((tile) => tile !== null);
        if (allTile) {
            gameOverScreen(null);
        }
    }

    function gameOverScreen(winnerText){
        let text= "Draw!"
        if(winnerText != null) {
            text = `Winner is ${winnerText}`;
        }
        gameArea.className = "visible"
        gameText.innerText = text;
    }


function newGame() {
		
        gameArea.className ="hidden";
        board.fill(null);
        strike.className ="strike";

		tiles.forEach((tile) => {
			tile.textContent = "";
		});
	}




const winCombinations = [
    {combo: [1,2,3], strikeClass: "strike-row-1"},
    {combo: [4,5,6], strikeClass: "strike-row-2"},
    {combo: [7,8,9], strikeClass: "strike-row-3"},

    {combo: [1,4,7], strikeClass: "strike-column-1"},
    {combo: [2,5,8], strikeClass: "strike-column-2"},
    {combo: [3,6,9], strikeClass: "strike-column-3"},

    {combo: [1,5,9], strikeClass: "strike-diagonal-1"},
    {combo: [3,5,7], strikeClass: "strike-diagonal-2"},
];