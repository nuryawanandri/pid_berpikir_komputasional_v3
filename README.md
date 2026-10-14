# Misi Berpikir Komputasional

Web pembelajaran KKA untuk SMP: satu layar tujuan pembelajaran dan 20 tahap interaktif tentang dekomposisi, pengenalan pola, dan kepedulian lingkungan. Digunakan satu kelas bersama pada Papan Interaktif Digital (PID), sekitar 120 menit.

## Menjalankan

Prasyarat: Node.js 22.12+ atau Node.js 24 dan npm.

```sh
npm install
npm run dev
```

Buka alamat yang ditampilkan (biasanya http://127.0.0.1:5173). Untuk akses PID pada jaringan lokal, jalankan `npm run dev -- --host 0.0.0.0` dan gunakan alamat IP komputer server. Izinkan akses jaringan lokal sesuai pengaturan perangkat.

## Build dan hosting

```sh
npm run build
npm run preview
```

Unggah seluruh isi folder `dist` ke hosting statis HTTPS. Aplikasi memakai jalur aset relatif sehingga dapat ditempatkan pada subfolder. Tidak memerlukan API, database, login, atau konfigurasi rahasia. Jangan membuka `index.html` sumber dengan klik dua kali; gunakan server web. Versi ini tidak menyertakan PWA atau jaminan penggunaan offline. Seluruh ilustrasi dan gaya dibundel tanpa CDN runtime.

## Penggunaan di kelas

- Gunakan layar landscape. Tombol layar penuh tersedia jika browser mendukungnya.
- Murid bergiliran mengamati, memilih, menyeret, dan berdiskusi. Guru memandu diskusi tanpa skor atau batas waktu.
- Kartu dapat diseret; alternatifnya sentuh kartu lalu sentuh tujuan. Keyboard: Tab untuk berpindah dan Enter/Spasi untuk memilih kartu serta tujuan.
- Tombol Lanjut terbuka sesudah aktivitas terpenuhi. Petunjuk di bawah navigasi menjelaskan tindakan yang masih diperlukan.
- Alamat dasar membuka Tujuan Pembelajaran. Tombol Mulai di bawah tiga tujuan membuka cover tanpa menghapus progres. Layar tujuan tidak termasuk hitungan 20 tahap misi.
- Tombol Kembali mempertahankan jawaban. Logo dan Kembali ke Awal membuka layar tujuan; Lanjutkan Misi pada cover membuka tahap terjauh.
- Progres dan catatan hanya disimpan pada browser/perangkat yang sama. Memuat ulang tidak menghapus sesi. Jika penyimpanan diblokir, aplikasi tetap berjalan dan memberi pemberitahuan.
- Reset progres tersedia di header semua halaman. Dialog Batal / Ya, reset progres mengonfirmasi penghapusan jawaban, catatan, dan progres hanya untuk aplikasi ini. Setelah reset, aplikasi kembali ke tujuan pembelajaran. Ulangi Misi di halaman terakhir memakai dialog yang sama. Tombol Escape membatalkan dan mengembalikan fokus ke pemicu.
- Jika reset gagal disimpan oleh browser, sesi aktif tetap direset dan pemberitahuan menjelaskan bahwa progres lama mungkin muncul setelah reload. Data aplikasi lain tidak dihapus.
- Diskusi lisan diterima. Guru menandai diskusi selesai; aplikasi tidak menilai kualitas jawaban terbuka secara otomatis. Catatan refleksi opsional.

Alokasi: tahap 1–6 (20 menit), 7–9 (15 menit), 10–12 (25 menit), 13–16 (30 menit), 17–20 (30 menit). Ini panduan, bukan timer.

## Materi

Definisi dekomposisi dan pengenalan pola diberikan setelah murid melakukan aktivitas. Kelompok kegiatan lingkungan pada tahap 7 bukan klasifikasi resmi Adiwiyata. Semua angka pada tahap 16–17 adalah data simulasi.

Pada permainan sampah, pengelompokan didasarkan pada bahan. Kertas serta tisu selulosa bersih tanpa bahan tambahan/kontaminasi dikelompokkan organik untuk latihan. Hal ini **tidak menentukan wadah atau jalur pengolahan nyata**: kertas bersih dapat dikumpulkan terpisah untuk daur ulang dan tidak semua bahan organik cocok bagi semua komposter. Kemasan multilapis dikelompokkan anorganik; lampu yang dimaksud ialah fluoresen/TL. Baterai dan lampu TL memerlukan penanganan orang dewasa. Warna kategori hanya penanda permainan.

Rujukan B3: [Permen LHK 9/2024](https://jdih.menlhk.go.id/new2/uploads/files/PERMEN%20LHK_9_2024.pdf). Sesuaikan praktik penanganan nyata dengan fasilitas dan pedoman sekolah.

## Route dan struktur

Vue Router menggunakan hash history sehingga reload dan tautan langsung bekerja di hosting statis tanpa fallback server. Contoh: `/#/` (tujuan), `/#/misi/cover`, `/#/misi/dekomposisi`, `/#/misi/refleksi`. Akses ke tahap yang belum terbuka diarahkan ke tahap terjauh yang diizinkan; alamat tidak dikenal menuju tujuan. Tombol Back/Forward browser mengikuti pembatasan yang sama. Format dan kunci progres lama `pid-mission-v1` tetap dipakai.

- `src/router.ts`: konfigurasi route, guard progres, aktivasi tahap setelah navigasi berhasil. URL menentukan halaman aktif; store tidak mengarahkan router melalui watcher.
- `src/useMissionNavigation.ts`: navigasi Lanjut, Kembali, Lanjutkan Misi, dan awal.
- `src/pages/LearningObjectives.vue`: layar tujuan sebelum cover.

- `src/stages/`: 20 komponen tahap; `src/stages.ts`: sumber konfigurasi ID, nama route, slug, pemuatan komponen lazy, judul, fase, petunjuk. Untuk menambah tahap, tambahkan metadata dan komponen di registri ini serta sesuaikan batas progres, validasi penyimpanan, dan pengujian.
- `src/content.ts`: kartu, penjelasan, klasifikasi, dan data simulasi.
- `src/mission.ts`: Pinia, progres, validasi pemulihan, penyimpanan lokal.
- `src/components/`: ilustrasi SVG, maskot, eksplorasi, pilihan, dan papan drag & drop.
- `src/App.vue`: kerangka navigasi; `src/style.css`: Tailwind dan desain responsif.

## Pemeriksaan

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Tes browser menjalankan perjalanan lengkap dengan mouse dan emulasi sentuh, pemeriksaan pemulihan, petunjuk, reset, drag di luar target, keyboard, dan ukuran layar. Bukti screenshot tersedia di `test-results`. Emulasi sentuh tidak menggantikan pengujian pada PID fisik; coba pada perangkat kelas sebelum pembelajaran.
