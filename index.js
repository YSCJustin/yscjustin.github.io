document.addEventListener("DOMContentLoaded", async () => {
    const year = document.querySelector("#year")
    const date = new Date()
    year.innerHTML = date.getFullYear()

    const progressBar = document.querySelector("#pro1")
    const progressBarSpan = document.querySelector("#pro2")
    const randomButton = document.querySelector("#randomButton")
  const delay = ms => new Promise(res => setTimeout(res, ms));
    async function progressUpdate(){
        const time = Math.floor(Math.random() * 4) + 2
      setTimeout(async () => {
        const random = Math.floor(Math.random() * 15)
        if(progressBar.value < 100 && progressBar.hasAttribute("value")){
            progressBar.value += random

            progressBarSpan.innerHTML = progressBar.value + "%"
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