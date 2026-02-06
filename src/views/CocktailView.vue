<template>
  <v-container v-if="drink">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="drink.strDrinkThumb" />
        <h2 class="mt-3">{{ drink.strDrink }} </h2>
      </v-col>

      <v-col >
         <h3 class="my-2"> Ingredients </h3>
         <v-row>
             <v-col
                 v-for="(ingredient,i) in ingredients"
                 :key="i"
                 cols="6"
                 md="3"     
               >
                 <v-card
                     class="text-center pa-2 hover"
                     @click="goToIngredient(ingredient)"
                    >

                     <v-card-text class="text-subtitle-2"> {{ ingredient }} </v-card-text>

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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route=useRoute()
const router=useRouter()
const drink=ref(null)
const ingredients=ref([])

onMounted(async () =>{
  const res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`)
  const data=await res.json()
  drink.value=data.drinks[0]

  for(let i=1;i<=15;i++){
    const ing=drink.value[`strIngredient${i}`]
    if(ing) ingredients.value.push(ing)
  }
})

const goToIngredient = (name)=> {
  router.push(`/ingredient/${name}`)
}
 
</script>
