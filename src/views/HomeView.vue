<template>
  <v-container>
    
    <result @results="cocktails=$event" />

    <v-row v-if="cocktails?.length" class="mt-4">
      <v-col
        v-for="(c,id) in cocktails"
        :key="id"
        cols="12"
        md="3" 
      >
        <v-card
          class="hover bg-transparent"
          @click="details(c)"
        >

          <v-img
            :src="c.strDrinkThumb"
            height="250"
            cover
          />

           <v-card-title> {{ c.strDrink }} </v-card-title>
        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>

import { ref } from 'vue'
import result from '../components/temp.vue'
import {useRouter} from 'vue-router';

const cocktails=ref([])
const router=useRouter()

const details=(cocktail) =>{
  router.push(`/cocktail/${cocktail.idDrink}`)
}

</script>
