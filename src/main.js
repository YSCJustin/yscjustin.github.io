function checkAElement() {
    var aElement = document.querySelector('a');
    if (aElement) {
        setTimeout(function() {
            alert("Hello World!");
        }, 50); 
    } else {
        setTimeout(checkAElement, 50);
    }
}
 
checkAElement(); 
