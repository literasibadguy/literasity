---
title: Upload Website Kamu dengan Cloudflare Pages
description: Terima kasih dengan Cloudflare, karena blog ini ga bayar bulanan
date: 2022-12-07
scheduled: 2022-12-07
tags:
  - learns
layout: layouts/post.njk
---

Di tutorial sebelumnya, aku menulis tentang pengenalan bersama Eleventy dan membuat undangan nikah digital lewat Eleventy.

Kali ini aku mau share tutorial dengan server yang telah menyimpan blog ini, Cloudflare Pages.

Jadi kenapa Cloudflare Pages?

Pertama, kalau kamu sudah punya akses penuh di dashboard-nya Cloudflare, kamu bisa berkreasi apapun di Internet dengan seminim-minimnya budget

Blog ini modalnya hanya bayar domain tahunan dan modal komitmen tetap menulis.

Di profil [LinkedIn ku](https://www.linkedin.com/pulse/deploy-your-next-website-cloudflare-pages-firas-rafislam/?trackingId=BLf%2Fsi%2BCQOC0ddagOoBSJg%3D%3D), sebelumnya aku menulis tutorial yang sama dalam bahasa Inggris.

## Penggunaan Cloudflare Pages

Jadi di bagian dashboard-nya Cloudflare, ada fitur Pages, kamu bisa telusuri di sini

<img src="https://media-exp1.licdn.com/dms/image/D5612AQHmbFA-VHMCSA/article-inline_image-shrink_1000_1488/0/1668381075803?e=1675296000&v=beta&t=5W_5jOHAld8AF7AL16KExM8IPcnhlFOBU9BysLLy858" alt="Cloudflare Pages Dashboard" />


Ada tiga pilihan cara upload website kamu dengan Cloudflare Pages, 

1. lewat akun github kamu 
2. Upload manual file HTML kamu 
3. lewat terminal (Wrangler CLI)

Rekemondasi-nya menggunakan Github, jika kamu belum tahu Github sebelumnya, aku rasa pelajari dulu cara kerja Github dan basis Git sebelum melanjutkan pelajaran kita satu ini.

Kalau ga mau ribet, langsung upload folder dengan file file HTML kamu, tapi aku belom coba yang ini.

Untuk cara ketiga, ini untuk pengembang yang biasa nulis command line, jadi skip aja

Kenapa Github? - Jadi saat melakukan revisi atau konten terbaru di website-ku, akan ku upload revisi tersebut di Github dan Cloudflare Pages akan menangkap perubahan tersebut dan me-refresh konten website kita yang terbaru. Termasuk efisien

Sebelum Cloudflare Pages memproses perubahan tersebut, kita harus konfigurasi dulu tool apa yang kita pakai selama pengerjaan website kita, perintah apa untuk merilis output website-nya.

Jika kamu menggunakan Next.js, Vue atau Svelte, kamu bisa kasi tau di config-nya, karena proyek ku menggunakan Eleventy, jadi ku pilih Eleventy di bagian 'Framework Preset'

<img src="https://media-exp1.licdn.com/dms/image/D5612AQF5GWJSePmq_g/article-inline_image-shrink_1500_2232/0/1668381501294?e=1675900800&v=beta&t=jRobp5wHsn5iBu0cS7DVNPIWrJp_AZXBhGdgo5T3roo">

Setelah itu ku coba 'Save and Deploy'

Selama proses deploy, kelihatan proses building-nya selama eksekusi command dari framework preset-nya. Sampai itu berhasil atau ga produksi-nya.

<img src="https://media-exp1.licdn.com/dms/image/D5612AQFSeEn9bL8KEg/article-inline_image-shrink_1000_1488/0/1668382050195?e=1675900800&v=beta&t=dns_Qr6KQIuL_UutrBEeFwb0FREU6E7FWfWK2WSnmU4" alt="Settings Framework Preset" />

Kalau sudah berhasil, bakal kelihatan di riwayat deployment-nya, jadi setiap revisi yang ku lakukan di Github, akan otomatis memproses deploy untuk revisi kita yang terbaru.

{% image "./img/remote/cloudflare-pages-dashboard.png", "Cloudflare Pages Deployment" %}

Kamu bisa lihat preview nya langsung di url website kamu atau kamu bisa cek link preview yang dikasih sama mereka.

## Custom Domain

Karena Cloudflare Pages inisial-nya menggunakan *.pages.dev* domain, jadi biar kelihatan bagus untuk branding domain website kita, mending kita arahkan ke domain kita sendiri, seperti blog ini awal-nya menggunakan url *literasity.pages.dev* sekarang ku arahkan ke domain *literasi.blog*

{% image "./img/remote/custom-domain-cloudflare.png", "Custom Domain Cloudflare" %}

Cukup gampang menambah custom domain untuk website kita, tulis domain yang mau kamu tuju, setelah itu ikuti panduan nya menambah DNS CNAME alias ke registrasi domain kita, nanti Cloudflare Pages akan verifikasi apakah sudah terarahkan.

## Kesimpulan

Kesan selama ku menggunakan Cloudflare Pages, pertama efisien biaya, gak ada notifikasi billing bulanan sama sekali.

Aku ga perlu menstrategis ribet dan keluar modal bulanan hanya untuk website, jadi sangat berkesan untuk ku. Aku bakal menangis kalau kehilangan akses akun Cloudflare.

Ini sudah seperti playground Cloud bagi ku, sejak itu Cloudflare memberiku cara meminimalisir penggunaan Cloud, jauh sekali perbandingannya saat menggunakan AWS, setiap Cloudflare meluncurkan produk baru, aku pengen coba ber-eksperimen, rekomendasi bagus untuk teman teman,, apa yang kita butuhkan rata rata gratis di sini.

Pengembangan di Cloudflare Pages, catatannya kamu mesti beradaptasi dulu dengan pengembangan web sekarang, minimal jika kamu sudah tahu cara kerja output seperti React, Vue, Next.js atau JAMStack lainnya, ini bisa jadi servis web untuk kamu selanjutnya. Kompetitiornya mungkin kamu sudah tahu sebelumnya, seperti Github Pages, Netlify dan Vercel. Fitur dan penggunaan-nya rata-rata sama.

Kalau masih sayang sama WordPress, selamat datang di era web baru.