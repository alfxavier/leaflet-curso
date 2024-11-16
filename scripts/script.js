// Inicializar o mapa
var map = L.map('map').setView([-15.8191, -47.9173], 12); // Latitude, Longitude e Zoom

// Adicionar uma camada base (Esri)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    maxZoom: 18
}).addTo(map);

// Função para carregar e renderizar o shapefile
function loadShapefile(fileUrl) {
    fetch(fileUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            // Converter shapefile para GeoJSON
            shp(buffer).then(geojson => {
                // Adicionar os dados GeoJSON ao mapa
                L.geoJSON(geojson, {
                    style: function (feature) {
                        return { color: '#ff0000' }; // Cor das feições
                    },
                    onEachFeature: function (feature, layer) {
                        // Adicionar popups com informações dos atributos
                        layer.bindPopup(
                            Object.keys(feature.properties)
                                .map(key => `<b>${key}:</b> ${feature.properties[key]}`)
                                .join('<br>')
                        );
                    }
                }).addTo(map);
            });
        })
        .catch(err => console.error('Erro ao carregar shapefile:', err));
}

// Exemplo: Carregar shapefile hospedado
loadShapefile('AREA_IMOVEL.zip');
