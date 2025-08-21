let stopsArray = [];

// Presets
const presets = {
  "3rit11:30": {
    departureTime: "11:30",
    vehicleType: "Tram",
    endPoint: "Scharendijke",
    changeText: "Haltes De Punt en Middelplaat Haven zijn haltes op aanvraag.",
    numCars: 4,
    locAsCar: false,
    numberCars: true,
    stops: [
      {name:"De Punt", icon:""},
      {name:"Port Zélande", icon:"bus"},
      {name:"Middelplaat Haven", icon:""}
    ]
  },
  "3rit13:30": {
    departureTime: "13:30",
    vehicleType: "Tram",
    endPoint: "Scharendijke",
    changeText: "Haltes De Punt en Middelplaat Haven zijn haltes op aanvraag.",
    numCars: 4,
    locAsCar: false,
    numberCars: true,
    stops: [
      {name:"De Punt", icon:""},
      {name:"Port Zélande", icon:"bus"},
      {name:"Middelplaat Haven", icon:"boot"}
    ]
  },
    "3rit15:30": {
    departureTime: "15:30",
    vehicleType: "Tram",
    endPoint: "Scharendijke",
    changeText: "Haltes De Punt en Middelplaat Haven zijn haltes op aanvraag.",
    numCars: 4,
    locAsCar: false,
    numberCars: true,
    stops: [
      {name:"De Punt", icon:""},
      {name:"Port Zélande", icon:"bus"},
      {name:"Middelplaat Haven", icon:""}
    ]
  },
  "2rit13:30": {
    departureTime: "13:30",
    vehicleType: "Tram",
    endPoint: "Scharendijke",
    changeText: "Haltes De Punt en Middelplaat Haven zijn haltes op aanvraag.",
    numCars: 4,
    locAsCar: false,
    numberCars: true,
    stops: [
      {name:"De Punt", icon:""},
      {name:"Port Zélande", icon:"bus"},
      {name:"Middelplaat Haven", icon:"boot"}
    ]
  },
  "2rit15:30": {
    departureTime: "15:30",
    vehicleType: "Tram",
    endPoint: "Scharendijke",
    changeText: "Haltes De Punt en Middelplaat Haven zijn haltes op aanvraag.",
    numCars: 4,
    locAsCar: false,
    numberCars: true,
    stops: [
      {name:"De Punt", icon:""},
      {name:"Port Zélande", icon:"bus"},
      {name:"Middelplaat Haven", icon:""}
    ]
  }
};

// Preset toepassen
function applyPreset() {
  const selected = document.getElementById('presetSelect').value;
  if(selected && presets[selected]){
    const preset = presets[selected];

    document.getElementById('departureTime').value = preset.departureTime;
    document.getElementById('vehicleType').value = preset.vehicleType;
    document.getElementById('endPoint').value = preset.endPoint;
    document.getElementById('changeText').value = preset.changeText;
    document.getElementById('numCars').value = preset.numCars;
    document.getElementById('locAsCar').checked = preset.locAsCar;
    document.getElementById('numberCars').checked = preset.numberCars;

    stopsArray = preset.stops.map(s => ({name:s.name, icon:s.icon}));

    renderStopsList();
    updateBoard();
  }
}

// Halte toevoegen/verwijderen
function addStop() {
  const name = document.getElementById('newStopName').value;
  const icon = document.getElementById('newStopIcon').value;
  if(name) {
    stopsArray.push({name, icon});
    renderStopsList();
    document.getElementById('newStopName').value = '';
    document.getElementById('newStopIcon').value = '';
  }
}

function removeStop(index) {
  stopsArray.splice(index,1);
  renderStopsList();
}

function renderStopsList() {
  const stopsDiv = document.getElementById('stopsList');
  stopsDiv.innerHTML = '';
  stopsArray.forEach((stop,index)=>{
    const div = document.createElement('div');
    div.className = 'stopItem';
    div.textContent = stop.name + ' (' + (stop.icon || 'Geen') + ')';
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.onclick = ()=>removeStop(index);
    div.appendChild(btn);
    stopsDiv.appendChild(div);
  });
}

// Update bord
function updateBoard() {
  const departureTime = document.getElementById('departureTime').value;
  const vehicleType = document.getElementById('vehicleType').value;
  const endPoint = document.getElementById('endPoint').value;
  const changeText = document.getElementById('changeText').value;
  const numCars = parseInt(document.getElementById('numCars').value);
  const locAsCar = document.getElementById('locAsCar').checked;
  const numberCars = document.getElementById('numberCars').checked;

  document.getElementById('timeDisplay').textContent = departureTime;
  document.getElementById('typeDisplay').innerHTML = `<img src="rtm-logo.png" alt="RTM" class="logo"><span>${vehicleType}</span>`;
  document.getElementById('endPointDisplay').textContent = endPoint;
  document.getElementById('changeTextDisplay').textContent = changeText;

  // Tussenstops renderen
  const stopsDisplay = document.getElementById('stopsDisplay');
  stopsDisplay.innerHTML = '';
  stopsArray.forEach((stop,index)=>{
    if(index>0){
      if(index === stopsArray.length-1){
        stopsDisplay.innerHTML += ' en ';
      } else {
        stopsDisplay.innerHTML += ', ';
      }
    }
    const span = document.createElement('span');
    span.textContent = stop.name;
    stopsDisplay.appendChild(span);

    if(stop.icon==='bus'){
      const img = document.createElement('img');
      img.src = 'bus-icon.png';
      img.alt = 'Bus';
      stopsDisplay.appendChild(img);
    } else if(stop.icon==='boot'){
      const img = document.createElement('img');
      img.src = 'boot-icon.png';
      img.alt = 'Boot';
      stopsDisplay.appendChild(img);
    }
  });

  // Trein renderen
  const train = document.getElementById('train');
  train.innerHTML = '';

  const locDiv = document.createElement('div');
  locDiv.className = 'loc';
  locDiv.textContent = (locAsCar && numberCars) ? '1' : '';
  train.appendChild(locDiv);

  for(let i=0;i<numCars;i++){
    const carDiv = document.createElement('div');
    carDiv.className = 'car';
    if(numberCars){
      carDiv.textContent = locAsCar ? i+2 : i+1;
    } else {
      carDiv.textContent = '';
    }
    train.appendChild(carDiv);
  }

  // Spoor update
  document.getElementById('trackDisplay').textContent = "Spoor " + (locAsCar ? numCars+1 : numCars);
}

// Fullscreen functionaliteit
document.addEventListener('keydown', function(e) {
  if(e.key === 'f' || e.key === 'F'){
    const board = document.getElementById('boardDisplay');
    const settings = document.querySelector('.settings');
    if(!document.fullscreenElement){
      board.requestFullscreen().then(() => {
        settings.style.display = 'none';
      });
    } else {
      document.exitFullscreen().then(() => {
        settings.style.display = 'block';
      });
    }
  }
});

// Init bord
updateBoard();
