document.addEventListener('DOMContentLoaded', async () => {
// Get all the nav-btns in the page
let navBtns = document.querySelectorAll('#header-btn');
console.log(navBtns)
// Add an event handler for all nav-btns to enable the dropdown functionality
navBtns.forEach(function (ele) {
    ele.addEventListener('click', function() {
        // Get the dropdown-menu associated with this nav button (insert the id of your menu)
        let dropDownMenu = document.getElementById('header-menu');
        console.log(dropDownMenu)
        // Toggle the nav-btn and the dropdown menu
        ele.classList.toggle('active');
        dropDownMenu.classList.toggle('active');
    });
});
})