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

# Run Vector Tile Server
After we create the configuration file, we are ready to execute our server.
Navigate to the Tegola directory in your computer’s terminal and run this command:
```
./tegola serve --config=config.toml
```

