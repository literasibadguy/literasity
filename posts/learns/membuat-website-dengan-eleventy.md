---
title: Cara Membuat Website dengan Eleventy
description: Sejak migrasi ke Eleventy, aku lebih menapresiasi HTML.
date: 2022-06-19
scheduled: 2022-06-19
tags:
  - learns
layout: layouts/post.njk
---

Minggu minggu ini, aku lagi senang membuat website. Sejak ada tool yang masuk ke hati gue, aku ingin perkenalkan Eleventy.

**Eleventy** adalah tool generator untuk membuat static website, terkenal dengan performa-nya yang ringan dan cepat, Google bahkan merekomendasi Eleventy untuk membuat halaman website static-nya. Bahkan blog ini menggunakan Eleventy.

Sebelumnya, kamu udah pernah dengar istilah static website belum? Jadi static website itu isi halamannya persis sama ditulis di HTML-nya, tidak ada pihak seperti database, tidak ada interaksi lebih dinamis antara pengguna dan website-nya. Static website itu seperti website - website profil perusahaan, tulisan blog ataupun marketing landing page, itu contohnya.

Sejak menggunakan Eleventy, aku lebih mengapresiasi pengembangan web dengan cara murni. Tanpa perantara Framework seperti React, Vue.. kebanyakan orang kira, mereka untuk membangun website bagus, larinya ke React dan WordPress, mereka telah mendominasi popularitas pengembangan web. 

Ternyata selama ini asumsi ku salah, seharusnya aku enjoy menulis HTML kembali. HTML ternyata lebih hebat dari apa yang ku sadari sebelumnya.

Posisi Eleventy di sinilah yang bantu kita nanti menyusun HTML lebih efektif.

Jadi untuk membuat website dengan Eleventy, kita akan mulai dari kertas kosong, pastikan kamu sudah terpasang NPM dalam Terminal kamu

## Buat folder proyek pertama Eleventy-nya dan 

```bash
mkdir eleventy-pertama
```

## Masuk ke folder dan pasang package.json kosong dengan:

```bash
 cd eleventy-pertama
 npm init -y 
```

## Kita install Eleventy dalam-nya

```bash
npm install --save-dev @11ty/eleventy
```

## Jalani Eleventy

Coba kita test jalani Eleventy nya dulu dengan npx, mastikan Eleventy-nya sudah terpasang.

```bash
npx @11ty/eleventy
```
Perintah di atas untuk mengubah template yang kita buat nanti menjadi hasil akhir website-nya, karena belum ada, jadi masih kosongan

Sekarang, coba kita bikin halaman pertama website-nya dengan menulis bahasa template-nya, Eleventy mendukung format file seperti Markdown, HTML, Liquid, Nunjucks.. file file ini memang diperuntukkan untuk menulis template website yang mudah berkawan dengan Javascript, 

Ujung cerita-nya akan berubah jadi HTML.

Selanjutnya, tulis di terminal..

```bash
echo '<!doctype html><html><head><title>Halo Eleventy</title></head><body><p>Hari ini bersama Eleventy</p></body></html>' > index.html
```

Terus tulis lagi, kali ini dengan format Markdown

```bash
echo '# aku cinta kamu' > README.md
```

Setelah membuat template-nya, satu versi HTML dan satu versi Markdown. Mari kita jalani lagi Eleventy-nya

```bash
npx @11ty/eleventy --serve
```

Kalo kamu melihat catatan di situ ada tulisan 'Writing _site/README/index.html from ./README.md' dan akhirnya ada 'Processed 2 files'. Di sini kita mengubah template yang kita tulis di folder proyeknya tadi menjadi hasil website akhir-nya, dikumpulkan di folder `_site`

Koq di perintah terminalnya ada --serve, nah di sini kita jalani lokal server untuk aktifkan website-nya.

Ayo kita coba buka `http://localhost:8080` di browser kamu.

Kalo kelihatan tulisan yang kamu tulis tadi di dalam HTML. Tada, akhirnya website Eleventy pertama kamu sudah jalan ya lol.

Sekarang, kreasi kamu sendiri dengan menambah HTML yang biasanya kamu pelajari

Untuk lebih dalam lagi, kamu bisa buka [website-nya Eleventy](https://11ty.dev)

*Selanjutnya Insya Allah aku akan tulis tutorial Eleventy dan membuat website lebih asik lebih dalam, semoga ini bermanfaat bagi yang membaca*

*Jika ada kekurangan, mohon maaf ketidaksempurnaannya*
