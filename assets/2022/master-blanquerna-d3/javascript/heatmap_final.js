// pintamos la leyenda (no nos centremos en esto)
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

// esta es una función
// acepta un argumento, el selector donde vamos a pintar el gráfico
const heatmap = (selector) => {
  // aquí pasamos el argumento del selector a d3
  const container = d3.select(selector);

  // formato de los números
  const format = d3.format('.2f');

  // creamos el tooltip
  const tooltip = container.append('div')
    .attr('class', 'tooltip');

  // traducción de los continentes
  const continents = {
    'Europe': 'Europa',
    'North America': 'América <tspan x="-9" dy="16">del Norte</tspan>',
    'Latin America and Caribbean': 'América Latina <tspan x="-9" dy="16">y Caribe</tspan>',
    'Asia': 'Asia',
    'Africa': 'África',
    'Oceania': 'Oceanía',
  }

  // orden en el queremos pintar los continentes 
  const order = Object.keys(continents).reverse();

  // medidas
  const margin = { top: 20, right: 12, bottom: 10, left: 100 };
  const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // crear escala x (les pasamos los límites más tarde)
  const x = d3.scaleUtc()
    .range([0, width]);

  // crear escala y
  const y = d3.scaleBand()
    .range([height, 0]);

  // escala de colores
  const z = d3.scaleSequential(d3.interpolateOrRd);

  // crear SVG
  const svg = container
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // crear los ticks de la escala x
  const xAxis = d3.axisTop(x)
    .ticks(5)
    .tickFormat(d => {
      // queremos mostrar el año completo en enero de cada año
      // para que se note que cambiamos de año
      if (d.getMonth() === 0) return d3.utcFormat('%b %Y')(d);
      // en otros meses solo mostramos el mes abreviado
      return d3.utcFormat('%b')(d);
    })
    .tickSize(5)
    .tickSizeOuter(null);

  // eje y
  const yAxis = d3.axisLeft(y)
    .ticks(3)
    .tickSizeOuter(null);

  const tooltipWidth = 250;

  // esto se ejecuta cada vez que pasemos el ratón
  const mousemoved = (e, d) => {
    const [mx, my] = d3.pointer(e);

    // pintar tooltip
    tooltip 
      .style('opacity', 1)
      .style('width', `${tooltipWidth}px`)
      .style('left', `${mx - 25}px`)
      .style('top', `${my - 120}px`)
      .html(`
        <div class="place">${continents[d.location]}</div>
        <div class="date">${d3.utcFormat('%e %b')(d.date)} - ${d3.utcFormat('%e %b %Y')(d3.utcDay.offset(d.date, 7))}</div>
        <div class="table">
          <div class="name">Muertes estimadas por 100,000 hab.</div>
          <div class="value">${format(d.estimate)}</div>
        </div>
      `)

    // esto pinta el borde del cuadrado sobre el que estemos pasando el ratón
    svg.select('.hover')
      .attr('opacity', 1)
      .attr('width', x(d3.utcDay.offset(d.date, 7)) - x(d.date))
      .attr('x', x(d.date))
      .attr('y', y(d.location));
  }

  // ocultamos todo cuando el ratón deje el cuadrado
  const mouseleft = (e) => {
    tooltip
      .style('opacity', 0);

    svg.select('.hover')
      .attr('opacity', 0);
  }

  const ready = (data) => {
    // formato en español
    d3.timeFormatDefaultLocale(es_ES);
    
    // pasar los límites de las escalas
    x.domain(d3.extent(data, d => d.date));
    y.domain(order);
    z.domain(d3.extent(data, d => d.estimate));

    // pintar leyenda
    legend('.legend', z);
    
    // pintar eje x
    svg.append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    // pintar eje y
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // y ahora lo traducimos
    svg.select('.y.axis')
      .selectAll('text')
      .html(d => continents[d]);

    // pintar cuadrados
    svg.append('g')
      .attr('class', 'squares')
      .selectAll('rect')
      .data(data)
      .join('rect')
      // el ancho tiene que ser el  por eso hacemos
      // (fecha actual + 7 días) - fecha actual
      .attr('width', d => x(d3.utcDay.offset(d.date, 7)) - x(d.date))
      // la altura nos la da la escala
      .attr('height', y.bandwidth())
      // fecha
      .attr('x', d => x(d.date))
      // continente (con la escala)
      .attr('y', d => y(d.location))
      // color
      .attr('fill', d => z(d.estimate))
      // pasar las funciones del tooltip
      .on('mousemove', mousemoved)
      .on('mouseleave', mouseleft);

    svg.append('rect')
      .attr('class', 'hover')
      .attr('pointer-events', 'none')
      .attr('opacity', 0)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('height', y.bandwidth());
  }

  // cargamos los datos
  d3.csv('/assets/2022/master-blanquerna-d3/data/regions_line_chart_per_100k.csv', d3.autoType)
    // ejecutamos la función que carga el gráfico
    .then(ready)
    // esto se ejecuta y registra un error si hay algún error
    // (no se encuentra el csv por ejemplo)
    .catch(e => { throw(e) })
}
