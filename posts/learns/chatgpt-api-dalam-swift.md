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


public func request(_ chat: ChatRequest) async throws -> ChatResponse {
  do {
    let jsonData = try encoder.encode(chat.request)
    var request = URLRequest(url: endpoint)
    request.httpMethod = "POST"
    request.setValue("Bearer API_KEY_HERE", forHTTPHeaderField: "Authorization-Type")
    
  }
}

```

Aku coba implementasika ke View SwiftUI, kita buat halaman Chat di aplikasinya, kalau bisa mirip semirip WA, biar dapat intimasi chat sama seseorang

```swift



```

Sekarang kita butuh ViewModel, menggunakan ObservableObject

