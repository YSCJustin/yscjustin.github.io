document.addEventListener("DOMContentLoaded", async () => {


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
    async function progressUpdate(){
        const time = Math.floor(Math.random() * 3) + 2
      setTimeout(async () => {
        const random = Math.floor(Math.random() * 20)+1
        if(progressBar.value < 100 && progressBar.hasAttribute("value")){
            progressBar.value += random
          let randomWord = words[Math.floor(Math.random() * words.length)]
          let format = formats[Math.floor(Math.random() * formats.length)]
            progressBarSpan.innerHTML = progressBar.value + "% " + `Downloading   <strong>${randomWord.toUpperCase()}.${format}</strong>`
            if(progressBar.value >= 100){
                progressBarSpan.innerHTML = ""
                progressBar.removeAttribute("value")
                progressBar.removeAttribute("max")
                const delayTime = Math.floor(Math.random() * 5) + 1
                await delay(delayTime*1000)
                progressBar.setAttribute("value", 0)
                progressBar.setAttribute("max", 100)
            }
        } else if(progressBar.value >= 100){
            progressBarSpan.innerHTML = ""
            progressBar.removeAttribute("value")
            progressBar.removeAttribute("max")
            const delayTime = Math.floor(Math.random() * 5) + 1
            await delay(delayTime*1000)
            progressBar.setAttribute("value", 0)
            progressBar.setAttribute("max", 100)
        }
        await progressUpdate()
      }, time*1020)
    }
    progressUpdate()

    randomButton.addEventListener("click", () => {
        randomButton.setAttribute("aria-busy", true)
        randomButton.innerHTML=" Loading..."
        randomButton.classList.add("secondary")

    })
})