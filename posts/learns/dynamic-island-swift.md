---
title: Coba Bikin Widget Live Activity Serta Dynamic Island iOS 16
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-05-13
scheduled: 2023-05-13
tags:
  - learns
layout: layouts/post.njk
---

Aku mencoba mengembangkan dari salah satu fitur iOS 16, Live Activity dan Dynamic Island

Jadi Live Activity, paling rekomendasi untuk aplikasi yang kasih suasana untuk melapor sesuatu, seperti order kopi kamu sudah sampai mana, pertandingan bola berlangsung atau komentator di sidang penceraian.

Kabarnya, iPhone terbaru bakal dikasih Dynamic Island dan Always-on Display, jadi ini termasuk benefit nanti

Untuk memulainya, kita menggunakan Widget Extensions, jadi ini pisah dengan pengembangan aplikasi iOS utama-nya,

{% image "./img/remote/dynamicisland/add-widget.png", "Add Widget Extensions" %}

Kita menambah *Extension Widget* di proyek Xcode kita, dengan File → New → Target

Tulis nama Extension-nya, yang mencerminkan fungsi utama Widget tersebut

Setelah itu nanti kamu dikasih beberapa sample, tapi kamu harus mengecek file yang ada class `WidgetBundle` di sini, fungsi utama untuk memanggil Widget kita nanti

```swift
@main
struct IstriWidgetBundle: WidgetBundle {
    var body: some Widget {
        
        #if canImport(ActivityKit)
         PacarTrackLiveActivity()
        #endif
        
        #if os(iOS)
        DailyIstriWidget()
        #endif
    }
}
```

Berikut struktur utama Widget Istri/Pacar Tracking Live Activity ku, semua satu paket di sini termasuk Dynamic Island

```swift
struct PacarTrackLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: PacarTrackAttribute.self) { context in
            // Lock screen/banner UI goes here
            
                VStack(alignment: .leading) {
                    Text("Pacar kamu lagi Ngopi di Unknown Cafe")
                    .bold().font(.subheadline)
                    Text("Terakhir Update 11:45")
                }
            .activityBackgroundTint(Color.white)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
                    
            DynamicIsland {
                // Di sini Dynamic Island yang dibesarkan
                // variasi wilayah, dari posisi kiri (leading),
                // posisi kanan (trailing) dan posisi bawah (bottom) *sisanya
                 DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: "figure.wave")
                    .foregroundColor(.white)
                    .background(.black, in: ContainerRelativeShape())
                }
                DynamicIslandExpandedRegion(.trailing) {
                    HStack {
                        Text("LIVE")
                        Image(systemName: "circle.circle.fill")
                        .foregroundColor(.red)
                        .background(.black, in: ContainerRelativeShape())
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Melacak Istri #1")
                    Rectangle()
                    .frame(width: .infinity, height: 2)
                    .foregroundColor(.white)
                    // more content
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Istri lagi di tempat Arisan Ibu Juni")
                            .bold().font(.title3)
                            Text("Terakhir Update 11:45")
                        }
                        Spacer()
                    }
                }
            } compactLeading: {
                Text("Kiri")
            } compactTrailing: {
                Text("Kanan")
            } minimal: {
                Text("Min")
            }
            .widgetURL(URL(string: "https://literasi.blog"))
            .keylineTint(Color.red)
        }
    }
}

```

Kalau kita membahas turun temurunnya

1. Pertama kita panggil `ActivityConfiguration`, mesti didamping dengan attributnya, atribut ku nanti ku buat PacarActivityAttributes di sini
2. Kita isi dengan code SwiftUI untuk menyusun desain interface-nya
3. Agar support Dynamic Island, kita lanjutkan ekor penutupnya dengan `dynamicIsland`

Widget punya beberapa kategori, untuk Live Activity kita menggunakan `ActivityConfiguration`

Sebelum menulis desain Widget di atas, kita perlu menulis Atributnya terlebih dahulu untuk mengisi konten di Widgetnya, dengan menggunakan `ActivityAttributes`

```swift
#if canImport(ActivityKit)
import Foundation
import ActivityKit

public struct PacarActivityAttributes: ActivityAttributes {
    public typealias MyActivityStatus = ContentState
    
    public struct ContentState: Codable, Hashable {
        var timerRange: ClosedRange<Date>
    }

    
    var istriId: String
    var istri: [String]
    var destinasi: [String]
    var activityName: String
}

#endif
```

Pastikan untuk memasang `ActivityConfiguration` harus match dengan tipe Attribute yang sama, ini penting untuk menghidupkan Live Activity-nya

Karena Live Activity bersifat sementara, mungkin isinya berubah, selama itu memberikan informasi secara langsung, di dalamnya ada struktur `ContentState` untuk setting waktu sesuai permintaan data.

Sekarang kita testing bagaimana hasilnya lewat `PreviewProvider`

