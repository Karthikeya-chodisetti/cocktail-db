

<template>
  <v-card class="px-1" variant="elevated">
    <v-form ref="searchForm" @submit.prevent="search" class="d-flex">
      <v-col cols="12" md="11">
        <div class="d-flex">
          <v-col cols="12" md="4">
            <v-select
              v-model="drink"
              :items="['Cocktail', 'Ingredients']"
              label="search By"
              density="compact"
              variant="outlined"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="alcoholic"
              :items="[
                { title: 'Alcoholic', value: 'Alcoholic' },
                { title: 'Non alcoholic', value: 'Non alcoholic' },
              ]"
              item-title="title"
              item-value="value"
              label="Alcohol"
              density="compact"
              variant="outlined"
              clearable
              :disabled="drink === 'Ingredients'"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchText"
              label="Search"
              placeholder="Type and press Enter"
              density="compact"
              variant="outlined"
              :rules="[rules.textRule]"
              @keyup.enter="search"
            >
            </v-text-field>
          </v-col>
        </div>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="1" class="text-center">
        <v-btn
          color="primary"
          variant="tonal"
          density="comfortable"
          icon="mdi-magnify"
          class="mt-3 ml-n3"
          :loading="isFetching"
          type="submit"
        ></v-btn>
      </v-col>
    </v-form>
  </v-card>

  <v-row class="lettersRow" justify="center" v-if="showAlphabet">
    <v-card-sub-title> Browse By </v-card-sub-title>
    <v-chip
      v-for="(letter, i) in letters"
      :key="i"
      class="ma-1"
      color="pink"
      variant="outlined"
      @click="searchByLetter(letter)"
      :class="{ 'selected-letter': selectedLetter === letter }"
    >
      {{ letter }}
    </v-chip>
  </v-row>
</template>



<script setup>
import { ref } from "vue";
import {useCocktailStore} from "@/stores/cocktailStore";

const drink = ref("Cocktail");
const searchText = ref("");

const alcoholic = ref(null);
const showAlphabet = ref(true);
const isFetching = ref(false);
const searchForm = ref();

const store = useCocktailStore();

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const emit = defineEmits(["data","results"]);

const rules = {
  textRule: (v) => !!v || "Name is required",
};

const search = async () => {
  const { valid } = await searchForm.value.validate();
  if (!valid) {
    return;
  }
  isFetching.value = true;

  let results = [];
  try {
    if(drink.value === "Cocktail") {
      await store.fetchCocktailsByName(
      searchText.value,
      alcoholic.value==="Alcoholic"
    );
    results =store.cocktails;
    }else {
      await store.fetchCocktailsByIngredient(searchText.value);
      results = store.cocktails;
    }

  } catch (error) {
    console.error(error);
  } finally {
    isFetching.value = false;
  }

  showAlphabet.value = false;
  emit("data", results);
};

const searchByLetter = async (letter) => {
  emit("results", []);
  searchText.value = "";
  showAlphabet.value = false;

  await store.fetchCocktailsByLetter(letter);
  emit("data", store.cocktails);
};

defineExpose({ isFetching });
</script>



<style scoped>
.lettersRow {
  position: fixed;
  bottom: 40px;
  width: 100%;
  padding: 8px 0;
  background-color: white;
  z-index: 5;
  overflow-x: auto;
  border-top: 1px solid #ccc;
}

.selected-letter {
  background-color: #1976d2;
  color: white;
}

.b1sr {
  border: 1px solid red;
}
</style>