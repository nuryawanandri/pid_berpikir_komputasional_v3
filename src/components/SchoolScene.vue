<script setup lang="ts">
import { observations } from "../content";
defineProps<{ interactive?: boolean; found?: string[]; messy?: boolean }>();
defineEmits<{ discover: [id: string] }>();
const positions = [
  [39, 36],
  [79, 61],
  [52, 79],
  [68, 66],
  [14, 63],
  [57, 38],
];
</script>
<template>
  <div class="school-scene">
    <svg
      viewBox="0 0 1000 660"
      role="img"
      aria-label="Sekolah hijau dengan kelas, taman, keran, dan tempat sampah"
    >
      <defs>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stop-color="#c9eaf0" />
          <stop offset="1" stop-color="#f1f7e8" />
        </linearGradient>
        <linearGradient id="grass" x2="0" y2="1">
          <stop stop-color="#b9d6a0" />
          <stop offset="1" stop-color="#7daf75" />
        </linearGradient>
      </defs>
      <rect width="1000" height="660" rx="36" fill="url(#sky)" />
      <circle cx="821" cy="94" r="51" fill="#ffe5a0" />
      <g fill="#fff" opacity=".8">
        <path d="M78 106q-12-34 25-34 14-45 50-15 47-10 45 29 32 20 0 29H85Z" />
        <path d="M554 78q-9-23 18-23 12-29 35-9 33-7 34 20 22 13 0 20h-77Z" />
      </g>
      <path d="M0 340Q220 270 440 331T1000 312V660H0Z" fill="url(#grass)" />
      <path d="M385 436 222 660H831L595 434" fill="#e4d9bd" />
      <path d="m448 435-27 225" stroke="#f6edda" stroke-width="5" />
      <rect x="229" y="204" width="501" height="234" rx="10" fill="#f9edcf" />
      <path d="m200 214 92-96h375l90 96Z" fill="#2a776b" />
      <path
        d="m225 211 72-72h366l68 72"
        fill="none"
        stroke="#4b9883"
        stroke-width="9"
      />
      <rect x="410" y="166" width="145" height="33" rx="8" fill="#fff4d9" />
      <text
        x="482"
        y="188"
        text-anchor="middle"
        font-size="18"
        font-family="sans-serif"
        font-weight="bold"
        fill="#225444"
      >
        SEKOLAH HIJAU
      </text>
      <g fill="#8bbfc1" stroke="#fff8e8" stroke-width="10">
        <rect x="267" y="254" width="105" height="93" />
        <rect x="403" y="254" width="105" height="93" />
        <rect x="576" y="254" width="105" height="93" />
      </g>
      <g stroke="#f9edcf" stroke-width="6">
        <path
          d="M320 254v93m-52-46h103m84-47v93m-52-46h104m120-47v93m-53-46h105"
        />
      </g>
      <rect x="447" y="363" width="66" height="76" rx="5" fill="#347b72" />
      <circle cx="498" cy="404" r="4" fill="#f4d279" />
      <path d="M220 439h520" stroke="#e1bf8c" stroke-width="14" />
      <g>
        <path
          d="M105 390V205m45 201V255m716 148V206"
          stroke="#8a7354"
          stroke-width="19"
        />
        <g fill="#438360">
          <circle cx="100" cy="211" r="77" />
          <circle cx="146" cy="268" r="62" />
          <circle cx="868" cy="216" r="92" />
        </g>
        <g fill="#649a63">
          <circle cx="76" cy="184" r="47" />
          <circle cx="852" cy="176" r="61" />
        </g>
      </g>
      <g fill="#468552">
        <ellipse cx="113" cy="432" rx="85" ry="36" />
        <ellipse cx="889" cy="442" rx="92" ry="39" />
      </g>
      <g fill="#e4bc65">
        <circle cx="84" cy="424" r="7" />
        <circle cx="128" cy="413" r="7" />
        <circle cx="874" cy="433" r="7" />
        <circle cx="917" cy="421" r="7" />
      </g>
      <g transform="translate(663 401)">
        <rect width="36" height="54" rx="5" fill="#287758" />
        <rect x="43" width="36" height="54" rx="5" fill="#478bad" />
        <rect x="86" width="36" height="54" rx="5" fill="#bd6751" />
        <path d="M-3 0h42m1 0h42m1 0h42" stroke="#294f42" stroke-width="7" />
        <text x="17" y="33" fill="white" text-anchor="middle" font-size="23">
          ♻
        </text>
      </g>
      <g transform="translate(793 365)">
        <path
          d="M0 50V0h36v15"
          stroke="#729c9e"
          stroke-width="13"
          fill="none"
        />
        <ellipse cy="56" rx="27" ry="7" fill="#c3dee1" />
        <path v-if="interactive" d="m36 30-6 15h12Z" fill="#4a9aca" />
      </g>
      <g v-if="interactive">
        <rect
          x="271"
          y="259"
          width="96"
          height="84"
          fill="#ffe28b"
          opacity=".55"
        />
        <path
          d="M320 257v15m-12 13h24l-6-13h-12Z"
          fill="#fff8cc"
          stroke="#d6a84a"
          stroke-width="3"
        />
        <g fill="#fff9ed" stroke="#9cae9b" stroke-width="2">
          <path d="m596 325 27-6 5 18-27 6Z" />
          <path d="m617 321 28 2-2 20-28-2Z" />
          <path d="m638 328 22-4 3 19-22 4Z" />
        </g>
        <path
          d="M145 441v-31q-30-17-25 5m25 7q28-17 27 5"
          fill="none"
          stroke="#a48e4c"
          stroke-width="7"
        />
        <path d="m121 440 48 0-8 33h-32Z" fill="#c48b60" />
        <path
          d="m674 392 14-10 13 18m-6-12 19 3"
          fill="none"
          stroke="#e9be69"
          stroke-width="6"
        />
      </g>
      <g transform="translate(305 438)">
        <path
          d="m-16 49-8 42m39-42 8 42"
          stroke="#254e64"
          stroke-width="13"
          stroke-linecap="round"
        />
        <path d="M-20 4h43l6 51h-55Z" fill="#f2ba60" />
        <circle cy="-16" r="24" fill="#c88d65" />
        <path d="M-24-20q0-40 46-10l-1 14-18-12-27 13" fill="#364b3b" />
        <path
          d="m-23 12-23 24m71-24 20 19"
          stroke="#c88d65"
          stroke-width="11"
          stroke-linecap="round"
        />
      </g>
      <g transform="translate(598 468)">
        <path
          d="m-14 38-6 35m29-35 7 35"
          stroke="#345875"
          stroke-width="12"
          stroke-linecap="round"
        />
        <path d="M-20 0h40l8 43h-57Z" fill="#f2f2df" />
        <path
          d="m-23 10-16 24m63-23 17-22"
          stroke="#d8a077"
          stroke-width="10"
          stroke-linecap="round"
        />
        <circle cy="-21" r="22" fill="#d8a077" />
        <path d="M-24-16v-15q22-35 47 0v18l-13-17-22 4Z" fill="#304c42" />
      </g>
      <g v-if="messy || interactive" transform="translate(455 507)">
        <path d="m0 0 25 7-8 27-24-7Z" fill="#fcf6e8" />
        <rect
          x="45"
          y="19"
          width="15"
          height="30"
          rx="5"
          fill="#7dbacd"
          transform="rotate(25 45 19)"
        />
        <path d="m87 4 25 10-6 18-27-8Z" fill="#e5ad62" />
      </g>
      <g fill="#e7f0cf">
        <ellipse cx="121" cy="552" rx="36" ry="8" />
        <ellipse cx="844" cy="562" rx="50" ry="10" />
      </g>
    </svg>
    <button
      v-for="(o, i) in interactive ? observations : []"
      :key="o.id"
      class="hotspot"
      :class="{ found: found?.includes(o.id) }"
      :style="{ left: positions[i]![0] + '%', top: positions[i]![1] + '%' }"
      :aria-label="o.label"
      @click="$emit('discover', o.id)"
    >
      {{ found?.includes(o.id) ? "✓" : "+" }}
    </button>
    <span class="scene-tag">SEKOLAH KITA · MISI UNTUK BUMI</span>
  </div>
</template>
