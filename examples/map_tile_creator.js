function mapCreator(documento){
    // TODO: Add your mapbox token right below!
  mapboxgl.accessToken = 'pk.eyJ1IjoibmF1amdzIiwiYSI6ImNqanNoejJjajJjbnUzcHJzc3ZpdWRqeWwifQ.l5BWLHz1meMwu5FiuROiKQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    center: [7.0982, 50.7374],
    zoom: 14
  });

  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');

  map.on('load', function () {
    map.addSource('bonn', {
      'type': 'vector',
      "tiles": ["http://192.168.1.234:8080/maps/bonn/{z}/{x}/{y}.vector.pbf?"],
      "tolerance": 0
    });

    if( documento.getElementById('road').checked){
      createRoadLayer(map);
    }else if( documento.getElementById('speed_ways').checked ){
      createSpeedWaysLayer(map);
    }else if( documento.getElementById('water').checked ){
      createRiversLayer(map);
    }
  });

  return map;
};

function layerUpdater(map,webPage){

  webPage.getElementById('road').onclick = function() {
    if ( webPage.getElementById('road').checked == true )
    {
      createRoadLayer(map);
    } else
    {    
      disableLayer("road");
    }
  };

  webPage.getElementById('speed_ways').onclick = function(){
    if ( webPage.getElementById('speed_ways').checked == true )
    {
      createSpeedWaysLayer(map);
    } else
    {    
      disableLayer("main_roads");
    }
  };

  webPage.getElementById('water').onclick = function(){
    if ( webPage.getElementById('water').checked == true )
    {
      createRiversLayer(map);
    } else
    {    
      disableLayer("lakes");
    }
  };
}

function createRoadLayer(map){
  map.addLayer({
    "id": "road",
    "source": "bonn",
    "source-layer": "road",
    "type": "line",
    "paint": {
      "line-color": "#FF0000",
      "line-width": 1.5
    }
  });
};

function createSpeedWaysLayer(map){
  map.addLayer({
    "id": "main_roads",
    "source": "bonn",
    "source-layer": "main_roads",
    "type": "line",
    "paint": {
      "line-color": "#000000",
      "line-width": 1
    }
  });
};

function createRiversLayer(map){
  map.addLayer({
  "id": "lakes",
  "source": "bonn",
  "source-layer": "lakes",
  "type": "line",
  "paint": {
    "line-color": "#339933",
    "line-width": 3
  }
});
};

function disableLayer(map, id_layer){
  map.removeLayer(id_layer);
};