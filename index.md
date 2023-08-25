---
title: Martín González Gómez
description: Graphics editor at The New York Times
image: assets/images/maritime-traffic.jpg
layout: home
---

I am a [graphics editor at The New York Times](https://www.nytimes.com/by/martin-gonzalez-gomez). Before that, I was on The Economist Data Team.

<em>Last updated on {% assign d = site.time | date: "%-d" %}  {% assign m = site.time | date: "%B" %} {% case m %}
  {% when 'April' or 'May' or 'June' or 'July' %}{{ m }}
  {% when 'September' %}Sept.
  {% else %}{{ site.time | date: "%b" }}.
{% endcase %}{% case d %}
  {% when '1' or '21' or '31' %}{{ d }}st
  {% when '2' or '22' %}{{ d }}nd
  {% when '3' or '23' %}{{ d }}rd
{% else %}{{ d }}th{% endcase %}, {{ site.time | date: "%Y" }}</em>.