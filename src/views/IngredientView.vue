<template>
  <v-container>
    <h2 class="mb-4"> Cocktails with {{ route.params.name }}</h2>

    <v-row>
      <v-col
        v-for="(drink,i) in drinks"
        :key="i"
        cols="12"
        md="3"
      >
        <v-card @click="goToCocktail(drink.idDrink)">

          <v-img 
            :src="drink.strDrinkThumb" 
            height="250" 
            cover
          />
          <v-card-title>{{ drink.strDrink }}</v-card-title>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route=useRoute()
const router=useRouter()
const drinks=ref([])

onMounted(async () => {
  const res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${route.params.name}`)
  const data=await res.json()
  drinks.value=data.drinks
})

const goToCocktail =(id) =>{
  router.push(`/cocktail/${id}`)
}

</script>
