const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtn.classList.toggle('open');
  content.classList.toggle('shift');
});


