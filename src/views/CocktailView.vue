<template>
  <v-container v-if="store.drink">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="store.drink.strDrinkThumb" />
        <h2 class="mt-3">{{ store.drink.strDrink }}</h2>
      </v-col>

      <v-col>
        <h3 class="my-2">Ingredients</h3>
        <v-row>
          <v-col
            v-for="(ingredient, i) in store.ingredients"
            :key="i"
            cols="6"
            md="3"
          >
            <v-card
              class="text-center pa-2 hover"
              @click="goToIngredient(ingredient)"
            >
              <v-card-text> {{ ingredient }} </v-card-text>

              <v-img
                :src="`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`"
                height="150"
                contain
              />
            </v-card>
          </v-col>
        </v-row>
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


watch(() =>route.params.id,
  async (id) => {
    await store.fetchCocktailDetails(id);
  },
  { immediate:true }
);


const goToIngredient = (name) => {
  router.push(`/ingredient/${name}`);
};
</script>
