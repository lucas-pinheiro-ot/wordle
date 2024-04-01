var gameObject = new Game('palha', 5, 6);
var keyboardObject = new Keyboard()

// Setup runs on load
function setup() {
    window.addEventListener('keydown', typer);

    let main = document.getElementById('main');
    gameObject.draw(main);

    let keyboardContainer = document.getElementById('keyboard');
    keyboardObject.draw(keyboardContainer);
}


function typer(evt) {
    let key = evt.key;

    // Erasing
    if (key == 'Backspace' && gameObject.guess.length > 0) {
        gameObject.getActiveWord().letters[gameObject.guess.length -1].element.innerHTML = '';
        gameObject.guess = gameObject.guess.slice(0, -1);
    }

    // Submitting
    if (key == 'Enter') {
        if (gameObject.guess.length != 5) {
            document.getElementById('warning').innerHTML = 'Only 5-letter words';
            giveWarning('Only 5-letter words.');
            return
        }
        gameObject.submit();
        
        // Implement a delay for the duration of reveal animation here
    }

    // Break if invalid input
    if (gameObject.guess.length >= 5) { return }
    if (/[a-zA-Z]/.test(key) == false) { return }
    if (key.length > 1) { return }

    // Writing
    var length = gameObject.guess.length;
    
    gameObject.guess += key.toUpperCase();
    gameObject.getActiveWord().letters[length].element.innerHTML = key.toUpperCase();
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