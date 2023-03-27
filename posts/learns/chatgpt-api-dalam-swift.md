---
title: Coba Bangun ChatGPT API dalam SwiftUI
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-02-28
scheduled: 2023-02-28
tags:
  - learns
layout: layouts/post.njk
---

*Halaman ini masih tulisan ecek ecek-an, corat coret aja, men-eksplor sendiri, masih beta, draft*

Aku mencoba ChatGPT API, sejak perusahaan OpenAI merilis API-nya bulan lalu.

## Request API

```swift

private let endpoint: URL = .init(string: "https://api.openai.com/v1/chat/completions/")


public func request(_ chatRequest: ChatRequest) async throws -> ChatResponse {
  do {
    let jsonData = try encoder.encode(chatRequest)
    var request = URLRequest(url: endpoint)
    request.httpMethod = "POST"
    request.setValue("Bearer OPENAI_API_KEY_HERE", forHTTPHeaderField: "Authorization-Type")
    request.httpBody = jsonData
    let (result, _) = try await URLSession.shared.data(for: request)
    let response = try decoder.decode(Response.self, from: result)
    return response
  } catch {
    throw error
  }
}

```

Sesuai dengan parameter request ChatGPT, masukkan model yang digunakan, menjelaskan sifat asisten AI kita, hingga input chat

```swift

public struct ChatRequest: Encodable {
  public struct Message: Encodable {
    public let role = "user"
    public let content: String
  }

  let model = "gpt-3.5-turbo"
  let messages: [Message]

  let temperature: CGFloat

  public init(content: String, temperature: CGFloat) {
    messages = [.init(content: content)]
    self.temperature = temperature
  }
}

```

Untuk output responnya

```swift

public struct Response: Decodable {
  public struct Choice: Decodable {
    public struct Message: Decodable {
      public let role: String
      public let content: String
    }
  }

  public let choices: [Choice]

  public var trimmedText: String {
    guard var text = choices.first?.message?.content else {
      return ""
    }
    while text.first?.isNewline == true || text.first?.isWhitespace == true {
      text.removeFirst()
    }
    return text
  }
}

```

Ini respon aku ikuti dari panduan OpenAI, di situ ternyata hasilnya kasih pilihan jawaban, kita ambil yang pertama saja, untuk tampilkan balasan chat-nya

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
            await viewModel.postMessage()
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

        let textInput = OpenAIClient.Request(prompt: newMessageText)
        let response = try await client.request(.generate(input: newMessageText))
        let dataMessage = Message(id: "\(Int32.random(in: Int32.min...Int.max))", content: response.trimmedText)
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

Kalau dilihat secara sekilas, memang agak berantakan SwiftUI, tapi setidaknya aku bisa menampilkan seluruh data property dari model Message, yang ku buat khusus untuk mengirim request dan menerima respon dari ChatGPT API

ku coba tambah di bawah konten pesannya, waktu pesan masuk dan double `checkmark` berwarna biru, seperti di WA