{% image "./img/remote/dynamicisland/live-activity-preview.png", "Live Activity Preview" %}

```swift
struct PacarLiveActivity_Previews: PreviewProvider {
    static let pacarAttributes = PacarActivityAttributes(istriId: "laila2",
     istri: ["Sabine"],
      destinasi: ["Rumah Sakit Salin"],
       activityName: "Destinasi Keluarga")
    static let contentState = PacarActivityAttributes
    .ContentState(timerRange: Date.now...Date(timeIntervalSinceNow: Double(4500)))

    static var previews: some View {
        pacarAttributes
            .previewContext(contentState, viewKind: .dynamicIsland(.compact))
            .previewDisplayName("Island Sekilas")
        pacarAttributes
            .previewContext(contentState, viewKind: .dynamicIsland(.expanded))
            .previewDisplayName("Island Dibesarkan")
        pacarAttributes
            .previewContext(contentState, viewKind: .dynamicIsland(.minimal))
            .previewDisplayName("Minimal")
        pacarAttributes
            .previewContext(contentState, viewKind: .content)
            .previewDisplayName("Notification")
    }
}

```

Sekilas penampilannya di Lock Screen, kabarnya iPhone 15 atau ke depannya akan Always-On Display, ini kasih benefit untuk aplikasi yang punya Live Activity, entah itu delivery kopi kamu, posisi pacar kamu di mana, atau pertandingan bola berlangsung, bahkan yang kita coba buat sekarang, melihat pergerakan pacar kita langsung

{% image "./img/remote/dynamicisland/preview-dynamic-expand.png", "Dynamic Island Preview" %}

Dynamic Island memang kelihatan elegan, apalagi sekarang hanya tersedia untuk pengguna iPhone 14 Pro ke atas, mungkin bukan lagi gimmick ini ke depannya

Selama kamu mengerti dengan konfigurasi Dynamic Island, kamu bisa eksplor lebih, apalagi tata desainnya menggunakan SwiftUI

## Hidupin Live Activity

Sebelum Live Activity atau Dynamic Island muncul di Lock Screen, butuh Trigger nya dulu, skenario nya begini, misalnya iPhone-ku dan iPhone istri sudah terhubung, jadi saat kamu merindukannya atau aktivitas di luar nya gimana, kita aktifkan dulu dari aplikasi

Jadi aku set Button dan di dalamnya fungsi untuk trigger Live Activity

Biar clear, aku pastikan App nya support ActivityKit dengan `canImport` , barang kali iPhone nya belum iOS 16

```swift
#if canImport(ActivityKit)
func trackGirlfriend() {
    let timerSeconds = 360
    let pacarAttributes = PacarActivityAttributes(istriId: "irene", istri: ["Irene"], destinasi: ["Starbucks"], activityName: "Ngopi Cantik")
    
    let future = Date(timeIntervalSinceNow: Double(timerSeconds))
    
    let initialContentState = PacarActivityAttributes.ContentState(timerRange: Date.now...future)
    
    let activityContent = ActivityContent(state: initialContentState, staleDate: Calendar.current.date(byAdding: .minute, value: 2, to: Date()))
    
    do {
        let myActivity = try Activity<PacarActivityAttributes>.request(attributes: pacarAttributes, content: activityContent)
        print("Siaran langsung istri ku mulai: \(myActivity.id)")
    } catch let error {
        print("Ada yang gak beres: \(error.localizedDescription)")
    }
}
#endif
```

Aku selipkan fungsi trackGirlfriend di suatu View Model untuk SwiftUI Viewnya, sekarang kita buat Button untuk trigger-nya

```swift
private func beginTrackGirlfriend() -> some View {
        Button {
            viewModel.trackGirlfriend()
        } label: {
            Text("Track di mana pacar aku")
        }.buttonStyle(.bordered)
    }
```

## Coba di Simulator

{% image "./img/remote/dynamicisland/enable-track.png", "Enable Track Girlfriend" %}

Aku langsung agresif aja coba di iOS simulator, coba langsung menekan Button yang kita buat tadi, koq gak nampak di Lock Screen, ternyata ada Log Error muncul kasih tau alasannya kenapa

`Error Requesting Live Activity: Target does not include NSSupportsLiveActivities plist key`

{% image "./img/remote/dynamicisland/support-live-activities.png", "Support Live Activities" %}

berarti App ku belum connect dengan Live Activities, pastikan kita sudah menambah properti di bagian Info Properties-nya, NSSupportLiveActivities atau Support Live Activities, set-kan ke YES

Ku coba lagi, akhirnya baru muncul, *REMINDER* juga untuk aplikasi yang baru pertama kali memunculkan Live Activity mesti dapat izin pengguna iPhone-nya dulu
kalau gak dapat izin, sama aja gak muncul

Kalau di lock screen-nya, muncul di bawah

