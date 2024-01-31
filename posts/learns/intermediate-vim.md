---
title: Memperdalam Vim dengan Motion-nya
description: Pengalaman kedua bersama Vim
date: 2024-01-31
scheduled: 2024-01-31
layout: layouts/post.njk
---

Tulisan tutorial sebelumnya kita untuk perkenalan Vim, apa fungsi Vim Text Editor, kenapa aku merekomendasi menggunakan Vim, dan basic introducing Setup-nya, serta basic movement-nya.

Sekarang mungkin aku ingin menulis pengalaman ku, memperdalam teks editor yang begiu banyak rahasia trik, bisa dua tiga kali lebih efisien. Mungkin tutorial ini bisa lebih memperdalam motion Vim kita, seolah olah tangan kiri dan kanan kita sudah berirama seperti pemain Piano.

Sebelumnya `hjkl` dan melompat lompat seperti kata kata, `b` atau `w` untuk melompat dari kata ke kata di awal. Atau melompat kata kata di akhirnya dengan `e` dan `E`. Berasa main game sebenarnya menggunakan Vim.

## Motions

Ini aku ambil dari [Barbarian Meets Coding](https://www.barbarianmeetscoding.com/), tutorial-nya sangat efektif untuk meringkas fungsi Motion yang bakal kita pakai.

Kalau biasa-nya kita mindahkan cursor dari atas ke bawah, bagaimana kita coba cursornya bergerak lebih cepat menyesuaikan isi dokumen-nya, pokoknya dia melompat celah celah yang barisan kosong.

1. `}` melompat setiap paragraf ke arah bawah
2. `{` melompat setiap paragraf ke arah atas.
3. `CTRL-D` melompat setengah halaman ke bawah
4. `CTRL-U` melompat setengah halaman ke atas

Aku buat [video demonstrasi-nya](https://www.youtube.com/watch?v=-o3uviqtnyU), hanya untuk keempat trik di atas.

Sekarang kita berpindah cursor menggunakan *search*

Ini salah satu command yang sering ku gunakan, apalagi sebelum aku pelajari trik trik yang di atas, ini paling senang, apalagi kalau mau melompat yang dokumen-nya sudah terlanjur ramai, tinggal tulis kata-nya apa dengan memulai

* Mulai dengan menekan '/' untuk mencari di dalam file tersebut, terus kamu tulis apa yang kamu cari
* kalo mulai menekan dengan `?' sama saja, tapi nanti cari-nya dari akhir ke awal.

Nih Vim sudah menandai apa yang kamu cari, kalau Vim-ku ditandai dengan warna kuning, untuk Cursor mu berpindah pindah dari posisi setiap pencarian, kamu bisa menekan huruf `n`, setelah cursor kamu sudah di posisi yang kamu cari, terus kamu pengen ke hasil pencarian selanjutnya yang sama, kamu bisa menekan huruf `n` lagi.

Selanjutnya, berpindah ke huruf atau karakter di dalam satu barisan

Kamu bisa memulai menekan dengan `f` atau **find** (mencari) setelah itu coba tulis inisial huruf yang ingin kamu posisikan cursor-nya, nanti beliau langsung melompat ke kanan. Sesudah cursor mu sudah berpindah ke inisial yang sama, kamu ingin berpindah ke inisial selanjutnya. Misal-nya kamu berulang ulang nekan `fi` untuk melompat ke setiap huruf `i`, ternyata kamu bisa menekan `;` untuk mengulang insial sebelumnya.

Jadi Vim paling canggih mengingat perintah terakhir kamu, biar kamu gak perlu ekstra mengkombinasi dua kali.

Sudah cukup terkesan di motion command di atas, dengan mengandalkan pencarian huruf dan ejaan code kamu.

Bagaimana kalau kita menggandakan pergerakan cursor kita, dengan menginput angka pertama. Yang tadi-nya tekan `j` hanya turun sekali, kamu bisa menekan `2j` untuk bergerak turun ke bawah dua kali. Inii bisa berlaku dikombinasikan dengan dasar pergerakan . `{angka}{perintah}`

Beberapa yang bisa kamu coba:

* `3b` untuk melompat tiga kata mundur (backward)
* `5k` bergerak ke atas 5 kali dari tempat asal cursor
* `3;` melewatkan tiga lompatan inisial dari pencarian kamu sebelumnya
* `2/winter` kalau ada tiga kata *winter* di dalam dokumen kamu, cursor kamu akan pindah kata *winter* ke dua

Dan beberapa penghujung perintah motion yang kamu selipkan, dalam sekali tekan

Double `gg` akan membawa cursor ke penghujung atas halaman dokumen

Kapital 'G' akan membawa cursor ke penghujung bawah

Kamu bisa kustom ke barisan mana `{barisan}gg` untuk melompat sesuai nomor barisan. *Mungkin kamu harus mengaktifkan menampilkan indikator angka baris di Vim`

Terus ada salah satu trik yang bagus, kalau menekan `%`, nanti cursor coba cari kalimat yang dimulai dengan buka kurung atau tutup kurung

## Block insert

Salah satu teknik yang mesti kamu tahu untuk menambah teks dalam beberapa garis di waktu yang sama. Ini gak masuk kategori *motion*, tapi masuk *editing* sebenarnya. Tapi gak apa apa bakal terkesan kamu setelah mencoba-nya. *small moment brings extraordinary things*

Pertama kamu harus ke Visual Block dengan menekan `Ctrl-v`. Tekan `I` atau `A` dan memulai teks. Kalo sudah selsai coba tekan `Esc`, keluar dari INSERT mode

Otomatis teks yang di-block, langsung nambah juga ikut ikut-an. Atau setelah kamu block berapa baris ni cerita-nya, abis itu kamu mau nambah teks serentak di penghujung teks, Kamu bisa kombinasikan ini `<Ctrl-v>3j$Ayou're still love me<esc>`

Kamu bisa pelajari lagi lebih dalam dengan `:help blockwise-examples`

## Buffers

Buffers ini manajemen halaman dokumen Vim kamu, kamu bisa coba langsung tulis di bawah `:buffers`, aku dulunya berpikir gak efisien kayaknya menulis terus mengedit code, tapi aku gak bisa pindah ke file lain, jadi ini buffer, panggilan *Tab* dokumen untuk Vim

Jadi misalnya aku sudah membuka beberapa file di Vim, pindah file ke satu sama lain tanpa keluar dari Vim, itu masuknya ke daftar `:buffers`, jadi kamu bisa pindah halaman file selanjutnya atau sebelumnya dengan menulis `:bn` atau `:bp`

Tapi bagaimana masuk ke file-nya tanpa keluar Vim, iya kalau kamu hafal file-nya, kamu mungkin bisa tulis `:edit nama-dokumen` Magic-nya di sini, kamu gak perlu bolak balik buka tutup denga Vim, kalo kamu bisa buka File Manajer -nya dengan perintah `:edit .`, nama-nya *Netrw Directory Listing*, di situ kamu bisa pilih dan masuk ke file lain, bahkan menghapus, membuat folder, membuat file baru juga bisa.

Waktu kamu masuk ke daftar file kamu, untuk membuat folder kamu bisa menekan `d` (directory), langsung saja tulis nama folder-nya apa.

Kalau mau bikin file baru, kamu bisa tekan '%', ingat diakhirnya jangan lupa selipkan format extension file-nya, kalau markdown contohnya ya *.md* kalau python tambah ujung-nya *.py*, nanti Vim-nya baca file *default*

Kamu juga bisa pindahkan file dari folder A ke folder B. Ini agak tricky, tapi aku akan mungkin buat memo khusus.

----

Ini sekilas pendalaman motion perintah perintah Vim yang bisa ku share di tulisan ini untuk melanjutkan kelas kita setelah dasar-nya, di titik tengah tengah, cukup sudah mempermatang kebiasaan tangan kita.

Mungkin di tulisan Vim selanjutnya, bukan bermaksud untuk ke masuk ke tahap tingkat tinggi. Karena Vim ini pemaparan-nya termasuk luas, jadi kita bisa telusuri lagi kombinasi motion, visual dengan perintah perintah lainnya, mempercepat revisi kamu, me-review code kamu.

Mengingat kembali [tulisan perkenalan Vim di sini.](https://literasi.blog/posts/learns/perkenalan-vim-pemula/)

