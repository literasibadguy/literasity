---
title: Kesan Pertama Mengenal SwiftUI
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-02-04
scheduled: 2023-02-04
draft: true
tags:
  - another-tag
layout: layouts/post.njk
---

Kali ini kita belajar perkenalan mengembangkan app iOS, menggunakan SwiftUI.

SwiftUI paling nyaman untuk yang baru belajar iOS dev

Kamu bisa download XCode terbaru dan New Project, SwiftUI sudah standar baru untuk desain interface proyek baru.

Apple menyebut proses-nya *Declarative Syntax*, kamu tinggal menulis susunan objek desain elemen nya dari atas ke bawah di setiap halaman dan tulis bagaimana penampilannya, warna, font bahkan animasi.

Xcode sangat integrasi penuh dengan SwiftUI, pengembang bisa melihat penampilannya live di Preview, sinkron langsung saat kamu menulis kode SwiftUI-nya.

Jika kamu orientasi visual, kamu bisa drag-and-drop interface apa yang kamu mau, dan mengubah style-nya bantuan Inspector, code nya akan otomatis mengikut.

## Perkenalan SwiftUI

Untuk memulai pengembangan, kita buka XCode, pastikan sudah versi terbaru yang ada di App Store Mac

File -> New Project, dan pilih App

Pastikan interface-nya sudah terpilih SwiftUI dan klik Next

Ga lama, kita disambut dengan proyek SwiftUI pertama kita, berada di halaman file SwiftUI pertama kita ContentView dengan bagian kanan-nya ada halaman Preview

Ingat, Setiap menulis SwiftUI selalu di dalam keluarga `var body: some view {`, kamu ga perlu belajar bahasa Swift dulu deh pokoknya, natural aja di sini.

```swift

import SwiftUI

struct HelloView: View {
    var body: some View {
        Text("Hallo cantik!")
    }
}

struct HelloView_Previews: PreviewProvider {

}

```

Pertama kamu harus mengenal layout-nya dulu, ada tiga komponen yang bakal sering kamu gunakan selama mendesain interface

VStack, HStack dan ZStack

VStack, susunan dalam vertical

HStack, susunan dalam horizontal

ZStack, susunan yang di atas menimpa yang bawah

Kita mulai dari VStack dulu, ini yang paling essential

```swift

struct VerticalView: View {
    var body: some View {
        VStack {
            Text("Halo cantik sana")
            Text("Nama kamu siapa?")
        }
    }
}

```

Berarti ada dua objek di sini, dua Text, di dalam VStack

```swift
struct VerticalView: View {
    var body: some View {
        HStack {
            Text("Hai aku ada di kiri kamu")
            Text("Hai aku ada di kanan kamu")
        }
    }
}

```

HStack, Text yang pertama ada di kiri, Text yang pertama ada di kanan

```swift
struct VerticalView: View {
    var body: some View {
        ZStack {
            Text("Yang merah ada di atas aku").foregroundColor(Color.white).background(.blue).padding(.bottom, 20.0)
            Text("Yang biru ada di bawah aku").foregroundColor(Color.white).background(.blue).padding(.top)
        }
    }
}

```

ZStack mungkin paling bagus untuk kasus meletakkan suatu View yang di atas ScrollView

Secara daftar complete yang ada 

Yang menarik di sini, SwiftUI punya resiko rendah jika melakukan kesalahan, seperti kanvas lukisan, jadi kamu cemplungkan saja semua komponen SwiftUI dan susun dalam satu View, semua tinggal menyesuaikan.

Tapi ada aturan nya di sini, selama semua komponen tersebut dalam satu Layout, walaupun aku kasih komponen di luar layout, SwiftUI kasih halaman baru untuk View tersebut

Beberapa catatan yang ku temukan

* VStack hanya kasih maksimum 8 objek di dalam layoutnya, apapun itu objeknya, namun jika ku beri daftar Teks lebih dari 10 itu tidak masalah




Komponen penting 