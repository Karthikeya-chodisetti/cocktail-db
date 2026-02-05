<template>
  <v-container>
    
    <result @results="cocktails=$event" />

    <div v-if="cocktails.length" class="mt-3">
      <h3>Search Results:</h3>
      <ul>
        <li v-for="(cocktail,index) in cocktails" :key="index">{{ cocktail.strDrink }}</li>
      </ul>
    </div>

  </v-container>
</template>

<script setup>

import { ref } from 'vue'
import result from '../components/temp.vue'

const cocktails=ref([])

</script>
