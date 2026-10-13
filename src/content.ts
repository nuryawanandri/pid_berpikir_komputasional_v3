export interface Card {
  id: string;
  label: string;
  icon: string;
  detail?: string;
  target?: string;
}
export const goals: Card[] = [
  {
    id: "pahami",
    icon: "◎",
    label: "Pahami",
    detail:
      "Memahami berpikir komputasional sebagai cara mencari solusi secara sistematis.",
  },
  {
    id: "pecahkan",
    icon: "▦",
    label: "Pecahkan",
    detail:
      "Menggunakan dekomposisi untuk memecah masalah besar menjadi bagian kecil.",
  },
  {
    id: "temukan",
    icon: "⌕",
    label: "Temukan",
    detail:
      "Menemukan pola dari kesamaan, perbedaan, atau keteraturan informasi.",
  },
  {
    id: "terapkan",
    icon: "♧",
    label: "Terapkan",
    detail: "Menggunakan kedua konsep untuk menyelesaikan masalah lingkungan.",
  },
];
export const observations: Card[] = [
  {
    id: "lampu",
    icon: "💡",
    label: "Ruangan kosong",
    detail: "Lampu masih menyala di ruangan yang kosong.",
  },
  {
    id: "air",
    icon: "💧",
    label: "Keran air",
    detail: "Keran terbuka meskipun tidak sedang digunakan.",
  },
  {
    id: "sampah",
    icon: "🥤",
    label: "Halaman sekolah",
    detail: "Sampah berserakan setelah jam istirahat.",
  },
  {
    id: "campur",
    icon: "🗑️",
    label: "Tempat sampah",
    detail: "Sisa makanan dan kemasan plastik tercampur.",
  },
  {
    id: "tanaman",
    icon: "🌱",
    label: "Taman sekolah",
    detail: "Beberapa tanaman layu dan tanahnya kering.",
  },
  {
    id: "kertas",
    icon: "📄",
    label: "Meja kelas",
    detail: "Kertas yang baru dipakai satu sisi sudah dibuang.",
  },
];
export const daily: Card[] = [
  {
    id: "tas",
    icon: "🎒",
    label: "Menyiapkan tas",
    detail:
      "Periksa jadwal, tentukan perlengkapan, lalu masukkan barang yang dibutuhkan.",
  },
  {
    id: "kamar",
    icon: "🧹",
    label: "Membersihkan kamar",
    detail:
      "Pisahkan pekerjaan: rapikan buku, simpan pakaian, dan bersihkan lantai.",
  },
  {
    id: "makan",
    icon: "🥗",
    label: "Membuat makanan",
    detail: "Siapkan bahan dan ikuti langkah agar makanan siap disajikan.",
  },
  {
    id: "jadwal",
    icon: "🗓️",
    label: "Mengatur jadwal",
    detail:
      "Kenali kegiatan yang berulang dan atur waktu untuk setiap kegiatan.",
  },
];
export const themes = [
  "Energi",
  "Air",
  "Sampah",
  "Tanaman",
  "Kertas",
  "Kebersihan",
];
export const environment: Card[] = [
  {
    id: "e1",
    icon: "💡",
    label: "Mematikan lampu",
    target: "Energi",
    detail: "Mematikan lampu yang tidak digunakan menghemat energi.",
  },
  {
    id: "e2",
    icon: "🚰",
    label: "Menutup keran",
    target: "Air",
    detail: "Menutup keran mengurangi air yang terbuang.",
  },
  {
    id: "e3",
    icon: "♻️",
    label: "Memilah sampah",
    target: "Sampah",
    detail: "Pemilahan membantu menentukan penanganan sampah.",
  },
  {
    id: "e4",
    icon: "🌿",
    label: "Merawat tanaman",
    target: "Tanaman",
    detail: "Tanaman perlu air dan perawatan yang sesuai.",
  },
  {
    id: "e5",
    icon: "📃",
    label: "Memakai kedua sisi kertas",
    target: "Kertas",
    detail:
      "Kedua sisi kertas dapat dimanfaatkan untuk mengurangi penggunaan kertas baru.",
  },
  {
    id: "e6",
    icon: "🧹",
    label: "Menyapu halaman",
    target: "Kebersihan",
    detail: "Menyapu menjaga lingkungan tetap bersih.",
  },
];
export const decomposition: Card[] = [
  [
    "sumber",
    "📍",
    "Menemukan sumber sampah",
    "Cari lokasi dan kegiatan penghasil sampah.",
  ],
  [
    "kumpul",
    "🧺",
    "Mengumpulkan sampah",
    "Tentukan siapa yang mengumpulkan dan alat yang dibutuhkan.",
  ],
  [
    "jenis",
    "⌕",
    "Mengenali jenis sampah",
    "Amati bahan dan karakteristik setiap benda.",
  ],
  [
    "pilah",
    "♻️",
    "Memilah sampah",
    "Pisahkan benda berdasarkan ciri dan kebutuhan penanganannya.",
  ],
  [
    "tempat",
    "🗑️",
    "Menempatkan sampah",
    "Siapkan tempat pengumpulan yang sesuai.",
  ],
  [
    "olah",
    "🌱",
    "Mengolah atau menyalurkan",
    "Cari jalur kompos, daur ulang, dan penanganan khusus.",
  ],
  [
    "bersih",
    "🧹",
    "Menjaga kebersihan",
    "Susun pembagian tugas dan pantau kebersihan.",
  ],
].map(([id, icon, label, detail]) => ({
  id: id!,
  icon: icon!,
  label: label!,
  detail,
}));
export const problemParts: Card[] = [
  ...decomposition.slice(0, 3),
  {
    id: "warna",
    icon: "🎨",
    label: "Mengganti warna seragam",
    detail: "Warna seragam tidak membantu memahami atau mengelola sampah.",
  },
];
export const plasticParts: Card[] = [
  {
    id: "p1",
    icon: "🔎",
    label: "Mencatat sumber plastik",
    detail: "Kita perlu mengetahui dari kegiatan mana plastik berasal.",
  },
  {
    id: "p2",
    icon: "🥤",
    label: "Mencari pengganti sekali pakai",
    detail: "Botol isi ulang dapat mengurangi kebutuhan plastik sekali pakai.",
  },
  {
    id: "p3",
    icon: "📊",
    label: "Memantau jumlah plastik",
    detail: "Bandingkan jumlah plastik sebelum dan sesudah upaya pengurangan.",
  },
  {
    id: "p4",
    icon: "🎨",
    label: "Mengganti warna dinding",
    detail:
      "Warna dinding tidak menjawab sumber, pengurangan, atau pemantauan plastik.",
  },
];
export const waste: Card[] = [
  [
    "w1",
    "🍌",
    "Kulit pisang",
    "Organik",
    "Berasal dari tumbuhan dan dapat terurai secara hayati.",
  ],
  [
    "w2",
    "🍚",
    "Sisa makanan",
    "Organik",
    "Bahan makanan berasal dari makhluk hidup; cara pengolahannya perlu disesuaikan.",
  ],
  [
    "w3",
    "🧴",
    "Botol plastik",
    "Anorganik",
    "Plastik sulit terurai secara alami. Botol bersih dapat disalurkan sesuai fasilitas daur ulang.",
  ],
  [
    "w4",
    "📄",
    "Kertas bersih",
    "Organik",
    "Serat selulosa berasal dari tumbuhan. Kertas bersih sebaiknya dikumpulkan terpisah untuk daur ulang.",
  ],
  [
    "w5",
    "🥤",
    "Gelas plastik",
    "Anorganik",
    "Terbuat dari plastik yang sulit terurai secara alami.",
  ],
  [
    "w6",
    "🔋",
    "Baterai bekas",
    "B3",
    "Mengandung bahan yang memerlukan penanganan khusus. Minta bantuan orang dewasa.",
  ],
  [
    "w7",
    "🧃",
    "Kemasan minuman multilapis",
    "Anorganik",
    "Terdiri dari beberapa lapisan bahan, termasuk plastik, sehingga memerlukan pengolahan khusus.",
  ],
  [
    "w8",
    "🍂",
    "Daun kering",
    "Organik",
    "Berasal dari tumbuhan dan dapat diolah menjadi kompos.",
  ],
  [
    "w9",
    "🥫",
    "Kaleng",
    "Anorganik",
    "Terbuat dari logam; dapat dikumpulkan untuk daur ulang sesuai fasilitas yang tersedia.",
  ],
  [
    "w10",
    "🖊️",
    "Pulpen bekas",
    "Anorganik",
    "Benda ini tersusun dari plastik dan bagian logam yang sulit terurai.",
  ],
  [
    "w11",
    "🪥",
    "Sikat gigi bekas",
    "Anorganik",
    "Gagang dan bulunya umumnya dibuat dari bahan sintetis.",
  ],
  [
    "w12",
    "🦴",
    "Tulang / sisa makanan",
    "Organik",
    "Berasal dari hewan, tetapi penguraiannya lebih lama dan tidak cocok untuk semua komposter.",
  ],
  [
    "w13",
    "🛍️",
    "Kantong plastik",
    "Anorganik",
    "Plastik sulit terurai; mengurangi penggunaannya membantu lingkungan.",
  ],
  [
    "w14",
    "💡",
    "Lampu fluoresen / TL bekas",
    "B3",
    "Lampu TL mengandung merkuri. Jangan dipecahkan atau ditangani sendiri; minta bantuan orang dewasa.",
  ],
  [
    "w15",
    "🧻",
    "Tisu kertas bersih",
    "Organik",
    "Dalam latihan ini: tisu selulosa tanpa bahan tambahan atau kontaminasi. Jalur pengolahannya mengikuti fasilitas sekolah.",
  ],
].map(([id, icon, label, target, detail]) => ({
  id: id!,
  icon: icon!,
  label: label!,
  target,
  detail,
}));
export const finalCards: Card[] = [
  {
    id: "f1",
    icon: "🏫",
    label: "Periksa perangkat tiap ruang",
    target: "Bagian masalah",
    detail: "Pemeriksaan dibagi menjadi pekerjaan kecil per ruangan.",
  },
  {
    id: "f2",
    icon: "👥",
    label: "Bagi tugas mematikan perangkat",
    target: "Bagian masalah",
    detail: "Pembagian tanggung jawab membuat masalah lebih mudah ditangani.",
  },
  {
    id: "f3",
    icon: "🕒",
    label: "Jam perangkat sering menyala",
    target: "Pola yang dicari",
    detail:
      "Cari waktu yang berulang ketika perangkat menyala tanpa digunakan.",
  },
  {
    id: "f4",
    icon: "📍",
    label: "Ruang yang berulang kali boros",
    target: "Pola yang dicari",
    detail: "Bandingkan kejadian antarruang dan antarhari.",
  },
  {
    id: "f5",
    icon: "📋",
    label: "Catatan ruang, jam, dan perangkat",
    target: "Informasi yang dikumpulkan",
    detail: "Data ini membantu memeriksa pola penggunaan.",
  },
  {
    id: "f6",
    icon: "⚡",
    label: "Lama menyala dan daya perangkat",
    target: "Informasi yang dikumpulkan",
    detail: "Daya dan durasi membantu memahami kebutuhan energi.",
  },
];
export const patterns = [
  {
    title: "Listrik",
    question: "Kelas A kosong pukul 14.00. Apa yang berulang?",
    data: [
      "Senin · 14.00 · lampu menyala",
      "Selasa · 14.00 · lampu menyala",
      "Rabu · 14.00 · lampu menyala",
    ],
    options: [
      "Lampu menyala setelah kelas selesai",
      "Lampu hanya menyala pada hari Senin",
    ],
    answer: 0,
    reason:
      "Pada tiga hari berbeda, lampu tetap menyala pada jam yang sama setelah kelas kosong.",
  },
  {
    title: "Air",
    question: "Kapan penggunaan air meningkat?",
    data: [
      "07.00 · 12 liter",
      "10.00 · 35 liter",
      "12.00 · 14 liter",
      "Esok hari, 10.00 · 37 liter",
    ],
    options: [
      "Selalu paling tinggi pukul 07.00",
      "Berulang kali tinggi pukul 10.00",
    ],
    answer: 1,
    reason:
      "Dua pengamatan pukul 10.00 menunjukkan penggunaan yang lebih tinggi. Selidiki kegiatan pada jam tersebut.",
  },
  {
    title: "Kebersihan",
    question: "Apa keteraturan jadwal ini?",
    data: [
      "Senin · kelompok A",
      "Selasa · kelompok B",
      "Rabu · kelompok A",
      "Kamis · kelompok B",
    ],
    options: ["Kelompok A dan B bergantian", "Kelompok A bertugas setiap hari"],
    answer: 0,
    reason:
      "Urutan A–B berulang. Jika jadwal berlanjut, giliran berikutnya adalah kelompok A.",
  },
];
export const detectiveData = ["Senin", "Selasa", "Rabu"].flatMap((day, i) =>
  ["Kantin", "Kelas", "Taman"].map((place, j) => ({
    day,
    place,
    before: [4, 2, 1][j]! + i,
    after: [
      [24, 8, 5],
      [28, 7, 6],
      [26, 9, 4],
    ][i]![j]!,
  })),
);
export const reflections = [
  "Masalah besar dapat dipecah menjadi bagian yang lebih kecil.",
  "Kita dapat menemukan pola dari berbagai informasi.",
  "Berpikir komputasional dapat digunakan dalam kegiatan Adiwiyata.",
  "Saya masih perlu belajar lagi.",
];
