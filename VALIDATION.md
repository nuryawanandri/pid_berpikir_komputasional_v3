# Hasil validasi

Tanggal: 13 Oktober 2026 (Asia/Jakarta).

- `npm run build`: PASS. Pemeriksaan tipe Vue/TypeScript dan build Vite selesai; artefak produksi tersedia di `dist/`.
- `npm test`: PASS, 6 tes. Cakupan: pembukaan navigasi, penyimpanan/pemulihan, data rusak, kembali ke cover dibanding reset, penyimpanan diblokir, dan 15 objek sampah.
- `npm run test:e2e`: PASS, 7 tes lulus; 1 dilewati karena pengujian khusus touch tidak dijalankan pada proyek desktop.
- Instalasi terakhir melaporkan 0 kerentanan dependensi.

## Bukti browser

- Perjalanan lengkap 1–20 dijalankan melalui mouse dan emulasi sentuh Chromium, termasuk feedback setelah dua percobaan, pemulihan setelah reload, konfirmasi reset, dan kembali ke cover. Tidak ditemukan kesalahan JavaScript pada kedua perjalanan.
- Drag mouse dan drag sentuh yang diemulasikan berhasil; pelepasan di luar target mempertahankan kartu. Pembatalan sentuh tidak menghapus kartu.
- Pemilihan kartu dan tujuan melalui keyboard berhasil.
- Seluruh 20 tahap diperiksa pada lebar 1920 dan 390 piksel; tidak ditemukan luapan horizontal dokumen.
- Aktivitas pengelompokan juga diperiksa pada 1366×768 serta 768×1024. Screenshot representatif diperiksa secara visual untuk cover, pengelompokan, dan dekomposisi.
- Screenshot tersimpan di `test-results/`; folder ini diabaikan Git dan akan diganti ketika tes browser diulang.

## Batas verifikasi

Pengujian dilakukan di Chromium dengan emulasi input sentuh, bukan PID fisik. Halaman dengan isi panjang menggunakan gulir vertikal; navigasi tidak dipotong. Aplikasi belum dipublikasikan dan tidak menjamin penggunaan offline.

Pada lingkungan sandbox Windows ini, resolusi path Node dan akses registri npm membutuhkan izin eksekusi di luar sandbox. Build dan tes di atas berhasil dijalankan setelah akses tersebut diberikan.
