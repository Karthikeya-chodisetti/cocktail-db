

<template>
  <v-container>
    <SearchForm ref="searchForm" @data="cocktailData" />
    <div v-if="searchForm && searchForm.isFetching">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-row v-if="store.cocktails.length" class="mt-4">
        <v-col v-for="(c, id) in store.cocktails" :key="id" cols="12" md="3">
          <v-card class="drinkCard" @click="details(c)">
            <v-img :src="c.strDrinkThumb" height="300" cover />

            <v-card-title class="title"> {{ c.strDrink }} </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    

    <v-row v-else-if="searched" class="mt-5">
      <v-col cols="12" class="text-center">
        <v-icon size="40" color="red-accent-2"> mdi-magnify-close </v-icon>
        <h3 class="mt-2">No results found</h3>
      </v-col>
    </v-row>

    </div>
  </v-container>
</template>



<script setup>
import { ref } from "vue";
import SearchForm from "@/components/SearchForm.vue";
import { useRouter } from "vue-router";
import { useCocktailStore } from "@/stores/cocktailStore";

const router = useRouter();
const searched = ref(false);

const searchForm = ref();
const store=useCocktailStore();

const cocktailData = (data) => {
  searched.value=true;
};

const details = (cocktail) => {
  router.push(`/cocktail/${cocktail.idDrink}`);
};
</script>



<style scoped>
.drinkCard {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.drinkCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  color: #1e88e5;
  font-weight: 500;
  transition: color 0.2s ease;
}

.drinkCard:hover .title {
  color: #0d47a1;
}
</style>