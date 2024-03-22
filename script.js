function draw() {
    var container = document.createElement('div');
    container.className = 'container';

    for (let i = 1; i <= 5; i++) {
        var word = document.createElement('div');
        word.className = 'word';
    
        for (let o = 0; o <= 4; o++) {
            var letter = document.createElement('div');
            letter.className = 'letter';

            word.appendChild(letter);
        }
        
        container.appendChild(word)
    }
    document.body.appendChild(container)
}