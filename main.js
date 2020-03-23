
//define an 3x3 array and fill it with 'x'  
let choiceArray = new Array(3).fill('x').map(() => new Array(3).fill('x'));
let count = 0;
//Array that maintains elements to be highlighted in case an player wins
let highlightArray = [];

/**
 * Method to validate if inputs coordinates are duplicate or not
 * true is returned in case of duplicate coordinates
 * 
 * @param {number} x X coordinate in the grid 
 * @param {number} y Y coordianate in the grid
 */
function isDuplicateClick (x, y) {
    let match = false;
    if (choiceArray[x][y] != 'x') {
        console.log("Duplicate move x=", x , ", y=", y);
        match = true;
    }
    return match;
}

/**
 * This method updates users choice in choice array.
 * as soon as players complete 5 moves, we need to check for winner
 * this method returns true in case we have winner
 * 
 * @param {number} x X coordinate in the grid
 * @param {number} y Y coordinate in the grid
 * @param {number} choice value 0 or 1
 */
function updateMove (x, y, choice) {
    let match = false;
    if (x > 2 || x < 0 || y > 2 || y < 0 || choice < 0 || choice > 1) {
        console.log ("Move for invalid pos x=", x , ", y=", y, ", choice =", choice);
    } else {

        choiceArray[x][y] = choice;
        count = count + 1;
        //Both users have started playing and we have 1 possible winner 
        if (count >= 5) {
            //lets verify who is winner user choice 0 or 1
            match = startMatchingAround(x, y, choice);

            if (!match) {
                match = validateDiagonalWinner(choice);
            }
        }
    }
    return match;
}

/**
 * This method matches horizontally and vertically grids to check 
 * if we have all boxes selected with same option
 * It retuns true in case match is sucessful
 * 
 * @param {number} x X cooridate of cell selected
 * @param {number} y Y coordinate of cell seleceted
 * @param {*} matchVal value to be matched 0 or 1
 */
function startMatchingAround(x, y, matchVal) {
    let match = true;
    let arr = [];

    //lets process values starting 0 index of choiceArray[x]
    for (let i = 0; i < choiceArray.length; i++) {
        arr.push(x + "" + i);
        if (choiceArray[x][i] != matchVal) {
            match = false;
            break;
        }
    }

    if (!match) {
        console.log ("lets iterate over y axis for x=", x, "y=", y);
        match = true;
        arr = [];
        for (let i = 0; i < choiceArray.length; i++) {
            arr.push(i + "" + y);
            if (choiceArray[i][y] != matchVal) {
                match = false;
                break;
            }
        }
    }
    if (match) {
        highlightArray = [...arr];
    }
    console.log ("Returning ", match);
    return match;
}

/**
 * This method matches horizontally selected move to verify
 * that current move is a winning move
 * returns true if move a winning move
 * 
 * @param {number} choice option selected by user
 */
function validateDiagonalWinner (choice) {
    let match = true;
    let arr = [];

    for (let i = 0; i < choiceArray.length; i++) {
        arr.push(i + "" + i);
        if (choiceArray[i][i] != choice) {
            match = false;
            break;
        }
    }

    if (!match) {
        match = true;
        arr = [];
        for (let i = 0, j = choiceArray.length - 1; i < choiceArray.length; i++, j--) {
            arr.push(i + "" + j);
            if (choiceArray[i][j] != choice) {
                match = false;
                break;
            }
        }
    }

    if (match) {
        highlightArray = [...arr];
    }

    console.log ("Found diagonally ", match);
    return match;
}

/**
 * This method is invoked on the user action perfomed on the UI.
 * On each user move we update local 3x3 array to update position of move
 * on the UI. As soon as we have 5 moves we start looking for an winner
 * 
 * @param {number} x X coordinate location
 * @param {number} y Y coordinate location
 */
function toggle (x, y) {
    if (count < 9 && highlightArray[0] == null) {
        let loc = x + "" + y;
        document.getElementById(loc).style.display = "none";
        let choice = 1;
        
        if (!isDuplicateClick(x, y)) {
            if (count % 2 == 0) {
                document.getElementById(loc + "_tick").style.display = "inline";
            } else {
                document.getElementById(loc + "_close").style.display = "inline";
                choice = 0;
            }
            match = updateMove(x, y, choice);
            if (match) {
                
                if (choice == 1) {
                    highlightArray.forEach(item => {
                        document.getElementById(item + "_tick").style = "border:2px solid red";
                    });
                } else {
                    highlightArray.forEach(item => {
                        document.getElementById(item + "_close").style= "border:2px solid blue";
                    });
                }
                document.getElementById("result").hidden = false;     
            }
        }
    }
}

/**
 * Function invoked by pressing refresh button on UI
 */
function refresh () {
    return window.location.reload();
}