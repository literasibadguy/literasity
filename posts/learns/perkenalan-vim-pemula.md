---
title: Pengalaman Kenalan Bersama Vim
description: Akhirnya mulai nyaman dengan VIM walaupun masih terbata bata
date: 2023-12-08
scheduled: 2023-12-08
tags:
  - learns
layout: layouts/post.njk
---


## Perkenalan bersama VIM

*Ini tulisan numpang dulu bersama proyek coba coba ku di Python. Karena aku
menulis ini lewat Vim, jadi masih beradaptasi dengan Terminal tanpa mouse.*

Hal yang pertama aku biasakan di VIM, navigasi kata dan menulis
Pertama kamu harus terbiasa dengan memindahkan kursor yang blink blink di teks
dengan huruf `h`,`j`,`k`,`l`

Itu di saat kamu membuka file yang sudah berisi dengan tulisan atau kode-nya.

Untuk memulai Vim, kamu bisa membuka halaman terminal terlebih dahulu dengan
menulis perintah

```
$ vim perkenalan.md
```

*Catatan: Ingat ada dua perbedaan di sini, Vim dan Nvim, Vim itu bawaan
dari komputer kamu, kalau Nvim versi modern-nya, aku rekomendasi kan
kamu pasang Nvim di komputer kamu.*

Misalnya di perintah di atas, dengan extension *markdown*, karena format website
konten aku adalah menggunakan Markdown.

Aku menyuruh `vim` untuk membuat atau membuka file perkenalan.md (jika ada).

Kamu juga bisa langsung `vim` aja.

Pertama kali menjalani Vim Text Editor, aku tidak menyangka, halaman kosong berwarna hitam,
dengan tulisan di tengah tengahnya, `Welcome to Vim`, tidak bisa diklik dengan mouse, tidak bisa langsung menulis apapun.
Ku kira seperti text editor lainnya.

Waktu itu sangat pasif, rasa-nya gak tertarik mempelajari-nya. Aku ingin lari Editor yang lebih instan.

