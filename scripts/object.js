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