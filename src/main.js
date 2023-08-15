const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtn.classList.toggle('open');
  content.classList.toggle('shift');
});
function checkAElement() {
    var aElement = document.querySelector('a');
    if (aElement) {
        setTimeout(function() {
            alert("real!");
        }, 50); 
    } else {
        setTimeout(checkAElement, 50);
    }
}
 
checkAElement(); 

