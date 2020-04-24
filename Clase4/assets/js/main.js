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

  //Bermuda Triangle Polygon. It has to end where it starts
  var triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);

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