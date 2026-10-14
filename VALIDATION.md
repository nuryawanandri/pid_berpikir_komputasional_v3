# Hasil validasi

Tanggal: 14 Oktober 2026 (Asia/Jakarta).

- `npm run build`: PASS. Pemeriksaan tipe Vue/TypeScript dan build Vite selesai; artefak produksi tersedia di `dist/`.
- `npm test`: PASS, 9 tes. Cakupan: pemisahan pembukaan dan aktivasi tahap, penyimpanan/pemulihan, data rusak, kembali ke cover dibanding reset, penyimpanan diblokir, 15 objek sampah, serta reset yang mempertahankan data aplikasi lain.
- `npm run test:e2e`: PASS, 17 tes lulus; 1 dilewati karena pengujian khusus touch tidak dijalankan pada proyek desktop.
- Instalasi terakhir melaporkan 0 kerentanan dependensi.

## Bukti browser

- Layar tujuan memuat ketiga teks yang diminta, tanpa indikator progres. Tombol Mulai membuka cover dan tidak menghapus progres versi lama. Screenshot 1366×768 memperlihatkan seluruh tujuan dan tombol Mulai dalam viewport; tampilan ponsel 390 piksel juga diperiksa secara visual.
- Tiap tahap memiliki route hash bernama dan komponen lazy-loaded. Reload, Back/Forward browser, tautan langsung, pengalihan tahap terkunci, alamat tidak dikenal, serta Lanjutkan Misi diuji dengan progres tersimpan sebelumnya.
- Reset melalui header diuji pada layar awal, tengah, dan akhir: Batal dan Escape mempertahankan data/route serta mengembalikan fokus; konfirmasi menghapus jawaban/catatan/progres dan kembali ke tujuan. Hasil kosong tetap terbaca setelah reload. Data aplikasi lain tetap utuh dan route tahap terkunci tidak dapat dibuka kembali lewat riwayat.
- Kegagalan penyimpanan ketika reset diuji: sesi aktif kembali kosong, pemberitahuan kegagalan muncul, dan tahap lanjutan tetap terkunci pada sesi tersebut.

- Perjalanan lengkap 1–20 dijalankan melalui mouse dan emulasi sentuh Chromium, termasuk feedback setelah dua percobaan, pemulihan setelah reload, konfirmasi reset, dan kembali ke cover. Tidak ditemukan kesalahan JavaScript pada kedua perjalanan.
- Drag mouse dan drag sentuh yang diemulasikan berhasil; pelepasan di luar target mempertahankan kartu. Pembatalan sentuh tidak menghapus kartu.
- Pemilihan kartu dan tujuan melalui keyboard berhasil.
- Seluruh 20 tahap diperiksa pada lebar 1920 dan 390 piksel; tidak ditemukan luapan horizontal dokumen.
- Aktivitas pengelompokan juga diperiksa pada 1366×768 serta 768×1024. Screenshot representatif diperiksa secara visual untuk cover, pengelompokan, dan dekomposisi.
- Screenshot tersimpan di `test-results/`; folder ini diabaikan Git dan akan diganti ketika tes browser diulang.

## Batas verifikasi

Pengujian dilakukan di Chromium dengan emulasi input sentuh, bukan PID fisik. Halaman dengan isi panjang menggunakan gulir vertikal; navigasi tidak dipotong. Aplikasi belum dipublikasikan dan tidak menjamin penggunaan offline.

Pada lingkungan sandbox Windows ini, resolusi path Node dan akses registri npm membutuhkan izin eksekusi di luar sandbox. Build dan tes di atas berhasil dijalankan setelah akses tersebut diberikan.
