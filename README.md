# HackWeek-VectorTile
Little investigation of Vector Tile Servers and Testing of Tegola VTS

---
# Introduction

Researching about *Vector Tile Server* (VTS) I found a lot Maps supplier with his own Tile Server Systems. But [Tegola](http://tegola.io/) was the first one Tile Server I found completely independent. As well as, work with PostGIS and server Vector Tiles. So, I decided test it.

# Installation
Tegola offer a complete tutorial about how install your own Tegola VTS. http://tegola.io/documentation/getting-started/

I create a Virtual Machine in my computer and installed the binary code and the PostGreSQL data base. Then, I import the example data base that Tegola provide.
## Configuration file
The configuration file is written in TOML format. http://tegola.io/documentation/configuration/

Here we set information like:
* Web Server Information
* Data Base provider
* Layers: We define the different layer and how get the information of our data base

We could set more options, but for testing is enough.

## DataBase
I download the example data base that Tegola offer in the tutorial web site. It contain data about a [German village, Bonn](https://s3-us-west-2.amazonaws.com/tegola/bonn_osm.sql.tgz).
Then, I create a new database named *bonn*, and use a restore command to import the unzipped sql file into the database.

# Run Vector Tile Server
After we create the configuration file, we are ready to execute our server.
Navigate to the Tegola directory in your computer’s terminal and run this command:
```
./tegola serve --config=config.toml
```

# Examples Files
At the beginning I execute the html example that we can find in Tegola's website to check if the server works or not. **((Mencionar el primer test file))**
After that, I tried to integrate the Vector Tiles with a map.
## MapBox Map
Mapbox (MP) is a large provider of custom online maps for websites and applications. And Tegola VTS is compatible with MapBox Maps.
To integrate the MP maps with our Vector tiles, we only have to create the map and then add layers.

```
  mapboxgl.accessToken = '*****';
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
      "tiles": ["<VTS_address>:<port>/maps/bonn/{z}/{x}/{y}.vector.pbf?"],
      "tolerance": 0
    });
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
```
## Google Maps?
Currently our systems works with google maps api. So, I searched the way to make the Tegola VTS with Google Maps.

I found *[Google Mutant](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant)*. It's a Leaflet GridLayer to represent Maps of Google.
Leaflet is compatible with MapBox and MapBox is compatible with Tegola VTS, how we know. So, I decided tested with our VTS.

**Why is it not implemented in the final version?**
*Google Mutant* isn't a real google map. Actually load pictures of google maps, but not the real google maps.
Also, I didn't found the way to implement our VTS with [Leaflet](https://leafletjs.com/reference-1.3.2.html#canvas). *(HakWeek finished)*


