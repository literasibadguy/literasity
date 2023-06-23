---
title: Pasang Firebase dalam SwiftUI
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-06-23
scheduled: 2023-06-23
tags:
  - learns
layout: layouts/post.njk
---

Firebase termasuk layanan server favorit dari Google Cloud. Cepat, ringan dan murah. Dan saya ingin mencobanya dalam proyek SwiftUI. Dari paket database seperti Firebase Firestore, simpan asset gambar dan video di Firebase Storage, 

Notifikasi dengan Firebase Messaging, sudah jadi satu paket, aku ingin mengambil benefit di sini

Pertama, kita harus memasang Firebase Package dulu di proyek Xcode nya terbuka, lewat Swift Package Manager

- File -> Add Packages..

- Cari `Firebase`, nanti muncul `firebase-ios-sdk`

- Centang-kan "FirebaseAuth", "FirebaseFirestore", "FirebaseFirestoreSwift", "FirebaseStorage" untuk contoh tulisan di sini

- Sudah terpilih, tekan "Add Package"

*Catatan: Nunggu-nya mungkin lama, tapi kita ambil beberapa Library yang akan dipakai, aku sarankan biarkan kosong "Firebase Analytics", sedikit kompleks di SwiftUI, akan menganggu proses building*

Sebelum pengembangan, pastikan kamu sudah terdaftar di Firebase, sudah mendaftarkan identitas proyeknya di Firebase Console, dan mengikuti panduan Firebase untuk integrasi SDK iOS, karena tulisan ini dokumentasi ku bersama SwiftUI

Secara formal Firebase belum support penuh dengan SwiftUI, jadi pastikan AppDelegate sudah siap dulu

Catatan: *Masa depan pengembangan aplikasi platform Apple kebanyakan menggunakan SwiftUI*

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

    private init() {

    }
}

```

## Pasang Firebase Storage

```swift
import Foundation
import FirebaseStorage

public class CurrentFirebaseStorage: ObservableObject {

  var storage = Storage.storage()
  public static let shared = CurrentFirebaseStorage();

  private init() {

  }
} 

```


## Kumpulin jadi satu

Setelah masing masing sudah memiliki kamar sendiri, untuk memanggil setiap fiturnya, dari Autentikasi, Database, hingga Storage, sekarang kita gabungin jadi satu dengan memendam-nya di dalam `environmentObject`

Jadi anak anak halaman SwiftUI yang menjadi satu, tinggal memanggilnya nanti dengan menandai properti `@EnvironmentObject`, tidak ada deklrasi ulang

Di sini jadi pelajaran juga saya, filosofi SwiftUI soal kekeluargaan, jadi kalau satu dalam status inisial kosong berarti yang lain kosong, semua dipanggil dalam serentak

```swift

@main
struct AplikasiFirebase: App {
    @UIApplicationDelegateAdaptor private var appDelegate: AppDelegate

    @StateObject private var currentAuth = CurrentFirebaseAuth.shared
    @StateObject private var currentStorage = CurrentFirebaseStorage.shared
    @StateObject private var currentFirestore = CurrentFirestore.shared

    var body: some Scene {
        WindowGroup {
            NavigationView {
                VStack {
                  Text("Aplikasi Firebase Pertama")
                }
            }.environmentObject(currentAuth)
            .environmentObject(currentStorage)
            .environmentObject(currentFirestore)
        }
    }
}

```

## Contoh sedernana aplikasi Firebase

Sekarang kita buat skenario sederhana, membuat aplikasi ecommerce lokal misalnya, pertama pengguna mesti registrasi atau login untuk akses ke aplikasi

kedua, pengguna akan melengkapi data profilnya untuk lebih menarik di dalam toko-nya

Selama melengkapi data profilnya, pengguna akan mengupload foto profil toko-nya

## Registrasi Akun dengan Firebase Auth

Pertama, kita mungkin membuat halaman Registrasi-nya dulu `RegistrasiView.swift`

```swift

struct RegistrasiView: View {

    @EnvironmentObject private var currentAuth: CurrentFireAuth
    @EnvironmentObject private var currentFirestore: CurrentFirestore

    @State private var username: String = ""
    @State private var password: String = ""

    public var body: some View {
      Form {
        Section {
          Text("Registrasi Akun")
        }

        Section {
                TextField("Tulis password", text: $username).keyboardType(.emailAddress).textInputAutocapitalization(.never).textContentType(.username).autocorrectionDisabled(true).submitLabel(.continue)

                TextField("Password", text: $password).keyboardType(.emailAddress).textInputAutocapitalization(.never).textContentType(.username).autocorrectionDisabled(true).submitLabel(.continue)
            }
      }.formStyle(.automatic).toolbar {
          ToolbarItem(placement: .navigationBarTrailing) {
            Button("Selesai") {
              Task {
                let userResult = await currentAuth.createEmailPassUser(email: email, pass: password)
                ...
              }
            }
          }
      }
    }
}

```

Sekarang kita menulis fungsi registrasi akun-nya langsung dari module Firebase Auth

```swift

import FirebaseAuth

