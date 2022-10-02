---
title: Publish Website Nikahan dengan Cloudflare Workers
description: Sejak migrasi ke Eleventy, aku lebih menapresiasi HTML.
date: 2022-06-19
scheduled: 2022-06-19
draft: true
tags:
  - learns
layout: layouts/post.njk
---

Banyak resep cara membuat website undangan nikahan, untuk resepku menggunakan static site generator dari Eleventy dan deploy ke Cloudflare Workers, sebelumnya aku membuat tutorial kesan pertama dengan Eleventy, konfigurasi easy nya.

Sekarang aku ingin menimplementasikan dengan membuat undangan nikahan, dari desain layoutnya menggunakan template nunjucks, mengenerate data para hadirin undangan dengan modal data JSON dan menjadi link spesial untuk dibagikan kepada tamu.

Pertama kita membuat template nya terlebih dahulu, setelah menkonfigurasikan proyek awal Eleventy.

- Add guests list in json inside `_data` folder
- Configure guest list collections inside `_collections` folder
- Add that config collection into eleventy folder
- Then add permalink into nunjucks template language

Thats quick steps for making wedding website in static site.

# Coming soon

