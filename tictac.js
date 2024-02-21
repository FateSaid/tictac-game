function Gameboard(){
    const board = [];
    const row = 3;
    const column = 3;
    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const getMark = (row, column, mark) => {
        if(board[row][column].getValue() !== '')return;
        board[row][column].addMark(mark)
    };


    const printBoard = () => {
        const boardWithCellvalues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellvalues);
    };

    


    return {
        getBoard,
        printBoard,
        getMark
    }
}

function cell(){
    let value = '';
    const addMark = (mark) => value = mark;
    const getValue = () => value;
    return {
        addMark,
        getValue
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
    const switchActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const activeBoard = () => board.getBoard().map((row) => row.map((cell) => cell.getValue()));

    const playRound = (row,column) => {
        if (board.getBoard()[row][column].getValue() !== '' ) return console.log('Invalid');
        board.getMark(row, column, getActivePlayer().mark);
        if(calculateWinner(activeBoard()) !== false){
            return;
        }
        switchActivePlayer();
        
        printNewRound();
    }
    function calculateWinner(array) {
        for (let i = 0; i < array.length; i++) {
            
            if (array[i][0] !== '' && (array[i][0] == array[i][1] && array[i][0] == array[i][2])) {
                return console.log(`${array[i][0]} is the winner`);
            }
        }
    
        
        for (let i = 0; i < array.length; i++) {
            
            if (array[0][i] !== '' && (array[0][i] == array[1][i] && array[0][i] == array[2][i])) {
                return console.log(`${array[i][0]} is the winner`);
            }
        }
    
        
        if (array[0][0] !== '' && (array[0][0] == array[1][1] && array[0][0] == array[2][2])) {
            return console.log(`${array[i][0]} is the winner`);
        }
        if (array[0][2] !== '' && (array[0][2] == array[1][1] && array[0][2] == array[2][0])) {
            return console.log(`${array[i][0]} is the winner`);
        }
    
        return false;
    }

    
    
    

    return {
        getActivePlayer,
        playRound,
        calculateWinner
    }
}

const game = GameController();