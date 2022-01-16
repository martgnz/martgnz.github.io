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
const x = d3.scaleLinear()
  // el dominio es el límite de nuestros datos, 
  // en este caso queremos escalar escaños
  // queremos ir convirtiendo desde 0 escaños (¡las barras no se cortan nunca!)
  // a 140, que es un poco más del máximo de 120 del PSOE para que la barra respire
  .domain([0, 140])
  // el rango es a lo que la escala _convierte_, es decir, el resultado final
  // en este caso convertimos escaños a porcentajes
  // es decir, por 0 escaños, 0%
  // y por 130 escaños, 100%
  .range([0, 100])

// Escalas ordinales
// Estas son las mejores amigas de las lineales, y junto a esas, las que más váis a usar
// Nos sirven para mapear datos discretos a variables concretas
const colour = d3.scaleOrdinal()
  .domain(['UP', 'PSOE', 'Otros', 'Cs', 'PP', 'Vox'])
  .range(['#9970ab', '#ef7670', '#a4bdc9', '#feb24c', '#6baed6', '#a6d96a'])

// ¡A pintar!
const bar = container
  // primero seleccionamos todos los "div" que queremos pintar
  .selectAll('div')
  // luego pasamos nuestros datos
  .data(data)
  // y ahora lo unimos con nuestros datos
  .join('div')
  // le damos una clase para estilizarlo luego en css
  .attr('class', 'bar');

// aquí ya estamos pintando en un bucle, una vez por cada partido
// creemos un div por cada uno para pintar el nombre del partido
bar.append('div')
  .attr('class', 'name')
  // "d" hace referencia a cada variable de nuestros datos
  .html(d => d.party);

// ahora pintemos las barras
bar.append('div')
  // le damos una clase para pasar los estilos en el css
  .attr('class', 'seats')
  // ahora pasamos el tamaño de las barras con nuestra escala
  .style('width', d => `${x(d.seats)}%`)
  // las coloreamos según el partido
  .style('background', d => colour(d.party))
  // y pintamos el número de escaños
  .html(d => d.seats);