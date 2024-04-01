
function Keyboard() {
    let layers = ['qwertyuiop', 'asdfghjklç', '➤zxcvbnm⌫'];
    

    this.draw = (container) => {
        layers.forEach((layer, index) => {
            let keyLayerElement = document.createElement('div');
            keyLayerElement.classList.add('keyLayer');

            layer.split('').forEach((key) => {
                let keyElement = document.createElement('div');
                keyElement.classList.add('key', 'keyLayer'+ index);
                keyElement.innerHTML = key.toUpperCase();

                keyLayerElement.appendChild(keyElement)
            })

            container.appendChild(keyLayerElement);
        });
    }
}