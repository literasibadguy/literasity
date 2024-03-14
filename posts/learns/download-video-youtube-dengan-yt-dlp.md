---
title: Download Video Youtube dengan Yt-dlp
description: Tidak hanya download video Youtube, bisa download video Twitter, video TikTok juga bisa
date: 2024-03-14
scheduled: 2024-03-14
tags:
  - learns
layout: layouts/post.njk
---

Kalau soal cara download video Youtube, cari di Internet, pasti banyak pilihan aplikasi, tapi itu belum tentu sesuai ekspetasi kita. Ini rekomendasi aku untuk download video Youtube, menggunakan tool bernama Yt-dlp. Ini basis-nya menggunakan command line interface

Kamu bisa langsung download

1. [Yt-dlp untuk pengguna Windows](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe)
2. [Yt-dlp untuk pengguna MacOS](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos)
3. [Yt-dlp untuk pengguna Linux (mungkin butuh syarat Python)](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp)

Kamu bisa melihat catatan alternatif instalasi nya, di [halaman source code Yt-dlp](https://github.com/yt-dlp/yt-dlp)

Setelah selesai memasang Yt-dlp, kamu bisa buka di *Terminal* untuk Pengguna MacOS atau *Command Line* untuk pengguna Windows. *Perlu catatan di sini aku belum mencobanya di Windows, mungkin pengguna Linux sama dengan pengguna Mac*

Pastikan kita cek dulu apakah sudah benar terpasang, dengan menulis `yt-dlp`

```bash
yt-dlp --help
```

Nanti muncul, pilihan argumen perintah untuk menambah opsi download video kita

Setelah itu, coba kita download video Youtube yang kamu pengen download, biar enak, download video yang durasi pendek dulu. Kamu langsung copy paste aja langsung link-nya, seperti di bawah


```bash
yt-dlp https://youtu.be/iw0XzaTo5sw
```

Ytdlp akan membaca data informasi video-nya dan di penghujung memulai download, persentasi dan progress nya bisa diliat di situ, akan tersimpan di folder lokasi kamu meneksekusi `yt-dlp`. Yt-dlp gak hanya mendukung video Youtube biasa, Youtube shorts juga bisa, bahkan satu paket video di playlist juga bisa.

**Untuk letak di mana kamu download**

Untuk menspesifikasi di mana meletakkan file download kamu, menggunakan `--paths` atau `--P`

```bash
yt-dlp -P ./foldervideo https://www.youtube.com/watch\?v\=iw0XzaTo5sw
```

**Untuk download dengan pilihan format**


```bash
yt-dlp -F https://youtu.be/iw0XzaTo5sw
```

Nanti akan menampilkan daftar format seperti di bawah

```bash
233 mp4   audio only        │                   m3u8  │ audio only           unknown             Default
234 mp4   audio only        │                   m3u8  │ audio only           unknown             Default
139 m4a   audio only      2 │    4.70MiB    49k https │ audio only           mp4a.40.5   49k 22k low, m4a_dash
249 webm  audio only      2 │    4.12MiB    43k https │ audio only           opus        43k 48k low, webm_dash
250 webm  audio only      2 │    4.96MiB    52k https │ audio only           opus        52k 48k low, webm_dash
140 m4a   audio only      2 │   12.47MiB   129k https │ audio only           mp4a.40.2  129k 44k medium, m4a_dash
251 webm  audio only      2 │    8.97MiB    93k https │ audio only           opus        93k 48k medium, webm_dash
137 mp4   1920x1080   24    │  387.94MiB  4029k https │ avc1.640028    4029k video only          1080p, mp4_dash
614 mp4   1920x1080   24    │ ~364.36MiB  3694k m3u8  │ vp09.00.40.08  3694k video only
248 webm  1920x1080   24    │  232.17MiB  2411k https │ vp09.00.40.08  2411k video only          1080p, webm_dash
400 mp4   2560x1440   24    │  679.68MiB  7060k https │ av01.0.12M.08  7060k video only          1440p, mp4_dash
620 mp4   2560x1440   24    │ ~949.12MiB  9623k m3u8  │ vp09.00.50.08  9623k video only
```

Jadi misalnya aku pengen download format 1080p, dengan file *webm*, aku akan masukkan parameter nya dengan kode format-nya `271`, jadi jangan terjebak kebanyakan daftar format hanya `video only`, untuk resolusi 1080 ke atas, karena Youtube memang aturan-nya hanya berlaku video only, bukan pengguna Youtube berbayar.

```bash
yt-dlp -f 271 https://youtu.be/iw0XzaTo5sw
```

jadi jangan terjebak kebanyakan daftar format hanya `video only`, untuk resolusi 1080 ke atas, karena Youtube memang aturan-nya hanya berlaku video only, bukan pengguna Youtube berbayar. Bagaimana caranya kita bisa dapetin video resolusi tinggi yang bisa ber-audio, jadi Yt-dlp bisa menggabungkan format audio dengan video alias merging, dengan mengkombinasikan formatnya, jadi di situ ku tulis `137` dari format audio ditambah dengan `140 dari format video, `-f 137+140`

*Catatan untuk merging audio dan video: Kamu harus punya [Ffmpeg](https://ffmpeg.org/download.html) terlebih dahulu*

```bash
yt-dlp -f 137+140 -P ./foldervideo https://www.youtube.com/watch\?v\=iw0XzaTo5sw
```


Jadi untuk merilis daftar format, menggunakan `-F` dan untuk memilih format nya menggunakan `-f`

Kamu gak hanya bisa mendownload video Youtube, video TikTok atau postingan video dari Twitter/X juga bisa, misalnya untuk video yang di dalam postingan Twitter kita bisa masukkan postingan link-nya

```bash
yt-dlp https://twitter.com/historyinmemes/status/1761077711177691369
```

Berlaku juga untuk download video TikTok, cukup meng-copy link TikTok

Kita juga bisa melihat daftar website yang didukung sama Yt-dlp, untuk download konten video-nya dengan menulis

```bash
yt-dlp --list-extractors
```

Kenapa aku sharing bagaimana download video Youtube dengan Yt-dlp, karena kebanyakan orang terjebak dengan aplikasi fiktif downloader apa yang muncul pertama di Internet, kalau misalnya cari di Google di halaman pertama, ujung ujungnya kita kena tipu, bahkan komputer sampai masuk masuk virus, karena terlena dengan "Free Youtuber Downloader", "Converter". Jadi aku kasih referensi bagus untuk Yt-dlp, karena ini tool rekomendasi paling bagus yang gak akan muncul di halaman pertama search engine.




