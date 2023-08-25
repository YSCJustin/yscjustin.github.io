document.addEventListener("DOMContentLoaded", async () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add("show")
            } else {
                entry.target.classList.remove("show")
            }
            
        })
    })
    
    
   
    const hiddenSections = document.querySelectorAll(".hidden");

    hiddenSections.forEach((sec) => observer.observe(sec))
    
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;


})

