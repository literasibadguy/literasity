---
title: Catatan Harian Mading
excludeFromSidebar: true
eleventyExcludeFromCollections: true
layout: "layouts/home.njk"
permalink: "/mading/"
override:tags:
---

<div id="posts">
  <h3>Mading</h3>
  <ul>
{%- for post in collections.mading | reverse %}
  <li>
    <a href="{{ post.url | url }}">{% if post.data.title %}{{ post.data.title }}{% else %}<code>{{ post.url }}</code>{% endif %}</a>
    <time  datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
  </li>
{%- endfor %}
</ul>
</div>