document.addEventListener("DOMContentLoaded", async () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  if(prefersDarkMode){
    const html = document.querySelector("html")
    html.setAttribute("data-theme", "dark")
  } else {
    const html = document.querySelector("html")
    html.setAttribute("data-theme", "light")
  }

let words = [];
let formats = ["js", "json", "html", "css", "php", "cpp", "md", "txt", "py", "java", "c", "ts", "tsx", "jsx", "rb", "go"]
  await fetch('words.json').then(response => response.json()).then(data => words = data);

    const year = document.querySelector("#year")
    const date = new Date()
    year.innerHTML = date.getFullYear()

    const progressBar = document.querySelector("#pro1")
    const progressBarSpan = document.querySelector("#pro2")
    const randomButton = document.querySelector("#randomButton")
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let randomWord = words[Math.floor(Math.random() * words.length)]
  let format = formats[Math.floor(Math.random() * formats.length)]
  progressBarSpan.innerHTML = progressBar.value + "% " + `Downloading   <strong>${randomWord.toUpperCase()}.${format}</strong>`
    async function progressUpdate(){
      const time = Math.floor(Math.random() * 45) + 6
      setTimeout(async () => {
        
        const random = Math.floor(Math.random() * 30)+1
        if(progressBar.value < 100 && progressBar.hasAttribute("value")){
            progressBar.value += random
          let randomWord = words[Math.floor(Math.random() * words.length)]
          let format = formats[Math.floor(Math.random() * formats.length)]
          progressBarSpan.innerHTML = progressBar.value + "% " + `Downloading   <strong>${randomWord.toUpperCase()}.${format}</strong>`
            // if(progressBar.value >= 100){
            //     progressBarSpan.innerHTML = ""
            //     progressBar.removeAttribute("value")
            //     progressBar.removeAttribute("max")
            //     const delayTime = Math.floor(Math.random() * 5) + 1
            //     await delay(delayTime*1000)
            //     progressBar.setAttribute("value", 0)
            //     progressBar.setAttribute("max", 100)
            //     let randomWord = words[Math.floor(Math.random() * words.length)]
            //     let format = formats[Math.floor(Math.random() * formats.length)]
            //     progressBarSpan.innerHTML = progressBar.value + "% " + `Downloading   <strong>${randomWord.toUpperCase()}.${format}</strong>`
            // }
        } else if(progressBar.value >= 100){
        
            progressBarSpan.innerHTML = ""
            progressBar.removeAttribute("value")
            progressBar.removeAttribute("max")
            const delayTime = Math.floor(Math.random() * 5) + 3
            await delay(delayTime*1000)
            progressBar.setAttribute("value", 0)
            progressBar.setAttribute("max", 100)
            let randomWord = words[Math.floor(Math.random() * words.length)]
            let format = formats[Math.floor(Math.random() * formats.length)]
            progressBarSpan.innerHTML = progressBar.value + "% " + `Downloading   <strong>${randomWord.toUpperCase()}.${format}</strong>`
        }
        await progressUpdate()
      }, time/10*1020)
    }
    progressUpdate()

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