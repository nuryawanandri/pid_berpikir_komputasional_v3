import { test, expect, type Page } from "@playwright/test";
import { fresh, STORAGE_KEY } from "../src/mission";

const objectives = [
  "Murid mampu menguraikan masalah pengelolaan sampah di satu area sekolah menjadi komponen yang relevan dengan menerapkan prinsip dekomposisi.",
  "Murid mampu menemukan persamaan dan perbedaan ciri objek dengan menerapkan prinsip pengenalan pola.",
  "Murid mampu menggunakan hasil dekomposisi dan pengenalan pola untuk mengusulkan tindakan perbaikan yang realistis, didukung bukti dan cara memeriksa hasil.",
];
async function seed(page: Page, unlocked = 7) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
  const progress = {
    ...fresh(),
    current: unlocked,
    unlocked,
    done: Array.from({ length: unlocked - 1 }, (_, i) => i + 1),
    note: "Catatan lama",
    choices: { goals: ["pahami"] },
  };
  await page.evaluate(
    ({ progress, key }) => {
      localStorage.setItem(key, JSON.stringify(progress));
      localStorage.setItem("unrelated-data", "keep");
    },
    { progress, key: STORAGE_KEY },
  );
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
}
test("objectives, legacy progress, explicit routes, reload and browser history", async ({
  page,
}, info) => {
  await seed(page);
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
  for (const text of objectives)
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveCount(0);
  for (const width of [1366, 390]) {
    await page.setViewportSize({ width, height: width === 1366 ? 768 : 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/objectives-${width}-${info.project.name}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Mulai", exact: true }).click();
  await expect(page).toHaveURL(/#\/misi\/cover$/);
  await page.getByRole("button", { name: "Lanjutkan misi 7 →" }).click();
  await expect(page).toHaveURL(/#\/misi\/adiwiyata$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Jelajah Adiwiyata" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).note,
      STORAGE_KEY,
    ),
  ).toBe("Catatan lama");
  await page.getByRole("button", { name: "← Kembali" }).click();
  await expect(page).toHaveURL(/#\/misi\/aktivitas-sehari-hari$/);
  await page.goBack();
  await expect(page).toHaveURL(/#\/misi\/adiwiyata$/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/misi\/aktivitas-sehari-hari$/);
  await page.goto("/#/misi/refleksi");
  await expect(page).toHaveURL(/#\/misi\/adiwiyata$/);
  await page.goto("/#/tidak-ada");
  await expect(
    page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
  ).toBeVisible();
});

for (const location of ["awal", "tengah", "akhir"])
  test(`reset from ${location}, cancel, focus, reload and locked history`, async ({
    page,
  }, info) => {
    await seed(page, location === "akhir" ? 20 : 7);
    if (location !== "awal")
      await page.goto(
        "/#/misi/" + (location === "akhir" ? "selesai" : "adiwiyata"),
      );
    await expect(
      page.getByRole("heading", {
        name:
          location === "awal"
            ? "Tujuan Pembelajaran"
            : location === "akhir"
              ? "Misi selesai!"
              : "Jelajah Adiwiyata",
        exact: true,
      }),
    ).toBeVisible();
    const before = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );
    const url = page.url();
    const reset = page.getByRole("button", {
      name: "Reset progres",
      exact: true,
    });
    const click = async (name: string) => {
      const button = page.getByRole("button", { name, exact: true });
      if (info.project.name === "touch") await button.tap();
      else await button.click();
    };
    await click("Reset progres");
    await expect(
      page.getByRole("dialog", { name: "Reset progres kelas?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Batal", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(reset).toBeFocused();
    expect(page.url()).toBe(url);
    expect(
      await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
    ).toBe(before);
    await click("Reset progres");
    await click("Batal");
    expect(page.url()).toBe(url);
    await click("Reset progres");
    await click("Ya, reset progres");
    await expect(
      page.getByRole("heading", { name: "Tujuan Pembelajaran" }),
    ).toBeVisible();
    await expect(page.getByRole("status")).toContainText("berhasil direset");
    await page.reload();
    const saved = await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!),
      STORAGE_KEY,
    );
    expect(saved.unlocked).toBe(1);
    expect(saved.done).toEqual([]);
    expect(saved.note).toBe("");
    expect(saved.choices).toEqual({});
    expect(
      await page.evaluate(() => localStorage.getItem("unrelated-data")),
    ).toBe("keep");
    await page.goBack();
    await page.goto("/#/misi/refleksi");
    await expect(page).toHaveURL(/#\/misi\/cover$/);
    await expect(
      page.getByRole("button", { name: /Lanjutkan misi/ }),
    ).toHaveCount(0);
  });

test("reset reports persistence failure without losing the in-memory reset", async ({
  page,
}) => {
  await seed(page);
  await page.goto("/#/misi/adiwiyata");
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "QuotaExceededError");
    };
  });
  await page
    .getByRole("button", { name: "Reset progres", exact: true })
    .click();
  await page.getByRole("button", { name: "Ya, reset progres" }).click();
  await expect(page.getByRole("status")).toContainText(
    "perubahan tidak berhasil disimpan",
  );
  await page.getByRole("button", { name: "Mulai", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /Lanjutkan misi/ }),
  ).toHaveCount(0);
  await page.goto("/#/misi/refleksi");
  await expect(page).toHaveURL(/#\/misi\/cover$/);
});
