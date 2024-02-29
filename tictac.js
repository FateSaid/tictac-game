function Gameboard(){
    const board = [];
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const getMark = (row, column, mark) => {
        getBoard()[row][column].addMark(mark);
    };

    const printBoard = () => {
        const printing = board.map((row) => row.map((cell) => cell.getValue()));
        
    }
    return {
        getBoard,
        getMark,
        printBoard
    }


}
function GameController(){
    const board = Gameboard();

    

    const players = [
        {
            name: 'Player One',
            mark: 'X'
        },
        {
            name: 'Player Two',
            mark: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () =>{
        activePlayer = (activePlayer === players[0])? players[1] : players[0];
        
    }


    const getActivePlayer = () => activePlayer; 

    let getActiveBoard = () => board.getBoard().map(row => row.map(cell => cell.getValue()));

    const printNewRound = () => {
        board.printBoard();
        
    };


    function playRound(row, column){
        if(board.getBoard()[row][column].getValue() !== '')return console.log('Invalid');
        board.getMark(row,column, getActivePlayer().mark);
        
        
        printNewRound();
        


    }

    function calculateWinner(array) {
        for (let i = 0; i < array.length; i++) {
            
            if (array[i][0] !== '' && (array[i][0] == array[i][1] && array[i][0] == array[i][2])) {
                return true;
            }
        }
    
        
        for (let i = 0; i < array.length; i++) {
            
            if (array[0][i] !== '' && (array[0][i] == array[1][i] && array[0][i] == array[2][i])) {
                return true;
            }
        }
    
        
        if (array[0][0] !== '' && (array[0][0] == array[1][1] && array[0][0] == array[2][2])) {
            return true;
        }
        if (array[0][2] !== '' && (array[0][2] == array[1][1] && array[0][2] == array[2][0])) {
            return true;
        }
    
        return false;
    }

    function clearBoard(){
        const currentBoard = getActiveBoard();
        for(let i = 0; i < currentBoard.length; i++){
            for(let j = 0; j < currentBoard[i].length; j++){
                board.getMark(i,j,'');
            }
        }
    }

    return{
        playRound,
        getActivePlayer,
        calculateWinner,
        getBoard: board.getBoard,
        switchPlayer,
        clearBoard,
        getPlayer: () => players
    }

}
function cell(){
    let value = '';
    const getValue = () => value;
    const addMark = (mark) => value = mark;
    return {
        getValue,
        addMark
    }
}



function ScreenController(){

    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', () => {
        updateScreen();
    });


    

    const game = GameController();
    const boardDiv = document.querySelector('.board');
    
    const turnDiv = document.querySelector('.turn');
    
    
    

    const board = game.getBoard();

    const getActiveBoard = () => board.map(row => row.map(cell => cell.getValue()));

    
    
    function updateScreen(){
        turnDiv.textContent = `${game.getActivePlayer().name}'s turn...`;
        boardDiv.textContent = '';

        for(let i = 0; i < board.length;i++){
            for(let j = 0; j < board[i].length; j++){

                const btn = document.createElement('button');
                btn.classList.add('cell');
                boardDiv.appendChild(btn);
                btn.addEventListener('click', ()=> {

                    game.playRound(i,j);
                    
                    
                    btn.textContent = game.getActivePlayer().mark;
                    if(game.calculateWinner(getActiveBoard())){
                        const cellBtn = document.querySelectorAll('.cell');
                        cellBtn.forEach(cell => cell.disabled = true);
                        turnDiv.textContent = `${game.getActivePlayer().name} is the winner`;
                        game.clearBoard();
                    
                        return;
                    }
                    
                    game.switchPlayer();
                    turnDiv.textContent = `${game.getActivePlayer().name}'s turn...`;
                });
            }
        }
        
    }

    updateScreen();

   
    return{
        game : game
    }
    

}

function modalBox(){
    const playerOne = document.getElementById('playone');
    const playerTwo = document.getElementById('playtwo');
    const modal = document.querySelector('.modal');
    const modalBtn = document.getElementById('submit');
    modalBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const screenController = ScreenController();
        screenController.game.getPlayer()[0].name = playerOne.value;
        screenController.game.getPlayer()[1].name = playerTwo.value;
        document.querySelector('.turn').textContent = `${screenController.game.getPlayer()[0].name}`;
        modal.close();

    });
    modal.showModal();
}
modalBox();

ScreenController();


