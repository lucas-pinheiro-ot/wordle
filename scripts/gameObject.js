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
    this.activeWord = 0;
    this.words = [];
    this.guess = '';

    this.getActiveWord = () => {
        return this.words[this.activeWord];
    }

    this.submit = () => {
        let matches = this.wordle.split('').map((char, index) => (this.guess[index] == char ? 1:0));

        let wrong = matches.map((value,index) => {if (value == 0) { return index }} )
        wrong = wrong.filter((value) => (value != undefined));

        var remains = wrong.map(index => this.wordle[index])
        wrong.map(index => this.guess[index]).map((char, index) => {
            remains.includes(char) ? matches[wrong[index]] = 2 : 0;
        });
        
        if (this.colorize(matches) == true) {
            this.endgame();
            return true;
        }
        
        // Set next word as active
        this.getActiveWord().element.classList.add('usedWord');
        this.getActiveWord().element.classList.remove('activeWord');
        this.activeWord += 1;
        this.guess = '';
        this.getActiveWord().element.classList.add('activeWord');
        return false
    }

    this.colorize = (blueprint) => {
        let letters = this.words[this.activeWord].letters;
        blueprint.forEach((value, index) => {
            switch (value) {
                case 0:
                    break;
                case 1:
                    letters[index].element.classList.add('right');
                case 2:
                    letters[index].element.classList.add('wrongPlace');
            }
        })
        return blueprint.every(value => value == 1) ? true : false;
    }

    this.endgame =() => {
        giveWarning('Game ended');
    }
        
    this.draw = (main) => {
        var container = document.createElement('div');
        container.className = 'container';

        for (let w = 1; w <= this.howManyWords; w++) {
            // Creates word object and element
            let word = document.createElement('div');
            word.className = 'word';
            
            if (w == 1) { word.classList.add('activeWord'); }

            let wordObject = new Word(word)

            // Same for the letters
            for (let l = 0; l <= 4; l++) {
                let letter = document.createElement('div');
                letter.className = 'letter';
                
                let letterObject = new Letter(letter);
                
                word.appendChild(letter);
                wordObject.letters.push(letterObject)
            }
            
            this.words.push(wordObject)
            container.appendChild(word)
        }
        main.appendChild(container);
    }
}

/**
 * A row of letter squares
 * @param {HTMLElement} element
 */
function Word(element) {
    this.element = element;
    this.letters = [];
}

/**
 * A letter square
 * @param {HTMLElement} element 
 */
function Letter(element) {
    this.element = element;
}