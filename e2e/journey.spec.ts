import { test, expect, type Page, type Locator } from "@playwright/test";
import { environment, decomposition, waste, finalCards } from "../src/content";
import { stages } from "../src/stages";
import { fresh, STORAGE_KEY } from "../src/mission";
async function seedUnlocked(page: Page, unlocked: number) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
  await page.evaluate(
    ({ progress, key }) => localStorage.setItem(key, JSON.stringify(progress)),
    {
      key: STORAGE_KEY,
      progress: {
        ...fresh(),
        current: unlocked,
        unlocked,
        done: Array.from({ length: unlocked - 1 }, (_, i) => i + 1),
      },
    },
  );
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
}
async function press(locator: Locator, touch: boolean) {
  if (touch) await locator.tap();
  else await locator.click();
}
test("complete all twenty stages, persistence, feedback, reset", async ({
  page,
}, info) => {
  const touch = info.project.name === "touch";
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  const click = async (name: string) =>
    press(page.getByRole("button", { name, exact: true }), touch);
  const next = async () => click("Lanjut →");
  const sort = async (
    cards: { id: string; target?: string }[],
    fallback?: string,
  ) => {
    for (const c of cards) {
      await press(page.locator(`[data-card="${c.id}"]`), touch);
      await press(page.locator(`[data-drop="${c.target || fallback}"]`), touch);
    }
  };
  await page.screenshot({
    path: `test-results/cover-${info.project.name}.png`,
    fullPage: true,
  });
  await click("Mulai");
  await click("Mulai misi ↗");
  await expect(
    page.getByRole("button", { name: "Lanjut →", exact: true }),
  ).toBeDisabled();
  for (const text of ["Pahami", "Pecahkan", "Temukan", "Terapkan"])
    await press(
      page
        .getByRole("button")
        .filter({ has: page.getByText(text, { exact: true }) }),
      touch,
    );
  await next();
  for (const text of ["Ruangan kosong", "Keran air", "Halaman sekolah"])
    await click(text);
  await next();
  await expect(
    page.getByText("Lampu masih menyala di ruangan yang kosong."),
  ).toBeVisible();
  await click("Belum tahu");
  await next();
  await press(
    page.getByRole("button").filter({ hasText: "Menyiapkan tas" }),
    touch,
  );
  await next();
  await press(
    page.getByRole("button").filter({ hasText: "Mengatur jadwal" }),
    touch,
  );
  await click("Temukan hubungannya ↗");
  await next();
  await sort(environment);
  await next();
  await click("Adegan →");
  await click("Adegan →");
  await next();
  for (const id of [
    "Menemukan sumber sampah",
    "Mengumpulkan sampah",
    "Mengenali jenis sampah",
  ])
    await press(page.getByRole("button").filter({ hasText: id }), touch);
  await click("Periksa pilihan ↗");
  await next();
  await sort(decomposition, "Bagian-bagian masalah");
  await next();
  await click("B. Memecah masalah menjadi bagian-bagian kecil");
  await next();
  for (const text of [
    "Mencatat sumber plastik",
    "Mencari pengganti sekali pakai",
    "Memantau jumlah plastik",
  ])
    await press(page.getByRole("button").filter({ hasText: text }), touch);
  await click("Periksa pilihan ↗");
  await next();
  await press(page.locator('[data-card="w1"]'), touch);
  await press(page.locator('[data-drop="B3"]'), touch);
  await press(page.locator('[data-drop="B3"]'), touch);
  await expect(page.getByRole("status")).toContainText("Petunjuk:");
  await sort(waste);
  await page.reload();
  await expect(page.getByText("15 / 15", { exact: true })).toBeVisible();
  await next();
  await click("Bahan");
  await click("Guru: diskusi selesai ✓");
  await next();
  await press(
    page.getByRole("button").filter({ hasText: "Apa hubungan kulit pisang" }),
    touch,
  );
  await next();
  for (const a of [
    "Lampu menyala setelah kelas selesai",
    "Berulang kali tinggi pukul 10.00",
    "Kelompok A dan B bergantian",
  ])
    await click(a);
  await next();
  await click("Kantin setelah istirahat");
  await sort(
    decomposition.filter((c) => ["sumber", "pilah", "bersih"].includes(c.id)),
    "Bagian masalah yang akan ditangani",
  );
  await next();
  await sort(finalCards);
  await click("Guru: diskusi selesai ✓");
  await next();
  await press(
    page.getByRole("button").filter({ hasText: "Masalah besar dapat dipecah" }),
    touch,
  );
  await page
    .getByLabel("Catatan kelas")
    .fill("Merawat taman: bagi tugas dan cari pola tanah kering.");
  await click("Guru: refleksi selesai ✓");
  await next();
  await expect(
    page.getByRole("heading", { name: "Misi selesai!" }),
  ).toBeVisible();
  await click("⌂ Kembali ke awal");
  await click("Mulai");
  await click("Lanjutkan misi 20 →");
  await click("↻ Ulangi misi");
  await click("Batal");
  await expect(
    page.getByRole("heading", { name: "Misi selesai!" }),
  ).toBeVisible();
  await click("↻ Ulangi misi");
  await click("Ya, reset progres");
  await expect(
    page.getByRole("button", { name: "Mulai", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("pointer drag, outside drop, cancel, keyboard, responsive layout", async ({
  page,
}, info) => {
  await seedUnlocked(page, 7);
  await page.goto("/#/misi/adiwiyata");
  await expect(
    page.getByRole("heading", { name: "Jelajah Adiwiyata" }),
  ).toBeVisible();
  const card = page.locator('[data-card="e1"]');
  const from = await card.boundingBox();
  const dest = await page.locator('[data-drop="Energi"]').boundingBox();
  await page.mouse.move(from!.x + 20, from!.y + 20);
  await page.mouse.down();
  await page.mouse.move(5, 5, { steps: 10 });
  await page.mouse.up();
  await expect(card).toBeVisible();
  await card
    .dispatchEvent("pointerdown", {
      pointerId: 2,
      button: 0,
      clientX: 100,
      clientY: 100,
    })
    .catch(() => {});
  await card.dispatchEvent("pointercancel", { pointerId: 2 });
  await expect(card).toBeVisible();
  await page.mouse.move(from!.x + 20, from!.y + 20);
  await page.mouse.down();
  await page.mouse.move(dest!.x + 30, dest!.y + 30, { steps: 12 });
  await page.mouse.up();
  await expect(card).toHaveCount(0);
  await page.locator('[data-card="e2"]').focus();
  await page.keyboard.press("Enter");
  await page.locator('[data-drop="Air"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-card="e2"]')).toHaveCount(0);
  for (const size of [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/layout-${info.project.name}-${size.width}.png`,
      fullPage: true,
    });
  }
});
test("all stages render at PID and mobile widths", async ({ page }, info) => {
  await seedUnlocked(page, 20);
  for (const width of [1920, 390]) {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 844 });
    for (let current = 1; current <= 20; current++) {
      await page.goto("/#/misi/" + stages[current - 1]!.slug);
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        String(current),
      );
      await expect(page.locator("main")).not.toBeEmpty();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if ([1, 3, 10, 13, 17, 20].includes(current))
        await page.screenshot({
          path: `test-results/stage-${current}-${width}-${info.project.name}.png`,
          fullPage: true,
        });
    }
  }
});
test("touch drag uses real emulated touch and cancellation leaves card available", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "touch", "Touch-specific input");
  await seedUnlocked(page, 7);
  await page.goto("/#/misi/adiwiyata");
  await expect(
    page.getByRole("heading", { name: "Jelajah Adiwiyata" }),
  ).toBeVisible();
  const session = await page.context().newCDPSession(page);
  const from = await page.locator('[data-card="e1"]').boundingBox();
  const dest = await page.locator('[data-drop="Energi"]').boundingBox();
  const start = { x: from!.x + 20, y: from!.y + 20 };
  const end = { x: dest!.x + 25, y: dest!.y + 25 };
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [start],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await expect(page.locator('[data-card="e1"]')).toBeVisible();
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [start],
  });
  for (let i = 1; i <= 8; i++)
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        {
          x: start.x + ((end.x - start.x) * i) / 8,
          y: start.y + ((end.y - start.y) * i) / 8,
        },
      ],
    });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator('[data-card="e1"]')).toHaveCount(0);
});
