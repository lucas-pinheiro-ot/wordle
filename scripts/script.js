var gameObject = new Game('torta', 5, 5);

// Setup runs on load
function setup() {
    window.addEventListener('keydown', typer);
    draw(gameObject);    
}


/**
 * @param {KeyboardEvent} evt - 'Keydown' event
 */
function typer(evt) {
    let key = evt.key;

    // Erasing
    if (key == 'Backspace' && gameObject.guess.length > 0) {
        gameObject.getActiveWord().letters[gameObject.guess.length -1].element.innerHTML = '';
        gameObject.guess = gameObject.guess.slice(0, -1);
    }

    // Submitting
    // Implement a spellcheck here
    if (key == 'Enter') {
        if (gameObject.guess.length != 5) {
            document.getElementById('warning').innerHTML = 'Only 5-letter words';
            giveWarning('Only 5-letter words.');
            return
        }
        gameObject.activeWord += 1;
        gameObject.guess = '';
        // Implement a delay for the duration of reveal animation here
    }

    // Fail check
    if (gameObject.guess.length >= 5) { return }
    if (/[a-zA-Z]/.test(key) == false) { return }
    if (key.length > 1) { return }

    // Writing
    let active = gameObject.words[gameObject.activeWord];
    var length = gameObject.guess.length;
    
    gameObject.guess += key;
    active.letters[length].element.innerHTML = key.toUpperCase();
}


/**
 * @param {Game} gameObject
 */
function draw(gameObject) {
    var container = document.createElement('div');
    container.className = 'container';

    for (let w = 1; w <= gameObject.howManyWords; w++) {
        // Creates word object and element
        let word = document.createElement('div');
        word.className = 'word';

        let wordObject = new Word(word)

        // Same for the letters
        for (let l = 0; l <= 4; l++) {
            let letter = document.createElement('div');
            letter.className = 'letter';
            
            let letterObject = new Letter(letter);
            
            word.appendChild(letter);
            wordObject.letters.push(letterObject)
        }
        
        gameObject.words.push(wordObject)
        container.appendChild(word)
    }
    document.body.appendChild(container)
}


// Warning functions
function vanish() {
    document.getElementById('warning').style.opacity = '0';
}
function giveWarning(message) {
    let warning = document.getElementById('warning')
    warning.innerHTML = message;
    warning.style.opacity = '1';

    setTimeout(vanish, 3000);
}