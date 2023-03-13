---
title: Teks Form dan Menyusunnya SwiftUI Series
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-03-13
scheduled: 2023-03-13
draft: true
tags:
  - learns
layout: layouts/post.njk
---

Dear Firas

Di tulisan sebelumnya tentang Navigasi aku menambahkan *NewGebetanView.swift*, sekarang aku fokuskan di sini, untuk menambah beberapa input teks di SwiftUI-nya

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

Kita mulai dengan `Form`, tanda-nya ini halaman ini diperuntukkan format input data, aku coba tambah satu Section dengan isinya `TextField`

Sebelum aku menggunakan `TextField`, aku harus bikin properti bernama `namaGebetan` dengan status `@State`, ini untuk merekam status tulisan yang terinput di *TextField*

```swift
import SwiftUI

struct HalamanGebetanBaru: View {

  @State private var namaGebetan: String = ""

  var body: some View {
    ScrollView {
      Form {
        Section("Nama Gebetan") {
            TextField("Gabriella Montana Contohnya": text: $namaGebetan)
        }
      }
    }
  }
}
```

Aku tambah satu `Section` lagi, untuk mendeskripsikan gimana sih gebetan baru ku ini

```swift
import SwiftUI

struct HalamanGebetanBaru: View {

  @State private var namaGebetan: String = ""
  @State private var deskripsi: String = "Ceritakan tentang gebetan baru kamu.."

  var body: some View {
    ScrollView {
      Form {
        Section("Nama Gebetan") {
            TextField("Gabriella Montana Contohnya": text: $namaGebetan)
        }
        Section("Tentang Dia") {
            TextEditor(text: $deskripsi)
        }
      }
    }
  }
}
```

Aku menambah satu `Section` lagi, ini gebetan bisa jadi prioritas aku gak, kalau iya, berarti aku tambah nanti fitur prioritas, jadi kalau ada pesan dari dia, chatnya selalu di atas.


```swift
import SwiftUI

struct HalamanGebetanBaru: View {

  @State private var namaGebetan: String = ""
  @State private var deskripsi: String = "Ceritakan tentang gebetan baru kamu.."
  @State private var prioritas: Bool = false

  var body: some View {
    ScrollView {
      Form {
        Section("Nama Gebetan") {
            TextField("Gabriella Montana Contohnya": text: $namaGebetan)
        }
        Section("Tentang Dia") {
            TextEditor(text: $deskripsi)
        }
        Section("Prioritas") {
            Toggle(isOn: $prioritas) {
              Label("Gebetan Prioritas")
            }
            Text("Gebetan prioritas akan selalu di daftar bagian atas obrolan")
        }
      }
    }
  }
}
```

Kita tambah switch on/off di `Section` ketiga, prioritas gebetan aku atau bukan, di bawah aku tambah catatan kaki, biar pengguna lain tahu apa fungsinya sebelum menggunakan-nya

Untuk sementara, form sudah beres, aku menambah tombol *Selesai* Done di Toolbar-nya

```swift
import SwiftUI

struct HalamanGebetanBaru: View {

  @Environment(\.dismiss) private var dismiss

  @State private var namaGebetan: String = ""
  @State private var deskripsi: String = "Ceritakan tentang gebetan baru kamu.."
  @State private var prioritas: Bool = false

  var body: some View {
    ScrollView {
      Form {
        Section("Nama Gebetan") {
            TextField("Gabriella Montana Contohnya": text: $namaGebetan)
        }
        Section("Tentang Dia") {
            TextEditor(text: $deskripsi)
        }
        Section("Prioritas") {
            Toggle(isOn: $prioritas) {
              Label("Gebetan Prioritas")
            }
            Text("Gebetan prioritas akan selalu di daftar bagian atas obrolan")
        }
      }.toolbar {
        ToolbarItem(placement: .navigationBarTrailing) {
          Button {
            Task {
              dismiss()
            }
          } label: {
              Text("Done").bold()
          }
        }
      }
    }
  }
}
```

Ada bonus pelajaran yang ku dapati di sini, untuk keluar dari HalamanGebetanBaru, aku butuh fungsi dismiss, jadi aku harus pinjam **@Environment** dismiss untuk bantuk aku keluar dan kembali ke daftar gebetan

Akhirnya aku bisa menambah gebetan baru, sekarang aku butuh untuk menampilkan gebetan gebetan ku di induk kita.