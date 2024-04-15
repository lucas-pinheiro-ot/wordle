
function Keyboard() {
    this.keys = {};
    
    this.draw = (container) => {
        let layers = ['qwertyuiop', 'asdfghjkl', '➤zxcvbnm⌫'];

        layers.forEach((layer, index) => {
            let keyLayerElement = document.createElement('div');
            keyLayerElement.classList.add('keyLayer');

            layer.split('').forEach((key) => {
                let keyElement = document.createElement('button');
                keyElement.classList.add('key', 'keyLayer'+ index);
                keyElement.innerHTML = key.toUpperCase();
                keyElement.addEventListener('click', () => {
                    console.log('clicked ' + keyElement.innerHTML)
                })

                keyLayerElement.appendChild(keyElement)

                let keyObject = new Key(keyElement);
                this.keys[key] = keyObject;
            })

            container.appendChild(keyLayerElement);
        });
    }
}


function Key(element) {
    this.element = element;
    this.class = this.element.classList;
    this.key = this.element.innerHTML;

    this.animate = (animClass) => {
        this.element.classList.remove(animClass);
        this.element.offsetWidth;
        this.element.classList.add(animClass);
    }

    this.element.addEventListener('mousedown', () => {
        if (this.key == '➤') { this.key = 'Enter' }
        if (this.key == '⌫') { this.key = 'Backspace'}
        write(this)
    });
}