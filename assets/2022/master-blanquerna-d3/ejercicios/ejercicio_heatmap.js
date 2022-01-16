// pintamos la leyenda
// no nos obsesionemos con esto por ahora
// https://d3-legend.susielu.com/
const legend = (selector, scale) => {
  const svg = d3.select(selector)
    .append('svg')
    .attr('width', 240)
    .attr('height', 30);

  const legend = d3.legendColor()
    .shapeWidth(30)
    .shapeHeight(8)
    .shapePadding(0)
    .labelOffset(5)
    .cells(8)
    .orient('horizontal')
    .scale(scale) 

  svg.call(legend);
}

// traducción de las fechas a español
const es_ES = {
  dateTime: "%A, %e de %B de %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
}

// seleccionamos el contenedor del gráfico
const container = d3.select('.waffle');

// esta función formatea números (p. ej. de 0.485727 a 0.49)
const format = d3.format('.2f');

// creamos el contenedor para el tooltip
const tooltip = container.append('div')
  .attr('class', 'tooltip');

// para traducir el nombre de los continentes que aparecen en los datos
const continents = {
  'Europe': 'Europa',
  'North America': 'América <tspan x="-9" dy="16">del Norte</tspan>',
  'Latin America and Caribbean': 'América Latina <tspan x="-9" dy="16">y Caribe</tspan>',
  'Asia': 'Asia',
  'Africa': 'África',
  'Oceania': 'Oceanía',
}

// esto va a fijar el orden de los continentes en el eje y
const order = Object.keys(continents).reverse();

// sacamos el tamaño del contenedor y establecemos la altura del gráfico
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// escala para el eje x
const x = d3.scaleUtc()
  // .range([_, _]);

// escala para el eje y
const y = d3.scaleBand()
  // .range([_, _]);

// escala de colores secuencial
// https://github.com/d3/d3-scale-chromatic#sequential-single-hue
// https://github.com/d3/d3-scale-chromatic#sequential-multi-hue
// d3.interpolateViridis
// d3.interpolateInferno
// d3.interpolateMagma
// d3.interpolateBuGn
// d3.interpolateBuPu
// d3.interpolateGnBu
const z = d3.scaleSequential(d3.interpolateOrRd);

// aquí creamos el SVG
const svg = container
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// aquí creamos el eje x
const xAxis = d3.axisTop(x)
  .ticks(5)
  .tickFormat(d => {
    // podemos modificar el formato del eje
    return d;
  })
  .tickSize(5)
  .tickSizeOuter(null);

// creamos el eje y
const yAxis = d3.axisLeft(y)
  .ticks(3)
  .tickSizeOuter(null);

// ancho del tooltip
const tooltipWidth = 250;

// esta función se ejecuta cada vez que pasamos el ratón
// sobre una de las celdas
const mousemoved = (e, d) => {
  const [mx, my] = d3.pointer(e);

  tooltip 
    .style('opacity', 1)
    .style('width', `${tooltipWidth}px`)
    // .style('left', )
    // .style('top', )
    // .html(``)

  svg.select('.hover')
    .attr('opacity', 1)
    // .attr('width', )
    // .attr('x', )
    // .attr('y', );
}

// esta función se ejecuta cada vez que el ratón
// sale del gráfico
const mouseleft = () => {
  tooltip
    .style('opacity', 0);

  svg.select('.hover')
    .attr('opacity', 0);
}

// se ejecuta cuando los datos están disponibles
const ready = (data) => {

  // qué datos hay?
  console.log(data);

  // aquí pasamos la traducción a español de los meses
  d3.timeFormatDefaultLocale(es_ES);
  
  // hay que pasar los límites de las escalas
  // x.domain();
  // y.domain();
  // z.domain());

  // y ejecutar la función para que se pinte la leyenda
  legend('.legend', z);
  
  // añadimos los ejes
  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  // añadimos los ejes
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  // pasamos los nombres a español
  svg.select('.y.axis')
    .selectAll('text')
    // .html(d => continents[d]);

  // aquí pintamos los cuadrados
  svg.append('g')
    .attr('class', 'squares');

  // aquí creamos un cuadrado para el hover
  svg.append('rect')
    .attr('class', 'hover')
    .attr('pointer-events', 'none')
    .attr('opacity', 0)
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('stroke', 'black')
    .attr('height', y.bandwidth());
}

// cargamos el csv y ejecutamos la función para pintar el gráfico
d3.csv('datos.csv', d3.autoType)
  .then(ready)
  .catch(e => { throw(e) })
