---
title: Tampilin Data di Live Activity iOS 16 dan Dynamic Island
description: Di sini aku akan men-eksplor pengembangan app dengan SwiftUI
date: 2023-05-11
scheduled: 2023-05-11
draft: true
tags:
  - learns
layout: layouts/post.njk
---


Dear Friends

Hari ini aku coba eksplorasi salah satu fitur iOS 16, Live Activity, tampilan data yang biasa kamu lihat beberapa di halaman lock screen dan fitur Dynamic Island di iPhone 14 Pro

Kita akan menggunakan fitur extension WidgetKit di pengembangannya, namun sebelumnya kenapa fitur ini salah satu masa depan iOS ke depan

Pertama, isunya seluruh jajaran iPhone 15 akan dilengkapi dengan Dynamic Island, yang sebelumnya hanya untuk iPhone 14 Pro, selain itu iPhone 15 juga dikabari memiliki fitur sama di Apple Watch, Always-On Display

Karena ini hanya berlaku untuk iOS 16 ke atas, aku melihat penulisan bahasa Swift nya persis dengan pengembangan SwiftUI


```swift

import ActivityKit
import WidgetKit
import SwiftUI



struct PacarTrackerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: )
    }

}


```