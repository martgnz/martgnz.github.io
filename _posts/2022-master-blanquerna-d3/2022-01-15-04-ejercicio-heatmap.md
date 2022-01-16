---
title: Ejercicio heatmap
categories: [master-blanquerna-d3]
layout: master-blanquerna-d3
---

Ahora vamos a hacer un heatmap como el que está en la home. Abramos
`ejercicio_heatmap.js`. en el editor de código, `heatmap.css` y `heatmap.html`.

¡Si nos da tiempo podremos añadir un tooltip!

<p class="spoiler">Podemos ver el heatmap completo en <a href="https://github.com/martgnz/martgnz.github.io/tree/master/assets">esta dirección</a>.</p>

<nav>
  <a class="previous" href="03-ejercicio-barras.html">&laquo; Ejercicio barras</a>
  <a class="next" href="05-recursos.html">Recursos &raquo;</a>
</nav>

<style>
.spoiler {
  cursor: pointer;
  background: #fff;
  filter: blur(4px);
  transition: 0.2s all;
}
</style>
<script type="javascript" src="/assets/2022/master-blanquerna-d3/javascript/d3.v7.min.js"></script>
<script>
d3.select('.spoiler')
  .on('click', function(e) {
    d3.select(this).classed("spoiler", !d3.select(this).classed("spoiler"));
  });
</script>