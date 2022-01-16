// estos son nuestros datos
const dots = [1, 2, 5, 8.123];

// aquí pasamos las medidas del gráfico
const width = 600;
const height = 80;

// esto es una escala lineal
// lo que hace es convertir medidas desde un límite hasta otro
// p.ej. una escala lineal con un dominio de 0 a 10
// con un rango de 0 a 600px
// convierte un 5 a 300px
// y se usa así => x(5) // 300
const x = d3.scaleLinear()
	.domain([0, 10])
	.range([0, width]);

// imprimamos en la consola
console.log(x(5))

// ahora seleccionemos nuestro contenedor para los círculos
const svg = d3.select('.dots')
	// añadamos el svg
	.append('svg')
	// y pasemos nuestras medidas
	.attr('width', width)
	.attr('height', height);

// esta es la "magia" de d3, se llama el 'data join'
// lo que hacemos es unir nuestros datos a una representación
// en la página web.
// una vez lo hemos unido podemos modificar elementos de nuestra página
// basándonos en los datos
svg
	// seleccionamos los elemtnos que queremos crear (esto es un poco raro pero sigue)
	.selectAll('circle')
	// pasamos los datos
	.data(dots)
	// ahora los creamos!
	.join('circle')
	// ahora modificamos la posición en el eje x basado en nuestros datos
	.attr('cx', d => x(d))
	/// queremos que estén centrados en la página
	.attr('cy', height / 2)
	// y ahora modificamos el radio
	.attr('r', d => Math.sqrt(d) * 10);