{% image "./img/remote/dynamicisland/live-activity-lockscreen.jpg", "Live Activity LockScreen" %}

Jadi ini sekilas, Always-On Display di iPhone 14 Pro, kamu bisa lihat Live Activity menonjol sendiri, kalau kamu ingin cari perhatian untuk pengguna, kasih varian pernak pernik di Live Activities kamu, warna yang menonjol

Aku belum mencoba, adakah maksimal ukuran lebar-nya di Live Activities

Selanjutnya penampilan Dynamic Island, kamu harus klik tahan untuk memperbesar Dynamic Island

{% image "./img/remote/dynamicisland/dynamic-homescreen.jpg", "Dynamic Island di Home Screen" %}

## Memberhentikan Live Activity

Jadi ada dua kemungkinan cara yang ku temui untuk memberhentikan Live Activity

**Pertama**, dari Timer yang kita set tadi di ContentState bersama Atributnya

**Kedua**, ada panggilan khusus untuk memberhentikannya

Untuk metode ke dua, ini skenario untuk pengguna yang memang pas lagi berada di dalam app-nya alias *foreground*

```swift
private func endTrackingGirlfriend() {
    Task {
            for activity in Activity<TruckActivityAttributes>.activities {
                // Pastikan ID Istri / Pacar kita sama yang untuk diberhentikan
                if activity.attributes.istriId == String(istri.id.dropFirst(6)) {
                    await activity.end(nil, dismissalPolicy: .immediate)
                }
            }
        }
}
```

Perumpamaannya, kalau status istri aku sudah nyampai rumah, seharusnya otomatis mati Live Activity-nya, jadi User gak repot repot matikan manual

```swift
if status == .dalamPerjalanan {
      #if canImport(ActivityKit)
          print("Memulai melacak istri.")
          beginTrackGirlfriend()
      #endif
} else if status == .sampaiRumah {
      #if canImport(ActivityKit)
          print("Berhenti melacak istri.")
          endTrackingGirlfriend()
      #endif
}
```

Catatan di sini, jika aplikasi-nya terhubung dengan server, rekomendasi banget server nya yang mematikan Live Activity-nya, lewat Remote Push Notification nya Apple. 
Aku pengen pelajari ini lagi, dengan integrasi Firebase Messaging

## Jenis Jenis Posisi Dynamic Island

{% image "./img/remote/dynamicisland/preview-dynamic.png", "Dynamic Island Minimum" %}

Dynamic Island punya beberapa ukuran dinamis sesuai kebutuhan informasi yang ingin kamu provide

1. **Expanded View:** Ini Widget yang dibesarkan setelah mengklik Dynamic Island
2. **compactLeading:** Posisi bagian kiri untuk Dynamic Island
3. **compactTrailing:** Posisi bagian kanan untuk Dynamic Island
4. **minimal:** Posisi bawaan *default* Dynamic Island

Untuk ExpandedView, ada tiga wilayah penempatan juga juga di situ, dengan menggunakan DynamicIslandExpandedRegion 

.leading, .trailing dan .bottom - .bottom untuk konten utama-nya

```swift
DynamicIsland {
  DynamicIslandExpandedRegion(.leading) {
                      Text("Pacar Tracker")
                  }
                  DynamicIslandExpandedRegion(.trailing) {
                      Text("Trailing")
                  }
                  DynamicIslandExpandedRegion(.bottom) {
                      Text("Bottom")
                      // more content
                      HStack {
                          VStack(alignment: .leading) {
                              Text("Pacar kamu lagi Ngopi di Unknown Cafe")
                              .bold().font(.title2)
                              Text("Terakhir Update 11:45")
                          }
                          Spacer()
                      }
  }
}
```

Untuk sementara ini pengalaman ku bersama Live Activity dan Dynamic Island di Widget Extensions-nya iOS,
alhamdulillah aku bisa share di blog ini

aku harap aku bisa explore widget lainnya, seperti `StaticConfiguration` dan `IntentConfiguration`
di Home Screen dan juga Widget di Apple Watch

Catatan:

1. Live Activity hanya bisa berlangsung selama 8 jam, entah iPhone nya dalam keadaan sleep atau hidup, apapun itu kondisinyaa
2. Widget sifatnya hanya mendisplay data, tidak ada input tambahan di situ, kalaupun di-klik itu akan launch ke pemilik live activity-nya
3. Live Activity cocok banget untuk aplikasi yang memprioritaskan kebutuhan penggguna, seperti order makanannya, tapi sangat tidak dianjurkan seperti berita terbaru yang menganggu perhatian pengguna

Referensi:
1. [Displaying Live Data with Live Activities - Apple Developer](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)
2. [Updating and Ending your Live Activity with ActivityKit Push Notifications - Apple Developer](https://developer.apple.com/documentation/activitykit/updating-and-ending-your-live-activity-with-activitykit-push-notifications)












