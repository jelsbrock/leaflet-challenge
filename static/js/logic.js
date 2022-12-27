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

    for (var i = 0; i < data.features.length; i++) {
        let earthquake = data.features[i].geometry.coordinates;
        let location = [earthquake[1], earthquake[0]];
        let depth = earthquake[2];
        let magnitude = data.features[i].properties.mag

        function color(depth) {
            if (depth > 500) {
                return "#ea2c2c";
            }
            if (depth > 400) {
                return "#ea822c";
            }
            if (depth > 300) {
                return "#ee9c00";
            }
            if (depth > 200) {
                return "#eecc00";
            }
            if (depth > 100) {
                return "#d4ee00";
            }
            if (depth > 0) {
            return "#98ee00";
            }
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
            .bindPopup(`<h3>Location: ${data.features[i].properties.place}</h3> <hr> <h3>Magnitude: ${magnitude}</h3> <hr> <h3>Date & Time: ${new Date(data.features[i].properties.time)}</h3>`)
            .addTo(myMap);

    };

    let legend = L.control({position: 'bottomright'});

	legend.onAdd = function() {
	    let div = L.DomUtil.create('div', 'info legend');
		let grades = [0, 100, 200, 300, 400, 500];
		let labels = [];

        for (var i = 0; i < grades.length; i++) {
            labels.push('<i style="background-color:' + color(grades[i] + 1.0) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></i>');
        }
        
		div.innerHTML = labels.join('<br>');
		return div;
    };

	legend.addTo(myMap);
    
});