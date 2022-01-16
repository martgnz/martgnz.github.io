---
title: Ejercicio barras
categories: [master-blanquerna-d3]
layout: master-blanquerna-d3
---

Ahora, vamos a hacer un gráfico de verdad:

<div class="bars"></div>

<script type="text/javascript">
!function bars() {
	// bars

	// Selectores
	// Esto lo vamos a usar contínuamente. Tenemos que seleccionar un elemento de la página
	// Estamos usando clases, '.mi-clase', pero también podemos usar id's '#mi-id'
	// Hay más selectores, pero estos son los principales
	const container = d3.select('.bars');

	// Nuestros datos
	// Esto es un array con objetos, es lo que se suele usar con D3
	// Array [1, 2, 3]
	// Objecto {partido: 'PP'}
	const data = [
		{
	    party: 'PSOE',
	    seats: 120
	  },
	  {
	    party: 'UP',
	    seats: 34
	  },
	  {
	    party: 'Cs',
	    seats: 9
	  },
	  {
	    party: 'PP',
	    seats: 88
	  },
	  {
	    party: 'Vox',
	    seats: 52
	  },
		{
	    party: 'Otros',
	    seats: 46
	  },
	];

	// Esto es lo que MÁS vamos a usar, y lo que más usaréis cuando escribáis 
	// JavaScript por vuestra cuenta
	// console.log(data);

	// Escalas

	// Escalas lineales
	// El concepto de escalas ya os lo han explicado, pero vamos a repasarlo
	// Tenemos unas variables que tenemos que trasladar a la pantalla
	// En programación web usamos los píxeles
	// 
	const x = d3.scaleLinear()
		.range([0, 100])
		.domain([0, 130]);

	// Escalas ordinales
	// Estas son las mejores amigas de las lineales, y junto a esas, las que más váis a usar
	// Nos sirven para mapear datos discretos a variables concretas

	const colour = d3.scaleOrdinal()
		.range(['#9970ab', '#ef7670', '#a4bdc9', '#feb24c', '#6baed6', '#a6d96a'])
		.domain(['UP', 'PSOE', 'Otros', 'Cs', 'PP', 'Vox'])

	// ¡A pintar!
	const bar = container
	  .selectAll('div')
	  .data(data)
	  .enter()
	  .append('div')
		.attr('class', 'bar');

	bar.append('div')
		.attr('class', 'name')
		.html(d => d.party);

	bar.append('div')
		.attr('class', 'seats')
		.style('width', d => `${x(d.seats)}%`)
		.style('background', d => colour(d.party))
		.html(d => d.seats);
}();
</script>

Vamos a abrir `ejercicio_barras.js`, `barras.html` y `barras.css` en nuestro editor de código.

Para gráficos interactivos el estándar es una tecnología que se llama SVG. Aunque a veces
es más sencillo usar elementos HTML, como `<div>` (muchas veces en bar charts como éste). La
lógica es la misma. Seleccionamos el contenedor, ajustamos las escalas y
pintamos nuestros datos.

<nav>
  <a class="previous" href="02-ejercicio-puntos.html">&laquo; Ejercicio puntos</a>
  <a class="next" href="04-ejercicio-heatmap.html">Ejercicio heatmap &raquo;</a>
</nav>