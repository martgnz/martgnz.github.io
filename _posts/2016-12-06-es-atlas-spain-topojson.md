---
layout: post
title: "Spanish maps, D3 ready"
date: 2016-12-06
permalink: es-atlas-spain-topojson
categories: draft
image: /images/posts/choropleth/map.png
---
One of the biggest pain points while making maps is obtaining the underlying data. Normally this involves outdated government websites and a long, obscure transformation process from Shapefiles to [TopoJSON](https://github.com/topojson/topojson).

To make this easier for everyone who needs to make maps of Spain I spent the last week working on [es-atlas](https://github.com/martgnz/es-atlas), a project heavily based in Mike Bostocks' [world-atlas](https://github.com/topojson/world-atlas) and [us-atlas](https://github.com/topojson/us-atlas).

It's a bash script that downloads and transforms the geometry of the country's administrative boundaries: municipalities, provinces and autonomous regions. In the end you get a ready to use TopoJSON with the right IDs from the [National Statistics Institute](http://www.ine.es/en/welcome.shtml).

<a href="https://github.com/martgnz/es-atlas"><img class="img-responsive b-lazy m-t-2"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://cloud.githubusercontent.com/assets/1236790/20868824/69a60934-ba65-11e6-8591-ddcc1e93b157.png" /></a>

The boundaries are merged consistently, as I generate the provinces joining the municipalities and the autonomous regions joining the provinces. That means that you get for free the upper administrative divisions with the same filesize.

This plays well with Roger Veciana's [Conic Conformal projection](https://github.com/rveciana/d3-composite-projections) for Spain, which moves the Canary Islands closer to the mainland.

#### Get the TopoJSONs
[Download the repo](https://github.com/martgnz/es-atlas) or clone it, and run `npm install` inside. Be patient, it has to download a 100mb Shapefile from the Spanish [National Geographic Institute](http://centrodedescargas.cnig.es/CentroDescargas/equipamiento.do?method=mostrarEquipamiento).

After that long download the script will generate two files, one with all the municipalities and one with the provinces.

Remember that this is only a starting point. The script provides decent defaults but depending on your needs you should adapt the code. For example, to make it less simplified or to maintain the polygon properties (city and regions names).

The script is written using the latest TopoJSON, which is a bit confusing. To understand how it works you can read [this tutorial](https://medium.com/@aendrew/creating-topojson-using-d3-v4-10838d1a9538#.41v8a1j94), written by [Ændrew Rininsland](https://twitter.com/aendrew).

---

Bonus: I am also maintaining two URLs with the files:

```shell
https://martingonzalez.net/es-municipalities.v1.json
https://martingonzalez.net/es-provinces.v1.json
``` 