Aku terkesan video di Youtube [programmer Google yang mengajarkan bahasa Go](https://www.youtube.com/watch?v=1rZ-JorHJEY&list=WL&index=30), seperti berdansa menulis code-nya.
Melompat dari kata ke line ke huruf, sangat cepat. Programmer sesungguhnya begini.

Jadi merasa iri melihatnya, aku memaksakan diri, pokoknya dalam waktu dekat, aku harus bisa menguasai VIM, apapun itu bahasa program-nya. Tak peduli hanya menulis HTML atau CSS. Rekomendasi sekali aku menghapus VSCode dari Mac ku.

Di sinilah petualangan ku dimulai, setelah aku merilis aplikasi baru ku bernama Cometbooks.
Aku beralih langsung ke Vim, meninggalkan Xcode, coba menulis beberapa contoh dari Python
sambil mengasah kembali.

Ternyata Vim punya tiga Mode

Pertama **NORMAL mode**, kedua **INSERT mode**, ketiga **VISUAL mode**

Saat kita membuka Vim, itu langsung dalam keadaan Normal Mode,
kamu tidak bisa menulis sesuatu di halaman di situ,
karena *dari sono-nya* Vim langsung ke mode NORMAL untuk meng-edit dokumen.

Untuk memulai menulis dokumen kita harus berpindah ke INSERT mode,
dengan menekan huruf `i, nanti muncul tulisan `-- INSERT --` di ujung bawah, baru bisa menulis dokumen-nya

Setelah menulis, kamu butuh revisi dan meng-editnya, kamu bisa ke berpindah ke mode VISUAL,
dengan VISUAL, kamu bisa memblok tulisan, menggantinya, menghapusnya, bahkan copy paste-nya.

Tapi kembali ke mode NORMAL lagi, untuk berpindah ke halaman paling atas atau paling bawah

## NAVIGASI DALAM VIM

Di awal aku menjelaskan untuk menggerakkan kursor Vim kamu dengan `h`,`j`,`k`,`l`, masih banyak perintah yang bisa kamu coba

Mungkin kamu bisa berpindah dari *kata per kata* dengan menekan `b` dan `w`

Terus untuk menghapus kata, kamu bisa menekan `dw` dengan memposisikan cursor di huruf pertama.

Untuk membalikkan kembali alias Undo, kamu bisa coba menekan `uu`

Kamu bisa melompat ke setiap setengah halaman dengan menekan tombol `<CTRL>` + `d` untuk ke bawah, `<CTRL>` + `u` untuk ke atas.

Kamu bisa melompat ke ujung kalimat terakhir di baris-nya, dengan menekan `$`. Untuk sebaliknya dengan angka `0`.

Melompat ke baris berikutnya, kamu bisa menekan `Shift-0`

## MENULIS DALAM VIM

Kalau kamu melihat halaman kosong pertama di VIM, kamu pasti melihat tanda cursor persegi berwarna putih paling atas,
sekarang coba tekan salah satu antara tombol `i` atau `a`, nanti berubah menjadi garis putih menulis dan dibawahnya muncul tulisan "INSERT"

Kesan nya apa, koq bisa suasana-nya beda antara "INSERT" dengan "NORMAL"

Perbedaan antara menekan `i` dan `a` kelihatan beda. Kalau kamu menekan tombol `a`, posisi memulai menulis-nya maju satu langkah dari cursor NORMAL mode.

Kalau kamu menekan tombol `i`. Posisi memulai menulis-nya dari belakang cursor.

Yang jenius-nya di sini, saat tangan kita berada di atas keyboard, huruf `a` selalu jadi reflek menekan pertama. Seperti langkah memulai.

Ada lagi kalau kamu coba memulai INSERT dengan menekan huruf `A` besar. Itu memulai ujung kalimat terakhir di baris-nya.

Bagaimana dengan huruf `I` besar. Kalau posisi cursor NORMAL kamu berada di tengah, nanti cursor INSERT nya memulai menulis di ujung kalimat pertama di barisnya.

Di mode "INSERT", kamu akhirnya bisa menulis sebebas kamu, keyboard di cursor kamu sepenuhnya hanya berfungsi untuk menulis seperti di Microsoft Word.

Sekarang kembali ke NORMAL MODE dengan menekan `Esc` atau `Ctrl+c`. Keyboard kamu kembali hanya berfungsi untuk menerima perintah dengan VIM.

## REVISI DALAM VIM

Untuk menghapus, mengganti kata huruf di halaman Vim, kita gampangnya masuk ke mode **VISUAL**
Jika menggerakkan cursor dalam mode **VISUAL**, itu memblok kata kata sesuai pergerakan cursor kita.

Setelah memblok beberapa garis tulisan, kamu bisa langsung mengubahnya dengan menekan tombol `c` atau, men-copy nya dengan tombol `y` dan men-paste nya dengan `p`

Untuk keluar dari **VISUAL**, kamu bisa menekan `Esc` atau `CTRL-c`

Untuk mengembalikan editan terakhir, kamu bisa UNDO dengan menekan `u`

Untuk maju kembali lagi ke editan terakhir, kamu bisa REDO dengan `Ctrl-r`

## PERINTAH KERJA DALAM VIM

Pengenalan terakhir, sekarang kamu sudah bisa menulis, menghapus, meng-edit, menggerakkan cursor-nya. Sekarang aku ingin menyimpannya

Kita bisa memulai dengan menekan tombol `:` dalam keadaan NORMAL mode, nanti cursor petaknya pindah ke bawah ujung kiri. Ini awal untuk meng-input perintah di VIM

Karena aku ingin menyimpan file tersebut berarti tulis `:w`, *w* berarti *write* (menyimpan file)

Kalau vim-nya belum tahu apa nama file-nya, kamu bisa menulis `:w perkenalan.md`, ingat extension file-nya harus ada. Biar vim-nya tahu ini tipe file apa.

Keluar dari VIM, ini yang dulu menjebak ku, "Ini bagaimana cara keluarnya", hebatnya kalau kita biasa keluar program dari Terminal dengan menekan `Ctrl x-c`
VIM nya justru kasih nasehat "eits eits eits... kalau mau keluar dari VIM tekan ini neng" tekan `:qa`, keluar dari VIM sekalian menyimpannya

Kalau hanya keluar saja tulis `:q` aja, nanti diingatkan dulu, "itu yang berubah belum disimpan, mending disimpan dulu"
kalau kamu tetap memaksa ingin keluar tulis `:q!`

Ini baru wajib tahu perintah perintah untuk memulai dan mengakhiri dokumen kode kamu, untuk belajar perintah lainnya

kamu bisa menulis `:help`, di situ kitab VIM nya tertulis, sayangnya tertulis bahasa Inggris, tapi gak apa apa

kamu bisa coba coba dengan perintah lainnya

Kalau kamu ingin penjelasan dari suatu perintah, kamu bisa menulis `:help :qa`, nanti kitab VIM nya mengarahkan ke halaman spesifik yang menjelaskan apa fungsi dari `:qa`

## KENAPA MEMILIH VIM

Belajar Vim seperti mengendarai mobil manual, motorik halus kamu dilatih, sampai lihai kamu akan terbiasa. Tidak seperti Editor lainnya, Vim sebenarnya alat kerja tersembunyi yang tidak pernah diketahui kebanyakan Developer, karena faktor tidak modern, karena kiblat IT-nya mungkin beda, kalah dengan Tool Editor yang banyak fitur fungsional.

Mungkin pengguna VIM berkata itu Paradox, justru Programmer ketajaman skill berpikir dan mensolving problem-nya sudah semakin menurun. Karena di awal kita udah dimanja.

Sebenarnya saat inii kita lebih meremehkan Tool-nya. Standar Engineer Google, Facebook, OpenAI itu termasuk essential menggunakan VIM. Bahkan secara psikologis, VIM bisa membantu lebih fokus dalam menulis coding, mempermudah belajar bahasa pemograman baru, bahkan faktor mengurangi stress bisa.

Walaupun sekarang aku belum terbiasa menggunakan VIM, menggunakan VIM perumpamaan-nya juga, kamu di luar angkasa dengan hanya sebatas komputer Terminal tanpa Mouse, kamu harus tahu penguasaan *Introduction Manual-nya*.
VIM juga termasuk permainan menurutku, kalau aku belum bisa eksekusi satu program, berarti aku belum bisa ke level selanjutnya.

Yang aku heran pengguna lama Vim rata rata bisa meninggalkan Mouse, memang selama menggunakan Vim kita benar benar tidak tergantung dengan Mouse, bahkan di-konfigurasi nya rekomended matikan interaksi mouse, terus selama menggunakan VIM, jauhkan jari mu dari tombol Arrow, awalnya memang susah.

Ingat gerakan dasar-nya ada di `h`, `j`, `k`, `l`, bukan tombol Arrow *arah. Awal awal pasti gak sadar.

Tool misteri seperti VIM, banyak yang bisa ku telusuri, apalagi cara proses kita kerja, pindah ke halaman lain.

Semoga ini bisa bermanfaat, aku berharap kita bisa bertemu lagi dalam pengalaman selanjutnya bersama VIM.

