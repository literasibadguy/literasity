---
title: Membuat Model Data untuk SwiftUI
description: model data untuk SwiftUI
date: 2023-03-16
scheduled: 2023-03-16
draft: true
tags:
  - learns
layout: layouts/post.njk
---

Dear Firas

Aku sudah menulis sekilas gambaran aplikasi daftar chat gebetan di SwiftUI, sekarang giliran data gebetannya sendiri

Kembali lagi melihat file kita DaftarGebetanView.swift

```swift

import SwiftUI

struct DaftarGebetanView: View {

  var gebetans: [Gebetan] = [.gebetan1, .gebetan2]

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

Sebenarnya aku belum membuat model data Gebetannya, jadi XCode masih kasih aku tanda merah error, aku belum melihat sekilas Preview nya

```swift

struct Gebetan: Identifiable {

  public var namaGebetan: String
  public var deskripsi: String

  public init(namaGebetan: String, deskripsi: String) {
    self.namaGebetan = namaGebetan
    self.deskripsi = deskripsi
  }
}

```

Untuk membuat data motel Gebetan, kita harus pasang `Identifiable` di strukturnya, biar SwiftUI nya tahu ini data punya identitas

Karena kita perlu data mockup, aku palsukan data Gebetan ku dulu, aku penasaran gimana Preview-nya nanti

```swift

extension Gebetan {

  public static var gebetanFunitsu = Gebetan(namaGebetan: "Funitsu", deskripsi: "Manis tapi galak. Nampaknya aku bakal jadi filsafat karena dia")

  public static var gebetanIrene = Gebetan(namaGebetan: "IRENE", deskripsi: "Psycho di dalam, di luar lembut")

}

```

Mungkin cukup dua dulu gebetan, karena ini yang lagi ku dekatin mereka. 



