import Stage1 from "./stages/01Cover.vue";
import Stage2 from "./stages/02Goals.vue";
import Stage3 from "./stages/03Observe.vue";
import Stage4 from "./stages/04Findings.vue";
import Stage5 from "./stages/05Computational.vue";
import Stage6 from "./stages/06Everyday.vue";
import Stage7 from "./stages/07Adiwiyata.vue";
import Stage8 from "./stages/08Story.vue";
import Stage9 from "./stages/09Problem.vue";
import Stage10 from "./stages/10Decompose.vue";
import Stage11 from "./stages/11ConceptDecompose.vue";
import Stage12 from "./stages/12CheckDecompose.vue";
import Stage13 from "./stages/13SortWaste.vue";
import Stage14 from "./stages/14FindPattern.vue";
import Stage15 from "./stages/15ConceptPattern.vue";
import Stage16 from "./stages/16MorePatterns.vue";
import Stage17 from "./stages/17Detective.vue";
import Stage18 from "./stages/18FinalMission.vue";
import Stage19 from "./stages/19Reflection.vue";
import Stage20 from "./stages/20Complete.vue";
export const stages = [
  {
    id: 1,
    component: Stage1,
    title: "Misi berpikir komputasional",
    hint: "Mulai petualanganmu.",
    phase: "Amati",
  },
  {
    id: 2,
    component: Stage2,
    title: "Bekal untuk petualanganmu",
    hint: "Buka keempat kartu tujuan.",
    phase: "Amati",
  },
  {
    id: 3,
    component: Stage3,
    title: "Ada apa di sekolah kita?",
    hint: "Temukan minimal tiga hal yang perlu diperhatikan.",
    phase: "Amati",
  },
  {
    id: 4,
    component: Stage4,
    title: "Apa yang kamu temukan?",
    hint: "Pilih satu tanggapan.",
    phase: "Amati",
  },
  {
    id: 5,
    component: Stage5,
    title: "Berpikir cerdas, setiap hari",
    hint: "Jelajahi minimal satu contoh.",
    phase: "Pahami",
  },
  {
    id: 6,
    component: Stage6,
    title: "Coba temukan!",
    hint: "Pilih aktivitas dan buka hubungannya.",
    phase: "Pahami",
  },
  {
    id: 7,
    component: Stage7,
    title: "Jelajah Adiwiyata",
    hint: "Cocokkan keenam kegiatan.",
    phase: "Jelajahi",
  },
  {
    id: 8,
    component: Stage8,
    title: "Masalah di sekolah kita",
    hint: "Baca ketiga adegan cerita.",
    phase: "Jelajahi",
  },
  {
    id: 9,
    component: Stage9,
    title: "Pikirkan masalahnya",
    hint: "Pilih semua bagian yang relevan dan periksa.",
    phase: "Jelajahi",
  },
  {
    id: 10,
    component: Stage10,
    title: "Misi dekomposisi",
    hint: "Pasang ketujuh bagian masalah.",
    phase: "Pecahkan",
  },
  {
    id: 11,
    component: Stage11,
    title: "Temukan konsep dekomposisi",
    hint: "Temukan jawaban yang sesuai dengan pengalamanmu.",
    phase: "Pecahkan",
  },
  {
    id: 12,
    component: Stage12,
    title: "Coba pada masalah baru",
    hint: "Pilih bagian masalah plastik dan periksa.",
    phase: "Pecahkan",
  },
  {
    id: 13,
    component: Stage13,
    title: "Misi pengenalan pola",
    hint: "Kelompokkan kelima belas benda.",
    phase: "Temukan",
  },
  {
    id: 14,
    component: Stage14,
    title: "Apa polanya?",
    hint: "Pilih ciri, lalu selesaikan diskusi kelas.",
    phase: "Temukan",
  },
  {
    id: 15,
    component: Stage15,
    title: "Temukan pengenalan pola",
    hint: "Buka hubungan dua benda dengan konsep pola.",
    phase: "Temukan",
  },
  {
    id: 16,
    component: Stage16,
    title: "Cari pola lagi",
    hint: "Selesaikan ketiga tantangan pola.",
    phase: "Temukan",
  },
  {
    id: 17,
    component: Stage17,
    title: "Detektif Adiwiyata",
    hint: "Temukan pola dan pasang tiga bagian masalah.",
    phase: "Terapkan",
  },
  {
    id: 18,
    component: Stage18,
    title: "Misi terakhir",
    hint: "Kelompokkan enam kartu dan diskusikan.",
    phase: "Terapkan",
  },
  {
    id: 19,
    component: Stage19,
    title: "Apa yang kamu temukan hari ini?",
    hint: "Pilih refleksi dan selesaikan diskusi.",
    phase: "Refleksikan",
  },
  {
    id: 20,
    component: Stage20,
    title: "Misi selesai!",
    hint: "Petualangan selesai.",
    phase: "Refleksikan",
  },
];
