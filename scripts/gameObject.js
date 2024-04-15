/**
 * @param {string} wordle - The word to be guessed.
 * @param {int} howManyLetters - How many letters should the word have.
 * @param {int} howManyWords - How many tries should the player have.
 * @constructor
 */
function Game(wordle, howManyLetters, howManyWords) {
    this.wordle = wordle.toUpperCase();

    this.howManyLetters = howManyLetters;
    this.howManyWords = howManyWords;
    this.words = [];
    this.guess = '';
    
    this.activeWordIndex = 0;
    this.cursorIndex = 0;

    Object.defineProperty(this, 'cursor', {
        get: () => { return this.cursorIndex },
        set: (newValue) => {
            this.getActiveWord().letters[this.cursorIndex].switchActive();
            this.cursorIndex = newValue;
            this.getActiveWord().letters[this.cursorIndex].switchActive();
        }
    })

    
    this.getActiveWord = () => {
        return this.words[this.activeWordIndex];
    }
    

    this.submit = () => {
        let matches = this.wordle.split('').map((char, index) => (this.guess[index] == char ? 1:0));
        
        let wrong = matches.map((value,index) => {if (value == 0) { return index }} )
        wrong = wrong.filter((value) => (value != undefined));
        
        var remains = wrong.map(index => this.wordle[index])
        wrong.map(index => this.guess[index]).map((char, index) => {
            remains.includes(char) ? matches[wrong[index]] = 2 : 0;
        });


        // Win/lose conditions
        if (this.colorize(matches) == true) {
            giveWarning('You won!', 'perma');
            return;
        }

        if (this.words[this.activeWordIndex + 1] == undefined) {
            giveWarning('You lost...', 'perma');
            return;
        }
        
        // Set next word as active
        this.getActiveWord().letters[this.cursor].switchActive();
        this.getActiveWord().setUsed();
        this.cursorIndex = 0;
        this.getActiveWord().letters[this.cursor].switchActive();

    }
    
    // Set the colors and returns true/false according to the guess
    this.colorize = (blueprint) => {
        let letters = this.words[this.activeWordIndex].letters;
        blueprint.forEach((value, index) => {
            switch (value) {
                case 0:
                    break;
                case 1:
                    letters[index].letterSlot.classList.add('right');
                case 2:
                    letters[index].letterSlot.classList.add('wrongPlace');
            }
        })
        return blueprint.every(value => value == 1) ? true : false;
    }
        
    this.draw = (main) => {
        var container = document.createElement('div');
        container.className = 'container';

        for (let w = 1; w <= this.howManyWords; w++) {
            // Creates word object and element
            let word = document.createElement('div');
            word.className = 'word';
            
            if (w == 1) { word.classList.add('activeWord'); }

            let wordObject = new Word(word, this)

            // Same for the letters
            for (let l = 0; l <= 4; l++) {
                let letterSlot = document.createElement('div');
                letterSlot.className = 'letterSlot';

                let letter = document.createElement('div');
                letter.className = 'letter';
                letterSlot.appendChild(letter);
                
                
                let letterObject = new Letter(letterSlot, letter, l, this);
                
                word.appendChild(letterSlot);
                wordObject.letters.push(letterObject)
            }
            
            this.words.push(wordObject)
            container.appendChild(word)
        }
        main.appendChild(container);

        console.log(this.getActiveWord().letters[this.cursorIndex]);
        this.getActiveWord().letters[this.cursor].switchActive();
    }
}

/**
 * A row of letter squares
 * @param {HTMLElement} element
 */
function Word(element, game) {
    this.element = element;
    this.game = game;
    this.letters = [];

    this.setUsed = () => {
        this.element.classList.replace('activeWord', 'usedWord');
        game.activeWordIndex += 1;
        game.activeLetterIndex = 0;
        game.guess = '';
        game.getActiveWord().element.classList.add('activeWord');
    }

    this.type = (key) => {
        this.letters[game.cursor].type(key);
        
        let index = game.cursor;
        game.cursor = (index == 4) ? index : index + 1;
        console.log(game.guess)
    }

    this.erase = () => {
        if (this.letters[game.cursor].content === '') {
            game.cursor -= 1;
            this.letters[game.cursor].erase();
            console.log(game.guess)
            return;
        }

        this.letters[game.cursor].erase();
        if (game.cursor === 4) { return; }

        game.cursor -= 1;
        console.log(game.guess)
    }
}

/**
 * A letter square
 * @param {HTMLElement} element 
 */
function Letter(letterSlot, letter, index, game) {
    this.letterSlot = letterSlot;
    this.letter = letter;
    this.game = game;

    this.content = '';

    this.switchActive = () => {
        this.letterSlot.classList.toggle('activeLetter');
    }

    this.type = (key) => {
        this.letter.innerHTML = key;
        this.content = key;
        
        game.guess = game.guess.replaceAt(game.cursor, key);
    }

    this.erase = () => {
        this.letter.innerHTML = '';
        this.content = '';

        game.guess = game.guess.replaceAt(game.cursor, '');
    }

    this.letterSlot.addEventListener('mousedown', () => {
        game.cursor = index;
    })
}

String.prototype.replaceAt = function(index, char) {
    let s1 = this.slice(0, index);
    let s2 = this.substr( index +1);
    return s1 + char + s2
}