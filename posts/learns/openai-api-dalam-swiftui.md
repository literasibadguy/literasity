---
title: Bangun App Chat AI dengan SwiftUI dan OpenAI API
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-03-25
scheduled: 2023-03-25
tags:
  - learns
layout: layouts/post.njk
---

*Halaman ini masih tulisan ecek ecek-an, corat coret aja, men-eksplor sendiri, masih beta, draft*

Aku mencoba OpenAI API, untuk bagian Text Completions-nya, untuk memanipulasi dan generate text. Fitur ini yang biasa dipakai orang untuk membuat artikel, tulisan novel, tagline bahkan lirik lagu rap.

Di sini aku ingin coba membuat AI sebagai teman chatku, mungkin pacar.

Kita mulai dengan induk untuk koneksi request ke OpenAI API-nya, dengan membuat file `OpenAIClient.swift`

Di layanan OpenAI, juga ada layanan *Chat Completions*, itu memang diperuntukkan sebagai media chatting, untuk pembelajaran selanjutnya.

## Request API

```swift

public struct OpenAIClient {

  private let endpoint: URL = .init(string: "https://api.openai.com/v1/completions/")

  public func request(_ prompt: Prompt) async throws -> Response {
        do {
            let jsonData = try encoder.encode(prompt.request)
            var request = URLRequest(url: endpoint)
            request.httpMethod = "POST"
            request.setValue(authorizationHeaderValue, forHTTPHeaderField: "Authorization")
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = jsonData
            let (result, _) = try await URLSession.shared.data(for: request)
            let response = try decoder.decode(Response.self, from: result)
            return response
        } catch {
            throw error
        }
    }
}

```

Sesuai dengan parameter request API, masukkan model yang digunakan, menjelaskan sifat asisten AI kita, hingga input chat

```swift

public struct Request: Encodable {
        let model = "text-davinci-003"
        let topP: Int = 1
        let frequencyPenalty: Int = 0
        let presencePenalty: Double = 0.6
        let prompt: String
        let temperature: Double
        let maxTokens: Int
        let stop: Array = ["Human:", " AI Assistant:"]

        
        public init(prompt: String, temperature: Double, maxTokens: Int ) {
            self.prompt = prompt
            self.temperature = temperature
            self.maxTokens = maxTokens
        }
  }

```

Untuk output responnya

```swift

 public struct Response: Decodable {
        public struct Choice: Decodable {
            public let text: String
        }
        public let id: String
        public let object: String
        public let model: String
        public let choices: [Choice]
        
        public var trimmedText: String {
            guard var text = choices.first?.text else {
                return ""
            }
            while text.first?.isNewline == true || text.first?.isWhitespace == true {
                text.removeFirst()
            }
            
            initialPrompt += "\n\(text)"
            
            if let range = text.range(of: "AI Assistant:") {
               text.removeSubrange(range)
            } else if let aiRange = text.range(of: "AI:") {
                text.removeSubrange(aiRange)
            }
            
            print(initialPrompt)
            
            return text
        }
    }

```

Ini respon aku ikuti dari panduan OpenAI, responnya ternyata memberi berbagai pilihan `choices`, aku ambil hasil yang pertama saja, untuk tampilkan balasan chat-nya. Untuk di bagian `trimmedText`, coba modifikasi hasilnya, biar outputnya mengeluarkan hasil balasan dari AI-nya, terus digabungkan dengan inisial Prompt yang di atas

Jadi untuk Chat selanjutnya, biar nyambung obrolannya.

Di dalam Text Completions, kita butuh Prompt dulu sebelum generating textnya, karena ini kasus contoh aku buatkan aplikasi chatting, aku umpamakan AI Asistant nya simulasikan jadi pacarku

```swift

var initialPrompt = "The following is a conversation with an AI assistant. The assistant is pretending being my girlfriend, sometimes jealous, aesthetic mind, friendly, charming and can speak Indonesian."

```

Sekarang aku tulis parameter input request Promptnya digabungkan dengan inisial di atas

```swift
public enum Prompt {
    case generate(input: String)
        
    var request: Request {
        switch self {
            case let .generate(input):
                initialPrompt += "\nHuman: \(input)"
                print(initialPrompt)
                
                return Request(prompt: initialPrompt, temperature: 1.2, maxTokens: 80)
            }
    }
  }
```

## ObrolanDetailView

Aku coba implementasika ke View SwiftUI, kita buat halaman Chat di aplikasinya, kalau bisa mirip semirip WA, biar dapat intimasi chat sama seseorang

```swift

public struct ObrolanDetailView: View {

  @StateObject private var viewModel: ObrolanViewModel

  public var body: some View {
    ScrollViewReader { proxy in
      ScrollView {
        LazyVStack {
          ForEach(viewModel.messages) { message in
              ObrolanItemView(message: message).padding(.vertical)
          }
          bottomAnchorView
        }.padding(.horizontal)
      }.safeAreaInset(edge: .bottom) {
        inputTextview.overlay(Rectangle()).strokeBorder(Color("BorderInputColor"), lineWidth: 1)).background(Color("BackgroundInputColor"))
      }
    }
  }
}

```

Aku pisahkan Input Text View nya di bawah


