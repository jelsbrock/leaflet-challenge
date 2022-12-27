const link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(link).then(function (data) {
    console.log(data);

    earthquakesLoc = []
    for (var i = 0; i < data.features.length; i++) {
        let earthquake = data.features[i].geometry.coordinates;
        earthquakesLoc.push(earthquake);
        let location = [earthquake[1], earthquake[0]];
        let depth = earthquake[2];
        let magnitude = data.features[i].properties.mag

        function color(depth) {
            if (depth > 600) {
                return "#ea2c2c";
            }
            if (depth > 300) {
                return "#ea822c";
            }
            if (depth > 150) {
                return "#ee9c00";
            }
            if (depth > 75) {
                return "#eecc00";
            }
            if (depth > 5) {
                return "#d4ee00";
            }
            return "#98ee00";
        };

        function size(magnitude) {
            if (magnitude > 6) {
                return 250000;
            }
            if (magnitude > 5.5) {
                return 125000;
            }
            if (magnitude > 5) {
                return 62500;
            }
            if (magnitude > 4.5) {
                return 31250;
            }
            return 10000;
        };

        L.circle(location, {
            color: 'black',
            fillColor: color(depth),
            fillOpacity: 0.8,
            radius: size(magnitude),
            weight: 0.5})
            .bindPopup(`<h1>${data.features[i].properties.place}</h1> <hr> <h3>${new Date(data.features[i].properties.time)}</h3>`)
            .addTo(myMap);
    
    };

//     var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + color(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br><br>' : '+');
//     }

//     return div;
// };

//     legend.addTo(myMap);

}); 