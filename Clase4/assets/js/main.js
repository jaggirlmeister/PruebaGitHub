let markersAll = [];
let map = "";
window.initMap = () => {
  // The location of Palermo Hollywood
  const initialLocation = { lat: -34.581870, lng: -58.433660 };

  // The map, centered at Palermo Hollywood
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: initialLocation,
    styles, //styles: styles -> porque se llaman igual. clave: valor.
    streetViewControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    mapTypeControlOptions: {
      mapTypeIds: [],
    },
  });
  fetchMarkers(map);
};

const fetchMarkers = async (map) => {
  try {
    const response = await fetch("assets/data/markers.json");
    const json = await response.json();
    json.forEach((marker) => {
      addMarker(map, marker);
    });
  } catch (error) {
    console.log(error);
  }
};

const addMarker = (map, marker) => {
  const { lat, lng, name, type, description } = marker;
  const contentString = `
  <div>
  <h2>${name}</h2>
  <h3>${type}</h3>
  <p>${description}</p>
  </div>`;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  const icons = {
    Birreria: "/assets/images/beer.png",
    Restaurant: "/assets/images/food.png",
    "Barcito Cheto": "/assets/images/bar.png",
  };

  const markerItem = new google.maps.Marker({
    position: { lat, lng }, //{lat:lat, lng:lng}
    map, //map:map
    icon: icons[type],
    customInfo: type,
  });
  markerItem.setMap(map);
  markerItem.addListener("click", function () {
    infowindow.open(map, markerItem);
  });
  markersAll.push(markerItem);
};


//FILTROS

const handleFilterBeer = document.querySelector(".beer");
const handleFilterFood = document.querySelector(".food");
const handleFilterBar = document.querySelector(".bar");

handleFilterBeer.addEventListener("click", (e) => {
  e.preventDefault();
  addMarkerFiltered("Birreria");
});

handleFilterFood.addEventListener("click", (e) => {
  e.preventDefault();
  addMarkerFiltered("Restaurant");
});

handleFilterBar.addEventListener("click", (e) => {
  e.preventDefault();
  addMarkerFiltered("Barcito Cheto");
});

const addMarkerFiltered = (markerType) => {
  console.log("clicked");
  markersAll.forEach((marker) => {
    marker.setMap(null); //Quita todos los markers del mapa
  });

  const markerFiltered = markersAll.filter(
    (markerItem) => markerItem.customInfo === markerType
  );
  markerFiltered.forEach((marker) => {
    marker.setMap(map);
  });
};
