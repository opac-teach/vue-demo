import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import coinForm from "@/views/CoinFormView.vue";
import { useAuthStore } from "@/stores/authStore";
import { setActivePinia, createPinia } from "pinia";
import { nextTick } from "vue";

describe("CoinFormView.vue", () => {
  let wrapper: any;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
    authStore.token = "fake-token";
    authStore.userId = "user-id";

    wrapper = mount(coinForm);
  });

  it("Affiche les champs du formulaire quand l’utilisateur est connecté", () => {
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.text()).toContain("Créer un MemeCoin");
  });

  it("Valide les champs du formulaire avec des erreurs si invalides", async () => {
    await wrapper.find("#name").setValue("Sh");
    await wrapper.find("#symbol").setValue("btc");
    await nextTick();

    expect(wrapper.text()).toContain("Le nom doit contenir entre 4 et 16 caractères.");
    expect(wrapper.text()).toContain("Le symbole doit être en majuscules et contenir entre 2 et 4 lettres.");
  });

  it("Appelle le backend et vide le formulaire si tout est valide", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ json: () => [] });

    await wrapper.find("#name").setValue("TestCoin");
    await wrapper.find("#symbol").setValue("TST");
    await wrapper.find("#description").setValue("Un test");
    await wrapper.find("form").trigger("submit.prevent");
    await nextTick();

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("create-memecoin-protected"), expect.objectContaining({
      method: "POST",
      headers: expect.objectContaining({ Authorization: "Bearer fake-token" }),
    }));

    expect(wrapper.text()).toContain("MemeCoin créé avec succès");
  });

  it("Affiche un message si l’utilisateur n’est pas authentifié", async () => {
    authStore.logout();
    wrapper = mount(coinForm);

    expect(wrapper.text()).toContain("une connexion est requise");
    expect(wrapper.find("form").exists()).toBe(false);
  });
});

describe("MemecoinForm", () => {
  it("Bloque l’envoi si les champs sont invalides", async () => {
    setActivePinia(createPinia());
    const wrapper = mount(coinForm);

    const button = wrapper.get("button[type='submit']");
    expect(button.attributes().disabled).toBeDefined();
  });
});
