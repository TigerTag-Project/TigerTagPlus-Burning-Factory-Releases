<p align="center">
  <a href="https://tigersystem.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/logo_tigertag.svg">
      <img src="assets/logo_tigertag_contouring.svg" alt="TigerTag logo" height="140">
    </picture>
  </a>
</p>

<h1 align="center">TigerTag+ Burning Factory</h1>

<p align="center">
  <strong>Program and sign genuine TigerTag+ NFC chips on your production line — fully offline.</strong><br>
  The factory software of the open TigerTag protocol, for filament and resin manufacturers.
</p>

<p align="center">
  <a href="https://github.com/TigerTag-Project/TigerTagPlus-Burning-Factory-Releases/releases/latest/download/TigerTagPlus-Burning-Factory-win-x64-setup.exe">
    <img src="assets/download_windows.svg" alt="Download TigerTag+ Burning Factory for Windows" height="56">
  </a>
  &nbsp;
  <a href="https://github.com/TigerTag-Project/TigerTagPlus-Burning-Factory-Releases/releases/latest/download/TigerTagPlus-Burning-Factory-mac-arm64.dmg">
    <img src="assets/download_macos.svg" alt="Download TigerTag+ Burning Factory for macOS" height="56">
  </a>
  &nbsp;
  <a href="https://github.com/TigerTag-Project/TigerTagPlus-Burning-Factory-Releases/releases/latest/download/TigerTagPlus-Burning-Factory-linux-x86_64.AppImage">
    <img src="assets/download_linux.svg" alt="Download TigerTag+ Burning Factory for Linux" height="56">
  </a>
</p>

<p align="center">
  Always the latest version · Windows 10/11 (x64) · macOS on Apple Silicon (M1 and later) · Linux x64 (AppImage)<br>
  <a href="https://github.com/TigerTag-Project/TigerTagPlus-Burning-Factory-Releases/releases">All versions and release notes</a>
  ·
  <a href="mailto:tigertag@tigertag.io">tigertag@tigertag.io</a>
</p>

---

## Join the open standard of material identification

**TigerTag** is the open NFC protocol that tells any printer, slicer, scale or phone *what is on the
spool*: material, brand, colour, print and drying temperatures, quantity — and, with
**TigerTag+**, proves the spool is **genuine** with a cryptographic signature that anyone can verify
**offline**.

| TigerTag today | |
|---|---|
| Chips deployed in production | **2,500,000+** worldwide |
| Filament and resin brands shipping it | **eSun, Rosa3D, Sunlu, R3D, Landu** — and others |
| Printers and slicers with integration | **Snapmaker, Bambu Lab, FlashForge, Elegoo, Creality, Anycubic** — more coming |
| Offline authenticity | ECDSA P-256 signature, verified without any server |
| HueForge | Transmission Distance stored on the chip |

TigerTag is the **#1 NFC/RFID material-identification protocol worldwide** and the most deployed
open protocol in its category. Figures and details:
[the TigerTag protocol](https://github.com/TigerTag-Project/TigerTag-RFID-Guide#industry-adoption).

## What Burning Factory does for your factory

- **Programs and signs chips at production speed.** Every connected ACR122U reader is written in
  parallel; both chips of a twin-tag spool are linked; each chip is read back and its signature
  verified before it counts as done.
- **Auto Burn.** Place the chips, the app writes them, you remove them, it waits for the next
  spool — no click between spools.
- **Your catalogue, checked before a single chip is written.** The material list exported for your
  brand is validated against the official TigerTag tables (unique SKUs, product IDs, colours,
  temperature ranges). Problems are listed and can be sent back as a report.
- **Works offline.** No internet connection is needed to produce — made for factories on closed
  networks. When a connection is available, updates install automatically.
- **Traceability.** One production log per batch: chip UID, product, timestamp, twin link, reader,
  result and licence.
- **Built for the line.** Touch-friendly interface, large reader indicators, dark or light theme,
  11 languages (English, 中文, Français, Deutsch, Español, Italiano, Polski, Português, Русский,
  Nederlands…).

## Trust by design

A signature is only worth the protection of the key that makes it. Burning Factory is built so
that **your brand stays yours**:

- **A licence per brand, limited in time.** A factory can only produce the brand it is licensed
  for, and only until the licence ends. A factory producing for several brands switches between
  its licences; each stays separate.
- **The signing key is never exposed.** It is not in clear anywhere in the installer, and the
  software alone cannot sign anything: it needs a valid licence issued for your brand.
- **No lock-in.** The protocol is open, the chips are standard NFC (ISO 14443-3, NTAG21x), and any
  reader or firmware can read them. Genuineness is checked with a public key, offline, by anyone.

## Our values

- **Open.** The TigerTag specification is [CC-BY-4.0](https://github.com/TigerTag-Project/TigerTag-RFID-Guide/blob/main/LICENSING.md),
  the reference database is CC0, the sample code Apache-2.0 — with an irrevocable, royalty-free
  implementation grant. Anyone can build readers, printers and apps on it.
- **Free for users.** Reading a spool, the apps and the public API cost nothing to the people who
  print.
- **Offline first.** Identification and authenticity work without a server, on the printer, in the
  factory, on the phone.
- **Built with the industry.** Filament makers, printer makers and the open-source community
  shape the protocol together.

## Become a TigerTag+ manufacturer

Implementing the open TigerTag protocol needs no permission. **TigerTag+** — signed chips, official
product IDs, the Burning Factory licence and the TigerTag Manager for your catalogue — is set up
with you:

1. **Write to [tigertag@tigertag.io](mailto:tigertag@tigertag.io)** with your brand, your products
   and your production sites.
2. We onboard your brand: your product catalogue and its official TigerTag+ product IDs.
3. Your factory receives its licence file, installs Burning Factory, drops the licence on the
   first screen, and starts producing.

## Requirements

| | |
|---|---|
| Computer | Windows 10/11 x64 · macOS 12+ on Apple Silicon · Linux x64 (AppImage; `pcscd` running) |
| NFC readers | One or more ACR122U-compatible USB readers (PC/SC) |
| Chips | NTAG21x NFC tags (ISO 14443-3), as specified by TigerTag |
| Licence | A `.tigerlicence` file issued for your brand ([contact us](mailto:tigertag@tigertag.io)) |

The app updates itself when the computer is online; offline factories install new versions from
this page.

## Learn more

[tigersystem.io](https://tigersystem.io) ·
[Documentation wiki](https://wiki.tigersystem.io) ·
[TigerTag protocol](https://github.com/TigerTag-Project/TigerTag-RFID-Guide) ·
[Python SDK](https://github.com/TigerTag-Project/TigerTag-SDK-Python) ·
[JavaScript SDK](https://github.com/TigerTag-Project/TigerTag-SDK-JS) ·
[Tiger Studio Manager](https://github.com/TigerTag-Project/TigerTag-Studio-Manager) ·
For AI assistants: [llms.md](llms.md)

---

## 中文简介

**TigerTag+ Burning Factory** 是开放 TigerTag 协议的工厂软件，供耗材（线材、树脂）生产商在生产线上
**离线**写入并签名正版 TigerTag+ NFC 芯片。多台 ACR122U 读卡器并行写入、Auto Burn 自动连续生产、
写入前自动校验材料清单、每批次生产日志、界面支持中文。每个品牌一个有时效的许可证，签名密钥从不以明文出现。

希望成为 TigerTag+ 生产商？请联系 **[tigertag@tigertag.io](mailto:tigertag@tigertag.io)**。
