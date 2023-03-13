---
title: literasibadguy lagi belajar
excludeFromSidebar: true
eleventyExcludeFromCollections: true
layout: "layouts/home.njk"
permalink: "/learns/"
override:tags:
---

<div id="posts">
  <h3>Pelajaran hari ini</h3>
  <ul>
{%- for post in collections.learns | reverse %}
  <li>
    <a href="{{ post.url | url }}">{% if post.data.title %}{{ post.data.title }}{% else %}<code>{{ post.url }}</code>{% endif %}</a>
    <time  datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
  </li>
{%- endfor %}
</ul>
</div>