// ...
public func createEmailPassUser(email: String, pass: String) async -> FirebaseAuth.User? {
  let authResult = try? await currentAuth.createUser(withEmail: email, password: pass)
  if let result = authResult {
    return result.user
  } else {
    return nil
  }
}
```

## Mutasi data pengguna di Firestore

Sebelumnya FirebaseAuth hanya sebatas menyimpan akses identitas kita berdasarkan email, password, bukan untuk menyimpan data profil, seperti nama lengkap kamu, username, alamat, atau deskripsi bisnis toko kamu,

kali ini kita menggunakan Database Firestore untuk menyimpan hal tersebut, enaknya membuat stuktur data `Pengguna` dulu

```swift
public final class BikinPengguna: Encodable, Sendable {
  public let uid: String
  public let namaLengkap: String
  public let namaUser: String
  public let deskripsi: String
}
```

Sekarang kita bikin fungsi mutasi data menambah profil setelah sukses berhasil registrasi dari Firebase Auth kita

```swift
public func bikinProfil(_ pengguna: BikinPengguna) {
        try? database.collection("daftarPengguna").document(account.uid).setData(from: account) { error in
            if let err = error {
                print("Error adding document: \(err)")
            } else {
                
            }
        }
    }
```

Struktur Firestore, bisa ku katakan unik, tidak seperti database SQL-lainnya, karena ini NonSQL, jadi setiap grup database, ada namanya `collection`, seperti kasus di atas, aku membuat koleksi `daftarPengguna` di dalam *collection`, dengan ID pengguna yang sudah dilampirkan dari pengguna terdaftar tadi

Jadi setelah proses bikin registrasi Firebase Auth, selanjutnya kita simpan dalam Firestore, mungkin contohnya seperti ini

```swift

Button("Selesai") {
  Task {
    let userResult = await currentAuth.createEmailPassUser(email: email, pass: password)
    if user != nil {
      let pengguna = BikinPengguna(
          uid: user.id
          namaLengkap: ""
          namaUser: ""
          deskripsi: "Tidak ada deskripsi"
      )
      currentFirestore.bikinProfil(pengguna)
      dismiss()
    }
  }
}

```

## Upload foto profile dengan Firebase Storage

Sekarang kita pindah ke halaman berikutnya setelah pengguna mendaftar informasi email dan password-nya, kali ini untuk melengkapi profil pengguna tersebut, dari nama lengkap, deskripsi dan yang penting foto profil

```swift
import SwiftUI

struct LengkapiProfileView: View {

  @State private var profileImage: UIImage = UIImage(systemName: "person.crop.circle.fill")!
  @State private var imageSelection: PhotosPickerItem? = nil

  var body: some View {
      Form {
        Sections("Edit Profile") {
            AvatarView(uiImage: profileImage).onTapGesture {
              photoPickerPresented = true
            }
        }
      }.photosPicker(isPresented: $photoPickerPresented, selection: $imageSelection)
  }
}

```

Di sini secara garis besar, saya menambahkan foto profil di halaman meng-edit untuk pengguna, saya kasih di penghujungnya `photosPicker`

Jadi pengguna akan menuju gallery foto foto di iPhone-nya untuk memilih foto profil-nya, setelah terpilih kita akan upload dengan menggunakan Firebase Storage

Kembali ke file `CurrentFirebaseStorage.swift`, saya menambah fungsi `mediaUpload`, mengambil Data dari foto yang di pilih dari gallery tadi

```swift
public func mediaUpload(data: Data, idMedia: String) -> URL?  {
  let storageRef = storage.reference()
        let riversRef = storageRef.child("images/\(idMedia).jpg")
        let metadata = try? await riversRef.putDataAsync(data)

        if metadata != nil {
            let downloadedUrl = try? await riversRef.downloadURL()
            print("THERE IS DOWNLOADED URL")
            return downloadedUrl
        } else {
            print("THERE IS NO DOWNLOADED URL")
            return nil
        }
}
```

Sekarang kita panggil fungsi di atas, di halaman View `EditProfileView` tadi

```swift
import SwiftUI

struct LengkapiProfileView: View {
  var body: some View {
      Form {
        Sections("Edit Profile") {
            AvatarView(uiImage: profileImage).onTapGesture {
              photoPickerPresented = true
            }
        }
      }.photosPicker(isPresented: $photoPickerPresented, selection: $imageSelection)
      .onChange(of: imageSelection) { selected in
            return selected.loadTransferable(type: ImageFileTransferable.self) { result in
            DispatchQueue.main.async {
                guard imageSelection == self.imageSelection else {
                    print("Failed to get the selected item.")
                    return
                }
                switch result {
                case .success(let profileImage?):
                    if let imageData = try? Data(contentsOf: profileImage.url) {
                        let url = mediaUpload(imageData, idMedia: username)
                    }
                case .success(nil):
                    break;
                case .failure(let error):
                    break;
                }
            }
        }  
      }
  }
}
```

Setelah foto profil di-upload berhasil, hasilnya ku dapatin URL, jadi alamat URL untuk mengambil gambar tersebut akan kita *update* struktur data pengguna di Firestore, di situ petualangan selanjutnya.

Dokumentasi ini hanya gambaran besar, mungkin secara spesifik pengembangan Firebase akan ku *update* atau di halaman baru. Semoga bermanfaat.

Referensi:

- [Firebase Documentation](https://firebase.google.com/docs/build)
