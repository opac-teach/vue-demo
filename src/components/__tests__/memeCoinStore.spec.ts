import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMemecoinStore } from "@/stores/memeCoinsStore.ts";

describe("memecoinStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("État initial correct", () => {
    const store = useMemecoinStore();
    expect(store.list).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe("");
  });

  it("Liste mise à jour en cas de réussite", async () => {
    const fakeMemecoins = [
      { name: "TestCoin", symbol: "TST" },
      { name: "CoolToken", symbol: "CLT" }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(fakeMemecoins)
    }) as any;

    const store = useMemecoinStore();
    await store.fetchAll();

    expect(store.loading).toBe(false);
    expect(store.list).toEqual(fakeMemecoins);
    expect(store.error).toBe("");
  });

  it("Erreur si fetch est en échec", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("fetch failed")) as any;

    const store = useMemecoinStore();
    await store.fetchAll();

    expect(store.loading).toBe(false);
    expect(store.error).toBe("Erreur lors du chargement des memecoins");
    expect(store.list).toEqual([]);
  });
});
