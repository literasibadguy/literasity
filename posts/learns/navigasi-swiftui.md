---
title: Belajar Navigasi Halaman SwiftUI
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-03-11
scheduled: 2023-03-11
tags:
  - learns
layout: layouts/post.njk
---

*Halaman ini masih tulisan ecek ecek-an, corat coret aja, men-eksplor sendiri, masih beta, draft*

Di pengenalan sebelumnya, aku menulis tentang perkenalan SwiftUI. Untuk ini aku akan memberikan secara detail mengenai navigasi di SwiftUI, berpindah dari satu halaman ke halaman yang lain

Aku mempelajari SwiftUI punya beberapa tipe halaman navigasi

Menurut ku ini penting, karena navigasi agak tricky di sini. Jadi mengembangkan aplikasi-nya seperti silsilah keluarga sebenarnya

Pertama, induknya dulu, induknya bisa saja menampilkan daftar pesanan yang lagi aku tunggu, atau obrolan chat dengan gebetan aku, itu induk

Kedua, anak induknya, jadi kalau aku ingin masuk ke salah satu obrolan chat gebetan aku, berarti masuk ke salah satu anak dari induk daftar obrolan tersebut

Untuk membuat induk tersebut, aku rekomendasi `NavigationStack` dari SwiftUI, NavigationStack hanya mendukung untuk iOS 16 ke atas, ini pilihan terbaik

```swift

import SwiftUI

struct DaftarGebetanView: View {
  var body: some View {
    NavigationStack {
      List {
        ForEach(gebetans) { gebetan in
            
        }
      }
    }
  }
}

```

Kita sudah membuat induknya dengan `NavigationStack`, sekarang kita membuat anak induknya, anaknya berarti obrolan chat dengan gebetan kamu kan

```swift

import SwiftUI

struct ChatGebetanView: View {
  var body: some View {
    ScrollView {
      Text("Nama Gebetan Kamu")

    }
  }
}

```

Bagaimana kita bisa menampilkan anak induknya dari daftar obrolan yang kita buat tadi, 

```swift

import SwiftUI

struct DaftarGebetanView: View {

  @State private var gebetans: [Gebetan] = []

  var body: some View {
    NavigationStack {
      List(gebetans) { gebetan in
          GebetanItemView(gebetan)
      }.navigationDestination(for: Gebetan.self) { _ in
            ChatGebetanView()
        }
    }
  }
}

```

Kita selipkan `navigationDestination` setelah `List`, jadi data gebetan nya sudah diteruskan ke halaman obrolan kita `ChatGebetanView`

Sekarang, aku punya gebetan baru, aku ingin memulai obrolan dengan gebetan ku yang satu ini, di halaman tersebut, aku menulis siapa nama gebetan-nya, umur-nya berapa dan menulis nomor hape-nya. 

Kita buat halaman baru HalamanGebetanBaru.swift

```swift

import SwiftUI

struct HalamanGebetanBaru: View {
  var body: some View {
    ScrollView {
      Form {
        Section("Nama Gebetan") {

        }
      }
    }
  }
}

```

Setelah itu, aku tambah tombol `plus` di bagian atas kanan halaman daftar gebetan kita, dengan menambah Toolbar

```swift

import SwiftUI

struct DaftarGebetanView: View {

  @State private var gebetanBaru: String?

  var body: some View {
    NavigationStack {
      List {
        ForEach(gebetans) { gebetan in
            
        }
      }.navigationDestination(for: Gebetan.self) { _ in
            ChatGebetanView()
        }.toolbar {
          // Menambah tombol di Toolbar
            ToolbarItem(placement: .navigationBarLeading) {
              Button {
                gebetanBaru = "gebetanBaru"
              } label: {
                Image(system: "add.plus")
              }
            }
      }.sheet(withItem: $gebetanBaru) { gebetan in 
          HalamanGebetanBaru()
      }
    }
  }
}

```

Catatan untuk aku, untuk menambah Tombol di navigasi atas, entah posisi kiri kanan, gunakan ToolbarItem untuk menampatkan posisi Button-nya.

Aku pelajari, untuk memunculkan halaman dari bawah ke atas, atau Apple sebut 'Presenting Modal', syaratnya harus ada data yang ditampung. 

Jadi kita menempelkan fungsi `.sheet(item: )` dengan membawa data `gebetanBaru`, baru di dalamnya kita panggil `HalamanGebetanBaru()`






