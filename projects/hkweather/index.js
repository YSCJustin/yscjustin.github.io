document.addEventListener("DOMContentLoaded", async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
   const button = document.querySelector("#lang");
    const typhoonElement = document.querySelector("#typhoon");
    const lastUpdated = document.querySelector("#lastupdated");
    let replaying = false;
    const title2 = document.querySelector("#title2");
    const activate = document.querySelector("#awchart");
    const replay = document.querySelector("#replay");
    const footer = document.querySelector("#info");
    const introduce = document.querySelector("#introduce");
    const activateWeatherChart = document.querySelector("#awchart");
    let hkodata;
    let secondarydata;
   await weatherData("en");

    activate.addEventListener("click", async () => {
        await wChartUpdate();
    })
   button.addEventListener("click", async () => {

        if(button.classList.contains("en")) {
            await weatherData("tc");
            button.classList.remove("en");
            button.classList.add("tc");
            button.innerHTML = "Change to English";
            title2.innerHTML = "天氣圖表";
            document.querySelector("#title").innerHTML = "天氣專題研習";
            footer.textContent = "顯示一個由29張天氣圖表組成的動畫，每450毫秒更換一次。"

                activateWeatherChart.innerHTML = "啟動";

                replay.innerHTML = "重播";
            
        } else {
            await weatherData("en");
            button.classList.remove("tc");
            button.classList.add("en");
            button.innerHTML = "轉做中文";
            title2.innerHTML = "Weather Chart";
            footer.innerHTML = "Displays an animation consisting of 29 weather charts changing every 450ms."
            document.querySelector("#title").innerHTML = "Weather Project";

                activateWeatherChart.innerHTML = "Activate";
            
   
                replay.innerHTML = "Replay";
            

        }
   })


   replay.addEventListener("click", async () => {
         if(!replaying){
          replaying = true;

          await wChartUpdate();
          replaying = false;
         }
   })
   async function weatherData(language){
    await fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=${language}`).then(response => response.json()).then(data => {hkodata = data})
    let typhoon = false;
    if(language === "tc"){
        introduce.textContent = "沒有他分析的網站，就是不完整的天氣預報。"
    } else {
        introduce.textContent = "The website without his analysis, which is very bad."
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
        await fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warninginfo&lang=${language}`).then(response => response.json()).then(data => {secondarydata = data})
        for(let i = 0; i < secondarydata.details.length; i++) {
            if(secondarydata.details[i].warningStatementCode === "WTCSGNL"){
                let data = ""
                for(let j = 0; j < secondarydata.details[i].contents.length; j++){
                    data += secondarydata.details[i].contents[j] + "<br>";

                }
                typhoon = true;
                typhoonElement.innerHTML = data;
                const date = new Date(secondarydata.details[i].updateTime);
                if(language === "tc"){
                    lastUpdated.innerHTML = `最後更新： ${date.toLocaleString("zh-Hant")}`;
                } else {
                    lastUpdated.innerHTML = `Last Updated: ${date.toLocaleString("en")}`;
                }
                break;
            }
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

   async function wChartUpdate(){
    replay.classList.remove("n");
    replay.hidden = true;
    activateWeatherChart.classList.remove("n");
    activateWeatherChart.hidden = true;
       const weatherChart = document.querySelector("#wchart");
//set weatherChart source
const times = ["02", "08", "14", "20"];
const now = new Date();
let newDay = false;
let year = now.getFullYear();
let hour = String(now.getHours()).padStart(2, '0');
if(parseInt(hour) < 2){
    now.setDate(now.getDate() - 1);
    //set hour to 20
    newDay = true;
    year = now.getFullYear();

}
now.setDate(now.getDate() -7);
let month = String(now.getMonth() + 1).padStart(2, '0');
let day = String(now.getDate()).padStart(2, '0');
hour = String(now.getHours()).padStart(2, '0');
if(newDay) hour = "20";



let closest = 0;
let closestTime = 0;
for(let i = 0; i < times.length; i++){
    if(parseInt(hour) >= parseInt(times[i])){
        closest = i;
    }
}
closestTime = times[closest];
for(let i = 0; i < 29; i++){

    weatherChart.src =`https://www.hko.gov.hk/wxinfo/currwx/wxchart/${year}${month}${day}${closestTime}.gif`
    closestTime = times[(closest + 1) % 4];
    closest = (closest + 1) % 4;
    if(closestTime === "02"){
        now.setDate(now.getDate() + 1);
        year = now.getFullYear();
        month = String(now.getMonth() + 1).padStart(2, '0');
        day = String(now.getDate()).padStart(2, '0');
    }
    await delay(450);
}
replay.hidden = false;
replay.classList.add("n");
   }
//    const weatherChart = document.querySelector("#wchart");
//    //set weatherChart source
//    const times = ["02", "08", "14", "20"];
//    const now = new Date();
//     let year = now.getFullYear();
//     let hour = String(now.getHours()).padStart(2, '0');

//     now.setDate(now.getDate() -7);
//     let month = String(now.getMonth() + 1).padStart(2, '0');
//     let day = String(now.getDate()).padStart(2, '0');
//     hour = String(now.getHours()).padStart(2, '0');



//     let closest = 0;
//     let closestTime = 0;
//     for(let i = 0; i < times.length; i++){
//         if(parseInt(hour) >= parseInt(times[i])){
//             closest = i;
//         }
//     }
//     closestTime = times[closest];
//     for(let i = 0; i < 29; i++){

//         weatherChart.src =`https://www.hko.gov.hk/wxinfo/currwx/wxchart/${year}${month}${day}${closestTime}.gif`
//         closestTime = times[(closest + 1) % 4];
//         closest = (closest + 1) % 4;
//         if(closestTime === "02"){
//             now.setDate(now.getDate() + 1);
//             year = now.getFullYear();
//             month = String(now.getMonth() + 1).padStart(2, '0');
//             day = String(now.getDate()).padStart(2, '0');
//         }
//         await delay(500);
//     }



})