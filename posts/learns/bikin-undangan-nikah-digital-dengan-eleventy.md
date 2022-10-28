---
title: Bikin undangan nikah digital dengan Eleventy
description: Biar sedikit spesial kasih nama tamu dalam undangannya.
date: 2022-10-28
scheduled: 2022-10-28
tags:
  - learns
layout: layouts/post.njk
---

*Sebelumnya aku menulis tutorial ini dalam Inggris, di <a href="https://www.linkedin.com/pulse/generate-wedding-invitations-website-special-guests-firas-rafislam/?trackingId=EyCtT5nMQ%2Fa%2FlWkS5IPdDA%3D%3D" target="_blank">profil LinkedIn</a>, kali ini edisi bahasa Indonesia-nya.*

Banyak resep cara membuat website undangan nikahan, untuk resepku menggunakan static site generator dari Eleventy, sebelumnya aku membuat tutorial perkenalan bersama Eleventy.

Sekarang aku ingin menimplementasikan dengan membuat undangan nikahan, dari desain layoutnya menggunakan template nunjucks, mengenerate data para hadirin undangan dengan modal data JSON dan menjadi link spesial untuk dibagikan kepada tamu.

Apa tahapannya di sini

1. Siapkan dulu proyek kosongan Eleventy
2. Kita bikin json file untuk data tamu undangan nya
3. Tulis kode modul Javascript untuk mengolah objek tamu undangan nya
4. Tambah modul koleksi tersebut di konfigurasi `.eleventy.js`
4. Desain layout template undangan nya dengan bahasa Nunjucks
5. Percobaan dan pengembangan lebih lanjut.

Kita skip aja langsung menyiapin daftar tamu undangannya dulu

## Bikin Data Tamu Undangan

Jadi di Eleventy, ada fitur nama-nya global data files, kita bisa langsung memanggil data tersebut untuk mengisi statik konten website kita.

Anggap saja lokasi global data files kamu berada di folder `_data`.

Tinggal kamu buat file baru misalnya `invitations.json` dalamnnya.

```json 
{
    "prince-seinfeld": {

        "guestName": "Prince Seinfeld"

    },

    "prince-george": {

        "guestName": "Prince George"

    },

    "prince-kramer": {

        "guestName": "Prince Kramer"

    }
}
```

## Kode Untuk koleksi data tamu-nya

Sebelum kita tampilin data tamu para undangan kita dari JSON, kita olah data tersebut dulu, menyesuaikan struktur data nya dalam object keys, jadi saat dipanggil di template, kita bisa tahu struktur nya clear.

```javascript
const path = require('path')

const invitationData = require('../_data/invitationData.json');

module.exports = () => {

    const invitations = {};

    const keys = Object.keys(invitationData);

    for (const key of keys) {

        const inviteData = invitationData[key];
        const href = path.join('/', 'wedding', key, '/');
        const title = `The Wedding of Beauty and Bad Guy`;
        const description = `Greetings to: ${inviteData.guestName}`;

        const invitation = {
            ...inviteData,
            data: {
                guestName: inviteData.guestName,
            },
            description,
            href,
            title,
            elements: [],
            image: '/images/feeds/padang-castle.JPG',
            key,
            url: href,
        }
        invitations[key] = invitation;
    }
    return invitations;
}
```

## Tambah di Eleventy Config

Setelah kita olah objek koleksi tamu undangan nya, saatnya kita tambah di konfigurasi `.eleventy.js` nya

```javascript

const guestList = require("./src/_collections/invitations");

module.exports = function(eleventyConfig) {

    // Add collection guest list

     eleventyConfig.addCollection('invitations', guestList);
     
    
}
```

## Bikin layout template undangannya

Giliran membuat layout template-nya, untuk men-generate undangan tersebut, template undangan kita perlu tahu, data koleksi tamu undangan nya dari mana, untuk mendesain template selalu ada inisial data yang mesti kita declare dulu, ini disebut Front Matter Data.

lihat bagian `pagination`, kita tulis di bagian *data* `collections.invitations` dan gunakan `addAllPagesToCollections` menjadi `true`

Jadi template kita akan membuat setiap halaman untuk para tamu dalam koleksi tersebut.

{% raw %}
```yaml
--
layout: layouts/base.njk
title: The Weeding of Beauty and the Bad Guy
thumbnail: 'beautycouple.jpg'
alt: Picture of The Weeding of Beauty and the Bad Guy
permalink: /{{ paged.url }}index.html
renderData:
    title: "{{ paged.title }}"
    description: "{{ paged.description }}"
pagination:
  data: collections.invitations
  size: 1
  alias: paged
  resolve: values
  addAllPagesToCollections: true
----
```
{% endraw %}

Biar kelihatan spesial, kita selipkan `guestName` dari file json tadi dalam template tersebut.

{% raw %}
```html
<div class="invite-center" id="weeding-headline">
        <h2>You are invited!</h2>

        <h2>The Wedding of</h2>

        <h2>To:</h2>

        <h2 class="guest-name">{{ paged.data.guestName }}</h2>
</div>
```
{% endraw %}

## Mari kita coba undangannya

Kayaknya sudah lengkap ni, mari kita coba generate Eleventy nya. Jadi selama proses eleventynya berjalan, kamu bisa melihat di log-nya, masing masing tamu dapat satu halaman HTML.

```bash

$ eleventy --serve
[11ty] Writing dist/wedding/prince-seinfeld/index.html from ./src/site/content/invitation/index.njk
[11ty] Writing dist/wedding/prince-george/index.html from ./src/site/content/invitation/index.njk
[11ty] Writing dist/wedding/prince-kramer/index.html from ./src/site/content/invitation/index.njk
...

[11ty] Watching…
[Browsersync] Access URLs:
 ----------------------------------
    Local: http://localhost:8081
 External: http://192.168.1.13:8081
 ----------------------------------
[Browsersync] Serving files from: dist

```

Tinggal kamu coba di browser favorit kamu, di case ini berarti format linknya seperti ini http://localhost:8081/wedding/prince-seinfeld/

<img src="/img/remote/screenshot-prince-wedding.png" alt="Gambaran undangan digital nikah dicoba" />

Jadi sudah kelihatan ya, nama undangan tertera di halaman dan menggunakan link atas nama tamu-nya. Ini bisa kamu ekspansikan entah itu menambah catatan khusus atau foto yang ingin kamu share ke beberapa tamu paling dekat. Kamu bisa tanya tanya atau coba sendiri dengan [Eleventy.](https://11ty.dev)

Catatan:

- [Global Data Files](https://www.11ty.dev/docs/data-global/) dalam Eleventy
- [Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/) referensi untuk menyiapkan data template



