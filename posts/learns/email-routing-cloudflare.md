---
title: Kecil Tapi Manfaatnya Gede Cloudflare Email Routing
description: Ga perlu langganan Google Workspace lagi
date: 2022-12-28
scheduled: 2022-12-28
tags:
  - learns
layout: layouts/post.njk
---

Ini sebenarnya trik rahasia yang ga mau ku share. Ada satu fitur yang ga nyangka bisa ku manfaatkan untuk penggunaan alamat email.

Sebelumnya blog ini belum ada alamat email yang menggunakan domain literasi.blog, sekarang sudah ada dan aku ga perlu bermodal hanya untuk alamat email premium

Kini literasi.blog sudah punya kontak email sendiri, firas@literasi.blog atau kicikku@literasi.blog untuk kebutuhan freelance. Berkat produk [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/)

Bagaimana cara kerja-nya. Dari tagline-nya aja sudah jelas *Create custom email addresses for your domain and route incoming emails to your preferred mailbox* - Bikin alamat email sendiri untuk domain kamu dan arahkan sebagai penerima email untuk pilihan kotak masuk kamu

Setelah mengaktifkan domain sendiri di Cloudflare, kita bisa manfaatkan domain tersebut sebagai domain alamat email kita, jadi aku ga perlu langganan hosting, alamat email domain tersebut bisa diteruskan ke email sehari hari kita, konfigurasi kan saja ke Gmail atau Yahoo, apapun provider email-nya.

<img src="/img/remote/send-email-literasiblog.png" alt="Cloudflare Email Routing">

Langkah awalnya, kita harus verifikasi dulu email asli-nya setelah itu kita update DNS domainnya di MX record dan TXT sesuai arahan Cloudflare, MX untuk menerima email dan TXT meneruskan ke provider email asli-nya.

Misal kita mau buka akun Instagram baru dengan email domain ku sendiri, verifikasi kode-nya bakal diterima di email asli-nya contohnya Gmail ku. Walaupun Gmail-nya sudah dipakai untuk buat akun sebelumnya. 

Ini bagus untuk keamanaan email utama kita, apalagi yang suka coba coba registrasi di website atau aplikasi.

Sayangnya email routing ini, ga bisa digunakan untuk mengirim, sifatnya sebagai penerima saja. Untuk lebih lanjutnya kamu bisa baca di [Dokumentasi-nya Cloudflare](https://developers.cloudflare.com/email-routing)

 Kalau ada pertanyaan silakan kontak emailku ya [firas@literasi.blog](mailto:firas@literasi.blog)


