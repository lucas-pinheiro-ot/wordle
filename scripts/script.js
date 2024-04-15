var gameObject = new Game('palha', 5, 6);
var keyboardObject = new Keyboard()

// Setup runs on load
function setup() {
    window.addEventListener('keydown', keyboardHandler);

    let main = document.getElementById('main');
    gameObject.draw(main);

    let keyboardContainer = document.getElementById('keyboard');
    keyboardObject.draw(keyboardContainer);

    //for (let k in keyboardObject.keys) {}
}


function keyboardHandler(evt) {
    let key = evt.key;

    // Erasing
    if (key == 'Backspace' && gameObject.cursor > 0) {
        gameObject.getActiveWord().erase();

        return;
    }

    // Submitting
    if (key == 'Enter') {
        if (gameObject.guess.length == 5) {
            gameObject.submit();
            return;
        }
            
        document.getElementById('warning').innerHTML = 'Only 5-letter words';
        giveWarning('Only 5-letter words.', 3000);
        return;
    }

    if (key == 'ArrowLeft') {
        gameObject.cursor -= (gameObject.cursor <= 0) ? 0 : 1;
    }

    if (key == 'ArrowRight') {
        gameObject.cursor += (gameObject.cursor >= 4) ? 0 : 1;
    }

    // Break if invalid input
    if (/[a-zA-Z]/.test(key) == false) { return }
    if (key.length > 1) { return }

    // Writing
    gameObject.getActiveWord().type(key.toUpperCase());
}


// Warning functions
function vanish() {
    document.getElementById('warning').style.opacity = '0';
}


function giveWarning(message, time) {
    let warning = document.getElementById('warning')
    warning.innerHTML = message;
    warning.style.opacity = '1';

    if (time == 'perma') { return }
    setTimeout(vanish, time);
}