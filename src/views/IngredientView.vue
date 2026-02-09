<template>
  <v-container>
    <h2 class="mb-4">Cocktails with {{ route.params.name }}</h2>

    <v-row>
      <v-col v-for="(drink, i) in store.cocktails" :key="i" cols="12" md="3">
        <v-card @click="goToCocktail(drink.idDrink)">
          <v-img :src="drink.strDrinkThumb" height="250" cover />
          <v-card-title>{{ drink.strDrink }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCocktailStore } from "@/stores/cocktailStore";

const route = useRoute();
const router = useRouter();
const store = useCocktailStore();

watch(() =>route.params.name,
  async (name) => {
    await store.fetchCocktailsByIngredient(name);
  },
  { immediate:true }
);


const goToCocktail = (id) => {
  router.push(`/cocktail/${id}`);
};
</script>
