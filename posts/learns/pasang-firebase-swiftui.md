---
title: Pasang Firebase dalam SwiftUI
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-06-07
scheduled: 2023-06-07
draft: true
tags:
  - learns
layout: layouts/post.njk
---

Firebase termasuk layanan server favoritku dari Google Cloud. Cepat, ringan dan murah. Dan aku ingin mencobanya dalam proyek SwiftUI. Dari paket database seperti Firebase Firestore, simpan asset gambar dan video di Firebase Storage, 

Notifikasi dengan Firebase Messaging, sudah jadi satu paket, aku ingin mengambil benefit di sini

Pertama, kita harus memasang Firebase Package dulu, lewat Swift Package Manager

File -> Add Packages..

Cari `Firebase`, nanti muncul `firebase-ios-sdk`



Di sini saya menggunakan SwiftUI untuk proyek yang ku kerjakan, secara formal Firebase belum support penuh dengan SwiftUI, jadi pastikan AppDelegate sudah hadir di sini.

```swift

class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      FirebaseApp.configure()
      
    return true
  }
}

```

Karena SwiftUI secara *default* tidak menggunakan AppDelegate, kita harus menghubungkannya terlebih dulu dengan `@UIApplicationDelegateAdaptor`

```swift

@main
struct AplikasiFirebase: App {
    @UIApplicationDelegateAdaptor private var appDelegate: AppDelegate

    var body: some Scene {

    }
}

```

Sekarang sudah terpasang penuh, sebelum mencoba pastikan file `GoogleService-Info.plist`, identitas integrasi aplikasi iOS kamu dengan layanan Firebase sudah include di proyek kamu.

## Pasang Firebase Auth

Agar enak adaptasinya dengan SwiftUI, saya menggunakan `ObservableObject`

```swift

import FirebaseAuth


public class CurrentFirebaseAuth: NSObject, ObservableObject {

    public var currentAuth = Auth.auth()

    @Published public var currentUser: FirebaseAuth.User?

    func pasangStatusAuthHandler() {
      if authStateHandler == nil {
        authStateHandler = currentAuth.addStateDidChangeListener { auth, user in

          self.currentUser = user

        }
      }
    }
}

```

Untuk menghidupkan Firebase Auth kita, kita langsung panggil aja dengan `Auth.auth()`, jadinya induk currentAuth, di sini kamu akan memanggil semua fungsi-nya

dan status user nya menggunakan `FirebaseAuth.User`

## Pasang Database Firestore

```swift

import FirebaseFirestore

@MainActor
public class CurrentFirestore: ObservableObject {

    var database = Firestore.database()

    public static let shared = CurrentFirestore()
}

```

## Pasang Firebase Storage


## Kumpulin jadi satu

Setelah masing masing sudah memiliki kamar sendiri, untuk memanggil setiap fiturnya, dari Autentikasi, Database, hingga Storage, sekarang kita gabungin jadi satu

```swift

@main
struct AplikasiFirebase: App {
    @UIApplicationDelegateAdaptor private var appDelegate: AppDelegate

    @StateObject private var currentAuth = CurrentFirebaseAuth.shared
    @StateObject private var currentStorage = CurrentFirestore.shared
    @StateObject private var currentFirestore = CurrentFirestore.shared

    var body: some Scene {
        WindowGroup {
            NavigationView {
                VStack {
                  Text("Aplikasi Firebase Pertama")
                }
            }.environmentObject(currentAuth)
        }
    }
}

```