```swift

private var inputTextView: some View {
  return VStack {
    HStack(alignment: .bottom, spacing: 8) {
        TextField("New Massage", text: $viewModel.newMessageText, axis: .vertical)
          // Konfigurasi Text Field
        Button() {
          Task {
            await viewModel.kirimPesan()
          }
        } label: {
          if viewModel.isSendingMessage {
            Progressview()
          } else {
            Image(systemName: "paperplane")
          }
        }
    }
  }
}

```

Beberapa susunan penting di ObrolanDetailView.swift

* View Model: Aku buat ChatViewModel, untuk memanggil request API ke ChatViewModel dan memanggil data existing, seperti profil obrolan dan konfigurasi parameter API

* Di bagian dalam *body*: Ada ChatMessageview, itu View untuk pemampilan Item Chat

* Untuk input chat: aku tulis pisah inputTextView, disusun horizontal HStack, berisi TextField dan tombol kirim

## ObrolanViewModel

Sekarang kita butuh ViewModel, menggunakan ObservableObject

```swift

@MainActor
class ObrolanViewModel: ObservableObject {

  @Published var isSendingMessage: Bool = false
  @Published var newMessageText: String = ""

  @Published var chatName: String = ""

  public func requestOpenAI() async {
      guard let conversationId = conversation.id else { return }
      do {
        let client = OpenAIClient()

        let response = try await client.request(.generate(input: newMessageText))
        let dataMessage = Message(id: "\(Int32.random(in: Int32.min...Int.max))", content: response.trimmedText)
        appendNewMessage(message: dataMessage)
        withAnimation {
          newMesageText = ""
          isSendingMessage = false
        }
      } catch {
        print("something error")
        withAnimation {
          newMessageText = ""
          isSendingMessage = false
        }
      }
  }
}

```

Sekarang kita tambah fungsi baru untuk *mengirimPesan* untuk isi trigger tombol kirim

```swift

 func kirimPesan() async {
        guard let appDatabase else { return }
        let dataMessage = Message(id: "\(Int32.random(in: Int32.min...Int32.max))", content: newMessageText, isOwnMessage: true)
        appendNewMessage(message: dataMessage)
        withAnimation {
            newMessageText = ""
            isSendingMessage = true
        }
        await runOpenAI(database: appDatabase)
}


private func appendNewMessage(message: Message) {
        if !messages.contains(where: { $0.id == message.id }) {
            messages.append(message)
        }
    }

```

Biar data input dan output sinkron nya sama, ini yang ku tahu dari pelajaran ObservableObject,

Kita pasang newMessageText di ViewModel untuk membaca data dari input yang terdapat di `inputTextView`, ada tanda dollar depannya `$viewModel.newMessageText` , itu tandanya data nya bakal live diperhatikan, ya itu bahasa yang bisa ku sampaikan untuk sementara


{% image "./img/remote/swiftui-chatgpt1.jpeg", "Screenshot our ChatGPT SwiftUI" %}

## Obrolan Replika Ala WhatsApp

Kalau secara keseluruhan, SwiftUI membuatku hampir berhasil mereplika tampilan WhatsApp, ku tambah beberapa Toolbar telfon dan video call icon di samping kanan

Bubble obrolannya, ku coba samakan warnanya, sesuaikan dengarn Dark Mode

Jadi untuk Bubble Obrolannya di ObrolanItemView.swift

```swift

public struct ObrolanItemView: View {

  public var body: some View {
      HStack(alignment: .bottom) {
                VStack(alignment: .leading, spacing: message.isOwnMessage ? -4 : 0) {
                    Text(message.content).font(.body).foregroundColor(.adaptiveText).padding(10)
                    HStack(alignment: .center) {
                        Spacer()
                        HStack(spacing: 1) {
                            Text("12:45 PM").font(.system(size: 12)) + Text("")
                            if message.isOwnMessage {
                                HStack(spacing: -8) {
                                        Image(systemName: "checkmark")
                                        .fontWeight(.bold)
                                        .foregroundColor(Color.blue)
                                        .frame(maxHeight: 5)
                                        Image(systemName: "checkmark").fontWeight(.bold).foregroundColor(Color.blue).frame(maxHeight: 5)
                                }
                            }
                        }.font(.system(size: 11))
                        .foregroundColor(.gray)
                        .padding([.trailing, .bottom], 10)
                       
                    }
                }.background(message.isOwnMessage ? Color("BackGreenColor") : Color("BackgroundTextColor"), in: RoundedRectangle(cornerRadius: 12)).padding(.leading, message.isOwnMessage ? 100 : 0).padding(.trailing, message.isOwnMessage ? 0 : 81).font(.subheadline)
                
                Spacer()
            }
    }
}

```

Kalau dilihat sekilas, memang agak berantakan SwiftUI, tapi setidaknya aku bisa menampilkan seluruh data property dari model Message, yang ku buat khusus untuk mengirim request dan menerima respon dari ChatGPT API

ku coba tambah di bawah konten pesannya, waktu pesan masuk dan double `checkmark` berwarna biru, seperti di WA

## Referensi

* [Text Completions OpenAI API](https://platform.openai.com/docs/guides/completion)

* [OpenAI API References](https://platform.openai.com/docs/api-reference/completions)

* [ObservableObject Apple Developer Docs](https://developer.apple.com/documentation/combine/observableobject)

* [@Published Apple Developer Docs](https://developer.apple.com/documentation/combine/published)