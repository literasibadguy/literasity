---
title: Kasih Gradiasi Warna di SwiftUI
description: Terima kasih dengan Cloudflare, karena blog ini ga bayar bulanan
date: 2023-08-10
scheduled: 2023-08-10
tags:
  - learns
layout: layouts/post.njk
---

Coba cari tahu bagaimana cara nya kasih warna kasih gradiasi di SwiftUI, referensi pertama ku menggunakan `LinearGradient`

```swift

private let blue_gradient_1 = hex_color(r: 50, g: 113, b: 168)
private let blue_gradient_2 = hex_color(r: 16, g: 63, b: 232)

private let blue_grads = [blue_gradient_1, blue_gradient_2]

let BlueGradient: LinearGradient = LinearGradient(colors: blue_grads, startPoint: .bottomLeading, endPoint: .topTrailing)

```

Setelah membuat gradiasi, `LinearGradient` langsung bisa kita panggil ke dalam struktur View-nya

```swift

struct BlueSeaGradientView: View {
	var body: some View {
		BlueGradient.edgesIgnoringSafeArea([.top, .bottom])
	}
}

```

Linear Gradient butuh posisi titik awal dan titik akhir-nya di mana, kamu bisa atur di properti-nya `startPoint` dan `endPoint`

Kita coba Gradiasi lainnya, yaitu **`AngularGradient`**, dengan membuat animasi lingkaran

```swift

struct DeterminateCircularProgress: View {

    @State

    private var angle: Angle = Angle(degrees: 0)

    var body: some View {
        Circle().fill(AngularGradient(gradient: 
        Gradient(colors: [.clear, .red]), center: .center, startAngle: angle, endAngle: angle + Angle(degrees: 360)))
        .onAppear {
            withAnimation(Animation.linear(duration: 1).repeatForever(autoreverses: false)) {
                self.angle = Angle(degrees: 360)
            }
        }
    }
}

```

{% image "./img/remote/swiftui/gradient/angular-gradient.png", "Angular Gradient" %}

Copy-paste aja deh, kita buat lingkaran interaktif seperti penampilan Radar, dengan mengisi warna `Circle` dengan `AngularGradient`

Pilihan Gradiasi lainnya, **`EllipticalGradient`**, saat warna pertama dikelilingi warna kedua, penerapannya hampir sama dengan `AngularGradient`

```swift

struct SpreadAngularView: View {

	var body: some View {
		Circle().fill(EllipticalGradient(colors: [.green, .yellow], center: .center))
	}
}

```

Yang terakhir kita coba **`RadialGradient`**, sebenarnya menulis ini aku belum pernah menggunakannya, selama ini menggunakan LinearGradient aja, tapi selagi kita explore, yang penting penampakannya gimana

```swift

struct RadialSpreadView: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 300).fill(RadialGradient(colors: [.red, .blue], center: .center, startRadius: 120, endRadius: 450))
    }
}

```

`RadialGradient` mungkin hampir sama dengan `EllipticalGradient`, di sini kita yang mengatur warna apa yang dominan, sebarnya gimana, salah satu warna ngendap-nya kemana.

Jadi di SwiftUI, kita bisa menggunakan empat macam gradiasi: `LinearGradient`, `AngularGradient`, `EllipticalGradient`, `RadialGradient`

Untuk favoritku, aku sering menggunakan LinearGradient dan AngularGradient, termasuk essential untuk pengembangan aplikasi SwiftUI

Referensi:

[LinearGradient di SwiftUI - Apple Developer](https://developer.apple.com/documentation/swiftui/lineargradient)

[AngularGradient di SwiftUI - Apple Developer](https://developer.apple.com/documentation/swiftui/angulargradient)

[EllipticalGradient di SwiftUI - Apple Developer](https://developer.apple.com/documentation/swiftui/ellipticalgradient)

[RadialGradient di SwiftUI - Apple Developer](https://developer.apple.com/documentation/swiftui/radialgradient)




