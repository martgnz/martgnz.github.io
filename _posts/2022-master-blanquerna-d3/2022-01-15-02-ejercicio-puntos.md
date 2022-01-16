---
title: Ejercicio puntos
categories: [master-blanquerna-d3]
layout: master-blanquerna-d3
---

Lo principal que hace D3 es juntar datos con una página web. Si abrís la consola veréis cómo está programada esta web,
bien, con D3 podemos añadir elementos a la página apoyándonos en datos.

---

### The Beatles

<div class="beatles"></div>

<script>
const beatles = ['Ringo', 'Lennon', 'Starr', 'McCartney'];

console.log(beatles);

d3.select('.beatles')
	.selectAll('p')
	.data(beatles)
	.enter()
	.append('p')
	.text(d => d);
</script>

**¡Mira la consola!**

---

### Círculos

Ahora vamos a ver cómo podemos pintar unos círculos. En la carpeta de ejercicios, ejecutemos el servidor y abramos con el editor de código `puntos.html` y `ejercicio_puntos.js`.

<nav>
  <a class="previous" href="01-ejemplos.html">&laquo; Ejemplos</a>
  <a class="next" href="03-ejercicio-barras.html">Ejercicio barras &raquo;</a>
</nav>