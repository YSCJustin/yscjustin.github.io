let stations;



const lineColors ={
    'AEL': '#008187',
    'KTL': '#00a139',
    'TCL': '#f8942e',
    'TKL': '#844091',
    'TML': '#942a02',
    'EAL': '#69bbeb',
    'SIL': '#cccc02',
    'ISL': '#0272be',
    'TWL': '#e10510',
    'DRL': '#ed6aa6'

}

const links = document.querySelectorAll('a');
links.forEach(link => {
  link.setAttribute('target', '_blank');
});

async function addFormEventListener() {
  await fetch('stations.json').then(response => response.json()).then(data => stations = data);
  const stationSelectOnly = document.getElementById('station-select-only');

  for (const line in stations) {

    for (const stationCode in stations[line]) {
      const stationName = stations[line][stationCode];
      let isOptionExists = false;
      for (const option of stationSelectOnly.options) {
        if (option.value === stationCode) {
          isOptionExists = true;
          break;
        }
      }
      if (!isOptionExists) {
        const option = document.createElement('option');
        option.value = stationCode;
        option.textContent = stationName;
        stationSelectOnly.appendChild(option);
      }
    }
  }
  const options = Array.from(stationSelectOnly.options);
options.sort((a, b) => a.value.localeCompare(b.value));

stationSelectOnly.innerHTML = '';
for (const option of options) {
  stationSelectOnly.appendChild(option);
}
      const currentYear = new Date().getFullYear();
      document.getElementById('current-year').textContent = currentYear;

    
const form = document.getElementById('train-form');
const scheduleContainer = document.getElementById('train-schedule');
const submitButton = document.getElementById('submit-button');
const footer = document.querySelector('footer');
const systime = document.getElementById('systime');
const toggleGradient = document.getElementById('toggle-gradient');


const platformElement = document.getElementById('station');
const delay = document.getElementById('delay');
form.addEventListener('submit', event => {
  event.preventDefault();
  submitButton.disabled = true;
  scheduleContainer.innerHTML = '';

  const line = document.getElementById('line-select').value;
  const station = document.getElementById('station-select').value;
  if(line == "" || station == ""){


    const station = document.getElementById('station-select-only').value;
    const lines = []
    //search for all the lines that have the statio
    for(const line in stations){
      const stationObject = stations[line][station]

      if(stationObject){
        lines.push(line);



      }
    }

    const body = document.querySelector('body');
    document.body.style.background = ''
    if(lines.length == 1){
     body.style.backgroundColor = lineColors[lines[0]]; 
     const textCOlor = getContrastColor(lineColors[lines[0]]);
      document.body.style.color = textCOlor;
      const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
   
      const borderColor = getContrastColor(bgColor);
      const h1 = document.querySelector('h1');
      document.body.style.color = borderColor;
      h1.style.borderTop = `2px solid ${borderColor}`;
      h1.style.borderBottom = `2px solid ${borderColor}`;
      h1.style.padding = '13px 0';
      h1.style.textAlign = 'center';
  
    } else {

    const colors = lines.map(line => lineColors[line]);
    const gradient = `linear-gradient(to right, ${colors.join(', ')})`; // add gradient definition here
    body.style.background = gradient;
if(toggleGradient.checked){

    body.style.backgroundSize = '200% 100%'; // add background-size property
    body.style.animation = 'gradient 15s ease infinite'; // add animation property


} else {
  body.style.backgroundSize = '100% 100%'; // add background-size property
  body.style.animation = ''
}
// Get the computed style of the body element
const bodyStyle = window.getComputedStyle(document.body);

// Get the background image of the body element
const backgroundImage = bodyStyle.backgroundImage;

// Extract the gradient colors from the background image
const gradientColors = backgroundImage.match(/rgba?\([\d\s,]+\)/g);

// Calculate the luminance of each color
const luminances = gradientColors.map(color => {
  const rgba = color.match(/\d+/g);
  const r = rgba[0];
  const g = rgba[1];
  const b = rgba[2];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance;
});

// Calculate the average luminance of the gradient
const averageLuminance = luminances.reduce((sum, luminance) => sum + luminance, 0) / luminances.length;

// Set the contrast color based on the average luminance
const borderColor = averageLuminance > 0.5 ? '#000' : '#fff';
document.body.style.color = borderColor;
const h1 = document.querySelector('h1');
h1.style.borderTop = `2px solid ${borderColor}`;
h1.style.borderBottom = `2px solid ${borderColor}`;
h1.style.padding = '13px 0';
h1.style.textAlign = 'center';
    }

   for(let line in lines){
    setTimeout(() => {

 
    line = lines[line];
    fetch(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`)
    .then(response => response.json())
    .then(data => {

      if(data.sys_time){
        systime.textContent = `Last Updated: ${data.sys_time}`;
      }
        systime.style.display = 'block';
        const lineHeading = document.createElement('h3');
        //change line to full name
        if(line == "ISL"){
          lineHeading.textContent = "Island Line";
        } else if(line == "TWL"){
          lineHeading.textContent = "Tseung Wan Line";
        } else if(line == "TML"){
          lineHeading.textContent = "Tuen Ma Line";
        } else if(line == "TKL"){
          lineHeading.textContent = "Tseung Kwan O Line";
        } else if(line == "EAL"){
          lineHeading.textContent = "East Rail Line";
        } else if(line == "TCL"){
          lineHeading.textContent = "Tung Chung Line";
        } else if(line == "AEL"){
          lineHeading.textContent = "Airport Express";
        } else if(line == "SIL"){
          lineHeading.textContent = "South Island Line";
        } else if(line == 'DRL'){
          lineHeading.textContent = "Disneyland Resort Line";
        }




     
        scheduleContainer.appendChild(lineHeading);
      if(data.status == 0){
        const text = document.createElement('h2')
        //check if data.url exists
        if(data.url){
         
const link = document.createElement('a');
link.classList.add('error-link');
link.href = data.url;
link.textContent = '>> Details <<';
const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
const borderColor = getContrastColor(bgColor);
link.style.color = borderColor;
        text.textContent = `ERROR: ${data.message}`;
        scheduleContainer.appendChild(link);
        } else {
          text.textContent = `ERROR: ${data.message}`;
        }
        return scheduleContainer.appendChild(text);
      }

      const stationObject = stations[line][station]



      platformElement.textContent = `${stationObject} Station`;
      let noUp = false;
      if(data.isdelay == "Y"){
  
        delay.style.display = 'block';

        delay.textContent = 'There is currently a delay on this line!';
      }
    if ('UP' in data.data[`${line}-${station}`]) {
        const upPlatform = data.data[`${line}-${station}`].UP;
        if(upPlatform.length == 0 && !('DOWN' in data.data[`${line}-${station}`])){
          noUp = true;
          const text = document.createElement('h2')
          text.textContent = `No trains are currently running`;
          return scheduleContainer.appendChild(text);
        } else {
        const upTable = createPlatformTable(upPlatform, 'UP');
        if(!('DOWN' in data.data[`${line}-${station}`])){

          upTable.classList.add('bottom-table')
        }
        scheduleContainer.appendChild(upTable);
        }
      }
      
      if ('DOWN' in data.data[`${line}-${station}`]) {
        const downPlatform = data.data[`${line}-${station}`].DOWN;
        if(downPlatform.length == 0 && noUp){
          const text = document.createElement('h2')
          text.textContent = `No trains are currently running`;
          return scheduleContainer.appendChild(text);
        } else {
        const downTable = createPlatformTable(downPlatform, 'DOWN');

          downTable.classList.add('bottom-table')
        
        scheduleContainer.appendChild(downTable);
        }
      }
      // const table = document.querySelector('.bottom-table');

      // const tableBottom = table.offsetTop + table.offsetHeight;
      // const footerTop = footer.offsetTop;
      // const spaceBetween = footerTop - tableBottom;
      // if (spaceBetween < 50) { // adjust the value as needed
      //   table.style.marginBottom = '150px';
      // } else {
      //   table.style.marginBottom = '0';
      // }
      function createPlatformTable(platform, direction) {
        const platformTable = document.createElement('table');
        platformTable.classList.add(direction);
      
        // Create table header
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const destHeader = document.createElement('th');
        const timeHeader = document.createElement('th');
        const upcomingHeader = document.createElement('th');
        const platformHeader = document.createElement('th');



        destHeader.textContent = 'Destination'
        upcomingHeader.textContent = 'Time Until Arrival';
        
        timeHeader.textContent = 'Time';
        platformHeader.textContent = 'Platform';
        headerRow.appendChild(destHeader);
        headerRow.appendChild(timeHeader);
        headerRow.appendChild(upcomingHeader);
        headerRow.appendChild(platformHeader);
      
        tableHeader.appendChild(headerRow);

        platformTable.appendChild(tableHeader);
  
      
        // Create table body
        const tableBody = document.createElement('tbody');
      
        // Iterate over upcoming trains
        platform.forEach(train => {
          const trainRow = document.createElement('tr');
          const trainDest = document.createElement('td');
          const trainTime = document.createElement('td');
                    const upcomingMinutes = document.createElement('td');
                    const trainPlatform = document.createElement('td');
              //find station name
          const stationName = stations[line]
       
          let addInfo = ""
          if(train.route){
            if(train.route == "RAC"){
              addInfo = "(via Racecourse)"
            }
          }
          trainDest.textContent = stationName[train.dest] + ` ${addInfo}`;
          trainTime.textContent = train.time;

          const epochTime = Math.round(Date.parse(train.time) / 1000 - Date.now() / 1000);
            // do something like hr and min if epochTime > 3600
            // else just min
            const minutes = Math.round(epochTime / 60);
            const hours = Math.floor(minutes / 60);
            if(hours > 0){
                upcomingMinutes.textContent = `${hours}hr ${minutes % 60}min`;

            } else {
                if(minutes <= 1 && minutes >= 0){
                    upcomingMinutes.textContent = `Arriving`;
                } else if(minutes < 0) {
                    upcomingMinutes.textContent = `Departing`;
                } else upcomingMinutes.textContent = `${minutes}min`;
            }
            trainPlatform.textContent = train.plat;
          trainRow.appendChild(trainDest);
          trainRow.appendChild(trainTime);
            trainRow.appendChild(upcomingMinutes);
            trainRow.appendChild(trainPlatform);

          tableBody.appendChild(trainRow);
        });
      
        platformTable.appendChild(tableBody);
        
        return platformTable;
      }
    })
  
    .catch(error => {
      console.error(error);
      const errorElement = document.createElement('p');

      errorElement.textContent = `ERROR: Failed to connect to API. Please try again later.`;

      errorElement.classList.add('center')

      scheduleContainer.appendChild(errorElement);

      const errorText = document.createElement('p');
      errorText.textContent = error;
      errorText.classList.add('center')
      scheduleContainer.appendChild(errorText);

      
    })
  }, 2500)
    }

    setTimeout(() => {
      submitButton.disabled = false;

    }, 9000);


  } else {
  fetch(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`)
    .then(response => response.json())
    .then(data => {
        scheduleContainer.innerHTML = '';

        if(data.sys_time){
          systime.textContent = `Last Updated: ${data.sys_time}`;
        }
        systime.style.display = 'block';
        
      if(data.status == 0){
        const text = document.createElement('h2')
        //check if data.url exists
        if(data.url){
         
const link = document.createElement('a');
link.classList.add('error-link');
link.href = data.url;
link.textContent = '>> Details <<';
const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
const borderColor = getContrastColor(bgColor);
link.style.color = borderColor;
        text.textContent = `ERROR: ${data.message}`;
        scheduleContainer.appendChild(link);
        } else {
          text.textContent = `ERROR: ${data.message}`;
        }
        return scheduleContainer.appendChild(text);
      }

      const stationObject = stations[line][station]


      platformElement.textContent = `${stationObject} Station`;
      let noUp = false;
      if(data.isdelay == "Y"){
  
        delay.style.display = 'block';

        delay.textContent = 'There is currently a delay on this line!';
      }
    if ('UP' in data.data[`${line}-${station}`]) {
        const upPlatform = data.data[`${line}-${station}`].UP;
        if(upPlatform.length == 0 && !('DOWN' in data.data[`${line}-${station}`])){
          noUp = true;
          const text = document.createElement('h2')
          text.textContent = `No trains are currently running`;
          return scheduleContainer.appendChild(text);
        } else {
        const upTable = createPlatformTable(upPlatform, 'UP');
        if(!('DOWN' in data.data[`${line}-${station}`])){

          upTable.classList.add('bottom-table')
        }
        scheduleContainer.appendChild(upTable);
        }
      }
      
      if ('DOWN' in data.data[`${line}-${station}`]) {
        const downPlatform = data.data[`${line}-${station}`].DOWN;
        if(downPlatform.length == 0 && noUp){
          const text = document.createElement('h2')
          text.textContent = `No trains are currently running`;
          return scheduleContainer.appendChild(text);
        } else {
        const downTable = createPlatformTable(downPlatform, 'DOWN');

          downTable.classList.add('bottom-table')
        
        scheduleContainer.appendChild(downTable);
        }
      }
      // const table = document.querySelector('.bottom-table');

      // const tableBottom = table.offsetTop + table.offsetHeight;
      // const footerTop = footer.offsetTop;
      // const spaceBetween = footerTop - tableBottom;
      // if (spaceBetween < 50) { // adjust the value as needed
      //   table.style.marginBottom = '150px';
      // } else {
      //   table.style.marginBottom = '0';
      // }
      function createPlatformTable(platform, direction) {
        const platformTable = document.createElement('table');
        platformTable.classList.add(direction);
      
        // Create table header
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const destHeader = document.createElement('th');
        const timeHeader = document.createElement('th');
        const upcomingHeader = document.createElement('th');
        const platformHeader = document.createElement('th');



        destHeader.textContent = 'Destination'
        upcomingHeader.textContent = 'Time Until Arrival';
        
        timeHeader.textContent = 'Time';
        platformHeader.textContent = 'Platform';
        headerRow.appendChild(destHeader);
        headerRow.appendChild(timeHeader);
        headerRow.appendChild(upcomingHeader);
        headerRow.appendChild(platformHeader);
      
        tableHeader.appendChild(headerRow);

        platformTable.appendChild(tableHeader);
  
      
        // Create table body
        const tableBody = document.createElement('tbody');
      
        // Iterate over upcoming trains
        platform.forEach(train => {
          const trainRow = document.createElement('tr');
          const trainDest = document.createElement('td');
          const trainTime = document.createElement('td');
                    const upcomingMinutes = document.createElement('td');
                    const trainPlatform = document.createElement('td');
                   
          const stationName = stations[line]
          let addInfo = ""
          if(train.route){
            if(train.route == "RAC"){
              addInfo = "(via Racecourse)"
            }
          }
          trainDest.textContent = stationName[train.dest] + ` ${addInfo}`;
          trainTime.textContent = train.time;

          const epochTime = Math.round(Date.parse(train.time) / 1000 - Date.now() / 1000);
            // do something like hr and min if epochTime > 3600
            // else just min
            const minutes = Math.round(epochTime / 60);
            const hours = Math.floor(minutes / 60);
            if(hours > 0){
                upcomingMinutes.textContent = `${hours}hr ${minutes % 60}min`;

            } else {
                if(minutes == 0){
                    upcomingMinutes.textContent = `Arriving`;
                } else if(minutes < 0) {
                    upcomingMinutes.textContent = `Departing`;
                } else upcomingMinutes.textContent = `${minutes}min`;
            }
            trainPlatform.textContent = train.plat;
          trainRow.appendChild(trainDest);
          trainRow.appendChild(trainTime);
            trainRow.appendChild(upcomingMinutes);
            trainRow.appendChild(trainPlatform);

          tableBody.appendChild(trainRow);
        });
      
        platformTable.appendChild(tableBody);
        
        return platformTable;
      }
    })
  
    .catch(error => {
      console.error(error);
      const errorElement = document.createElement('p');

      errorElement.textContent = `ERROR: Failed to connect to API. Please try again later.`;

      errorElement.classList.add('center')

      scheduleContainer.appendChild(errorElement);

      const errorText = document.createElement('p');
      errorText.textContent = error;
      errorText.classList.add('center')
      scheduleContainer.appendChild(errorText);

    })
    .finally(() => {

        setTimeout(() => {
          submitButton.disabled = false;
  
        }, 3000);
      });
    }
});

const lineSelect = document.getElementById('line-select');
const stationSelect = document.getElementById('station-select');
const stationSearch = document.getElementById('submit-button');
const stationLabel = document.getElementById('station-label');

lineSelect.addEventListener('change', () => {
   document.body.style.background = ''


    scheduleContainer.innerHTML = '';
    platformElement.textContent = '';
    stationSearch.style.display = 'none';
    delay.style.display = 'none';
    systime.style.display = 'none';
    const onlyOption = document.createElement('option');
    if(stationSelectOnly.options[0].value !== ''){

    
    
    onlyOption.value = '';
    onlyOption.textContent = '--Select a station--';
    stationSelectOnly.insertBefore(onlyOption, stationSelectOnly.firstChild);
    onlyOption.selected = true;
    }
    if(!onlyOption.selected){
      onlyOption.selected = true;

    }
  const line = lineSelect.value;
  const stationArray = stations[line];
  document.body.style.backgroundColor = lineColors[line];

  const emptyOption = lineSelect.querySelector('option[value=""]');
  if (emptyOption) {
    emptyOption.remove();
  }

  // Clear previous options
  stationSelect.innerHTML = '';
  const option = document.createElement('option');
    option.value = '';
    option.textContent = '--Select a station--';
  stationSelect.appendChild(option);
  // Add new options
  const stationNames = Object.values(stationArray);
  const stationCodes = Object.keys(stationArray);
  for (var i = 0; i < stationNames.length; i++) {
    const option = document.createElement('option');
    option.value = stationCodes[i];
    option.textContent = stationNames[i];
   

    stationSelect.appendChild(option);
  }
  // stationArray.forEach(stationObj => {
    
  //   const stationCode = Object.keys(stationObj)[0];
  //   const stationName = stationObj[stationCode];
  //   const option = document.createElement('option');
  //   option.value = stationCode;
  //   option.textContent = stationName;
  //   stationSelect.appendChild(option);
  // });
  
  // Show station-select element
  stationLabel.style.display = 'block';
  stationSelect.style.display = 'block';



  stationSelect.addEventListener('change', () => {
    const emptyOption = stationSelect.querySelector('option[value=""]');
    if(emptyOption) {
        emptyOption.remove();
    }
    stationSearch.style.display = 'block';
  })
  const backgroundColor = lineColors[line];
  const textColor = getContrastColor(backgroundColor);
  document.body.style.color = textColor;
  const h1 = document.querySelector('h1');
const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
const borderColor = getContrastColor(bgColor);
h1.style.borderTop = `2px solid ${borderColor}`;
h1.style.borderBottom = `2px solid ${borderColor}`;
h1.style.padding = '13px 0';
h1.style.textAlign = 'center';
});  
function getContrastColor(color) {
 
  let hex = color.replace('#', '');
  if (/^([0-9a-fA-F])\1+$/.test(hex)) {

    return hex.length === 3 ? '#fff' : '#000';
  }
  let r 
  let g 
  let b
  if(hex.includes("rgb")){

    const colors = hex.replace('rgb(', '').replace(')', '').split(',')
    r = parseInt(colors[0]) / 255;
    g = parseInt(colors[1]) / 255;
    b = parseInt(colors[2]) / 255;




  } else {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
     b = parseInt(hex.substring(4, 6), 16) / 255;
  }


  // Calculate relative luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b);

  // Set text color based on contrast ratio
  if (luminance > 0.9) {
    return '#000'; // Use black for very light colors
  } else {
    return luminance > 0.5 ? '#000' : '#fff';
  }
}
  stationSelectOnly.addEventListener('change', () => {
    submitButton.style.display = 'block';
    scheduleContainer.innerHTML = '';
    platformElement.textContent = '';
    stationSelect.style.display = 'none';
    stationLabel.style.display = 'none';
    document.body.style.backgroundColor = '#fff';


    delay.style.display = 'none';
    systime.style.display = 'none';
    if(lineSelect.options[0].value !== ''){

    
    
      
    const option = document.createElement('option');
    option.value = '';
    option.textContent = '--Select a line--';
    lineSelect.insertBefore(option, lineSelect.firstChild);
    option.selected = true;
    }


   
    const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
   
const borderColor = getContrastColor(bgColor);
const h1 = document.querySelector('h1');
document.body.style.color = borderColor;
h1.style.borderTop = `2px solid ${borderColor}`;
h1.style.borderBottom = `2px solid ${borderColor}`;
h1.style.padding = '13px 0';
h1.style.textAlign = 'center';
    const emptyOption = stationSelectOnly.querySelector('option[value=""]');
    if (emptyOption) {
      emptyOption.remove();
    }
  })
  toggleGradient.addEventListener('change', () => {
    if(!toggleGradient.checked){
      document.body.style.backgroundSize = '100% 100%'; 
      document.body.style.animation = ''
    } else {
      //check if there is a gradient
      if(document.body.style.background.includes('linear-gradient')){
        document.body.style.backgroundSize = '200% 100%'; // add background-size property
        document.body.style.animation = 'gradient 15s ease infinite'; // add animation property

      }



    }
  })
}
document.addEventListener('DOMContentLoaded', addFormEventListener);
