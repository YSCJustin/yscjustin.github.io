document.addEventListener("DOMContentLoaded", async () => {


let words = [];
let formats = ["js", "json", "html", "css", "php", "cpp", "md", "txt", "py", "java", "c", "ts", "tsx", "jsx", "rb", "go"]
  await fetch('words.json').then(response => response.json()).then(data => words = data);

    const year = document.querySelector("#year")
    const date = new Date()
    year.innerHTML = date.getFullYear()

    const progressBar = document.querySelector("#pro1")
    const progressBarSpan = document.querySelector("#pro2")

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
      // Get the modal background and modal box elements






    let data = {}
  
     await fetch('/words.json').then(response => response.json()).then(json => data = json);

        const shouldShowModal = data.modalActivate;
     
        if (shouldShowModal) {


        // Get the modal background and modal box elements
        const modalBackground = document.querySelector('.modal-background');
        const modalBox = document.querySelector('.modal-box');

        // Get the close button element
        const closeButton = document.querySelector('.close-button');
          const title = document.querySelector('.title');
          title.innerHTML = data.modal.title
          const content = document.querySelector('.content');
          content.innerHTML = data.modal.content

        // Add an event listener to the modal background
          modalBackground.style.display = 'flex';
          modalBox.style.display = 'block';
          modalBackground.classList.add('show');
          modalBox.classList.add('show');
          // Enable scrolling and clicking on the page
          document.body.style.overflow = 'hidden';

        // Add an event listener to the close button
        closeButton.addEventListener('click', async () => {
          modalBackground.classList.remove('show');
          modalBox.classList.remove('show');

          // Hide the modal background and modal box
          modalBackground.style.display = 'none';
          modalBox.style.display = 'none';

          // Enable scrolling and clicking on the page
          document.body.style.overflow = 'auto';
          document.body.style.pointerEvents = 'auto';

        });

        // Show the modal background and modal box


      } else {
        const modalBackground = document.querySelector('.modal-background');
        const modalBox = document.querySelector('.modal-box');
        modalBackground.style.display = 'none';
        modalBox.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
      }
 

})