---
title: Coba ChatGPT API dalam Swift
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-03-16
scheduled: 2023-03-16
draft: true
tags:
  - learns
layout: layouts/post.njk
---

Aku mencoba ChatGPT API, sejak perusahaan OpenAI merilis API-nya bulan lalu.

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

Aku coba implementasika ke View SwiftUI, kita buat halaman Chat di aplikasinya, kalau bisa mirip semirip WA, biar dapat intimasi chat sama seseorang

```swift



```

Sekarang kita butuh ViewModel, menggunakan ObservableObject



