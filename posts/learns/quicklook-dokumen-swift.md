---
title: Melihat Dokumen Media dengan QuickLook iOS
description: Untuk membuka dokumen dan gambar
date: 2023-06-04
scheduled: 2023-06-04
tags:
  - learns
layout: layouts/post.njk
---

Selama coding pengembangan iOS, aku baru tahu ada resep khusus untuk fitur
melihat dokumen, gambar secara detail

menggunakan QuickLook, Halaman khusus untuk mengecek dokumen secara detail, kebanyakan aplikasi populer sosmed dan chat, seperti WhatsApp atau Telegram, menggunakan QuickLook untuk pengguna melihat lampiran dokumen langsung

Jadi sebelum aku mengetahui *QuickLook*, ku kira pengembang memang membuat sendiri Viewer tersebut

Untuk memanggilnya, sumbernya dari URL lokal file lokasinya, yang mungkin kita download terlebih dahulu dan simpan di lokasi file manager nya

*QuickLook* support di atas iOS 13, *QuickLook* juga support membaca variasi tipe tipe file, dari gambar seperti JPG dan PNG, docs seperti docx dan pdf, bahkan file seperti Excel juga sama.

berikut gambaran untuk pengembangannya bersama SwiftUI

```swift

class AppQLPreviewController: UIViewController {
    let urlTerpilih: URL
    let urls: [URL]
    
    var qlController: QLPreviewController?
    
    init(selectedURL: URL, urls: [URL]) {
        self.selectedURL = selectedURL
        self.urls = urls
        super.init(nibName: nil, bundle: nil)
    }
    
    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) tidak di-implementasi")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if qlController == nil {
            print("Munculin QLPreviewController")
            qlController = QLPreviewController()
            qlController?.dataSource = self
            qlController?.delegate = self
            qlController?.currentPreviewItemIndex = urls.firstIndex(of: selectedURL) ?? 0
            present(qlController!, animated: true)
        }
    }
}

```

Pertama aku bikin halaman Quick Look-nya dulu, menggunakan `QLPreviewController`, halaman Quick Look tidak hanya membuka satu file, namun beberapa file juga, kadang membuka satu obrolan tapi di dalamnya terlampir gallery foto, Quick Look akan otomatis mengaksesnya menjadi satu, scroll kanan kiri.

Setelah itu aku ingin halaman QuickLook di atas bisa support SwiftUI, sebelumnya kita harus menghubungkan `AppQLPreviewController` dengan SwiftUI, menggunakan `UIViewControllerRepresentable`

```swift
public struct QuickLookPreview: UIViewControllerRepresentable {
    let selectedURL: URL
    let urls: [URL]
    
    public init(selectedURL: URL, urls: [URL]) {
        self.selectedURL = selectedURL
        self.urls = urls
    }
    
    public func makeUIViewController(context: Context) -> UIViewController {
        return AppQLPreviewController(selectedURL: selectedURL, urls: urls)
    }
    
    public func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
        
    }
}

```

QuickLook sifatnya membuka file offline, skenario ku aplikasi memberikan URL untuk membuka akses media atau dokumen tersebut, untuk itu kita harus menyiapkannya dulu dari online dan menyimpannya sementara untuk offline

```swift
private func localPathFor(url: URL) async throws -> URL {
        try? FileManager.default.createDirectory(at: quickLookDir, withIntermediateDirectories: true)
        let path = quickLookDir.appendingPathComponent(url.lastPathComponent)
        
        // Mencoba download file-nya dulu
        let data = try await URLSession.shared.data(from: url)
        try data.write(to: path)
        return path
    }
```

Gambarannya seperti ini, kita bikinin folder khusus dengan menggunakan `FileManager` dan lokasi file-nya, setelah itu download terlebih dahulu

Sekarang kita bukakan aksesnya QuickLook di SwiftUI, dengan memanggilnya di file utama SwiftUI App kita

```swift

@main
struct DokumenApp: App {

    @StateObject private var quickLook = QuickLook()

    var body: some Scene {
        WindowGroup {
            Group {
                NavigationView {
                    ViewPertama().environmentObject(quickLook)
                }
            }
        }
    }
}

```

Sekarang kita panggil QuickLook di SwiftUI-nya, dari yang sudah kita simpan di `environmentObject` sebelumnya

Fungsi `environmentObject`, biasanya di letakkan di induknya, sangat bagus untuk menampung fungsi fungsi, atau struktur yang dipakai untuk bersama sama, seperti API, Auth atau tracking GPS, ini termasuk kebutuhan sehari hari untuk SwiftUI

```swift

public struct ViewPertama: some View {
    
    // Memanggil QuickLook dari Environment
    @EnvironmentObject private var quickLook: QuickLook

    public var body: some View {
        ScrollView {
            VStack {
                // ...
                AvatarView(url: URL(string: url), size: .detail).onTapGesture {
                    await quickLook.prepareFor(urls: [url], selectedUrl: url)
                    print("Tampilan QuickLook muncul")
                }
            }
        }
    }
}

```

Di struktur `ViewPertama`, kita menggunakan Wrapper `@EnvironmentObject` untuk memanggil `QuickLook`-nya, jadi di saat pengguna meng-klik foto profil Avatar-nya tersebut, quickLook yang kita buat tadi mengambil data-nya terlebih dahulu, menyimpannya di File Manager, baru ditampilkan ke halaman berbasis dokumen dari QuickLook

setelah itu aku membuat fungsi `prepareFor(urls: [URL], selectedUrl: URL)` di dalam file `QuickLook` untuk mempersiapkan URL berbasis file dari URL berbasis request data-nya, di sini `tricking` partnya, secara garis besar begini konsepnya QuickLook

Referensi:

[QuickLook Framework](https://developer.apple.com/documentation/quicklook)

[QLPreviewController - QuickLook Docs](https://developer.apple.com/documentation/quicklook/qlpreviewcontroller)

[UIViewControllerRepresentable - SwiftUI Docs](https://developer.apple.com/documentation/swiftui/uiviewcontrollerrepresentable/)

[EnvironmentObject - SwiftUI Docs](https://developer.apple.com/documentation/swiftui/environmentobject)

[FileManager - Foundation Docs](https://developer.apple.com/documentation/foundation/filemanager/)
