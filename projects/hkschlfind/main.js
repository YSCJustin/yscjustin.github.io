document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('abc');
    const pictures = document.getElementById('pictures');
    let number = 1;
    button.addEventListener('click', function() {
        let element = document.createElement('p');
        element.innerHTML = `Hello World ${number}`;
        pictures.appendChild(element);
        number++;
    });
});