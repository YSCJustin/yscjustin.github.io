document.addEventListener("DOMContentLoaded", async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const year = document.getElementById("year");
    const date = new Date();
    year.innerText = date.getFullYear();
    const randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", async () => {
    randomButton.setAttribute("aria-busy", true)
    randomButton.innerHTML=" Loading..."
    randomButton.classList.add("secondary")
    await delay(500)
    randomButton.setAttribute("aria-busy", false)
    randomButton.innerHTML=" Click me?"
    randomButton.classList.remove("secondary")
    const html = document.querySelector("html")

    if(html.getAttribute("data-theme") == "light"){
      html.setAttribute("data-theme", "dark")
    } else {
      html.setAttribute("data-theme", "light")
    }
    
})
  })