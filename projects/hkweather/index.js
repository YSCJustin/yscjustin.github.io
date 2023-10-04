document.addEventListener("DOMContentLoaded", async () => {
   const button = document.querySelector("#lang");
    const typhoonElement = document.querySelector("#typhoon");
    const lastUpdated = document.querySelector("#lastupdated");
    const introduce = document.querySelector("#introduce");
    let hkodata;
   await weatherData("en");


   button.addEventListener("click", async () => {
        if(button.classList.contains("en")) {
            await weatherData("tc");
            button.classList.remove("en");
            button.classList.add("tc");
            button.innerHTML = "Change to English";
            document.querySelector("#title").innerHTML = "天氣專題研習";
        } else {
            await weatherData("en");
            button.classList.remove("tc");
            button.classList.add("en");
            button.innerHTML = "轉做中文";
            document.querySelector("#title").innerHTML = "Weather Project";
        }
   })
   async function weatherData(language){
    await fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=${language}`).then(response => response.json()).then(data => {hkodata = data})
    let typhoon = false;
    if(language === "tc"){
        introduce.textContent = "沒有他分析的網站，就是不完整的天氣預報。"
    } else {
        introduce.textContent = "The website without his analysis, which is bad."
    }
    for(let i = 0; i < hkodata.swt.length; i++) {

            if(hkodata.swt[i].desc.includes("Tropical Cyclone") || hkodata.swt[i].desc.includes("Typhoon") || hkodata.swt[i].desc.includes("熱帶氣旋") || hkodata.swt[i].desc.includes("颱風")){
                typhoon = true;
                typhoonElement.innerHTML = hkodata.swt[i].desc;
                const date = new Date(hkodata.swt[i].updateTime);
                if(language === "tc"){
                    lastUpdated.innerHTML = `最後更新： ${date.toLocaleString("zh-Hant")}`;
                } else {
                    lastUpdated.innerHTML = `Last Updated: ${date.toLocaleString("en")}`;
                }
                break;
            }

    
         
    }
    if(!typhoon){
        if(language === "tc"){
            typhoonElement.innerHTML = "現時沒有熱帶氣旋";
        } else {
            typhoonElement.innerHTML = "No Tropical Cyclone at the moment";
        }
    }
   }
})