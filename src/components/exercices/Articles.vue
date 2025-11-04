<template>
  <section class="space-y-6">
    <!-- Filtre > 50€ -->
    <div class="flex items-center gap-3">
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="onlyOver50" />
        Afficher uniquement les articles > 50€
      </label>
    </div>

    <!-- Liste -->
    <ul class="space-y-2">
      <li v-for="a in filteredArticles" :key="a.id">
        <ArticleItem :name="a.name" :price="a.price" />
      </li>
    </ul>

    <!-- Ajout d'article -->
    <form class="mt-6 flex flex-wrap items-end gap-3" @submit.prevent="addArticle">
      <div>
        <label class="block text-sm">Nom</label>
        <input v-model.trim="form.name" class="border rounded px-2 py-1" placeholder="Nom de l’article" required />
      </div>
      <div>
        <label class="block text-sm">Prix (€)</label>
        <input v-model.number="form.price" type="number" min="0" step="0.01" class="border rounded px-2 py-1" required />
      </div>
      <button class="border rounded px-3 py-1 hover:bg-neutral-800">Ajouter</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ArticleItem from './ArticleItem.vue'

type Article = { id: number; name: string; price: number }

const articles = ref<Article[]>([
  { id: 1,  name: 'Câble USB-C 1m',          price: 9.99  },
  { id: 2,  name: 'Tasse isotherme',         price: 14.9  },
  { id: 3,  name: 'Souris sans fil',         price: 24.5  },
  { id: 4,  name: 'Lampe de bureau LED',     price: 39.99 },
  { id: 5,  name: 'Clé USB 256Go',           price: 50.0  },
  { id: 6,  name: 'Casque audio filaire',    price: 59.9  },
  { id: 7,  name: 'Sac à dos urbain',        price: 75.0  },
  { id: 8,  name: 'Mini enceinte bluetooth', price: 89.99 },
  { id: 9,  name: 'Clavier mécanique',       price: 99.99 },
  { id: 10, name: 'Disque SSD 1To',          price: 100.0 },
  { id: 11, name: 'Moniteur 27 144Hz',       price: 129.0 },
  { id: 12, name: 'Casque gaming 7.1',       price: 199.0 },
])

const onlyOver50 = ref(false)

const filteredArticles = computed(() =>
  onlyOver50.value ? articles.value.filter(a => a.price > 50) : articles.value
)

const form = ref<{ name: string; price: number }>({ name: '', price: 0 })

function addArticle() {
  if (!form.value.name || form.value.price < 0) return
  const nextId = (articles.value.at(-1)?.id ?? 0) + 1
  articles.value.push({ id: nextId, name: form.value.name, price: Number(form.value.price) })
  form.value = { name: '', price: 0 }
}
</script>
