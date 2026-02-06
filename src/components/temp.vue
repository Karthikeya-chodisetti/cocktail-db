<template>
    <v-card class="pa-4 bg-blue-grey-lighten-5" variant="outlined" rounded="xl">
        
        <v-row>
        <v-col cols="12" md="1"> </v-col>
        <v-col cols="12" md="4">
        <v-select
            v-model="drink"
            :items="['Cocktail','Ingredients']"
            label="search By"
            class="mb-3"
        > </v-select>
        </v-col>

        <v-col  cols="12" md="5">
        <v-text-field
            v-model="val"
            label="Search"
            placeholder="Type and press Enter"
            @keyup.enter="search"
        ></v-text-field>
        </v-col>

        <v-col  cols="12" md="2">
        <v-btn class="ml-2" icon="mdi-magnify" @click="search"></v-btn>
        </v-col>

        </v-row>
    </v-card>
</template>

<script setup>

import {ref} from "vue";

const drink=ref('Cocktail');
const val=ref('');

const emit=defineEmits(['results'])

const search = async() => {
    let url=''
    if(drink.value === 'Cocktail'){
        url=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val.value}`
    }else{
        url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${val.value}`
    }

    const result=await fetch(url)
    const data=await result.json()

    emit('results', data.drinks)
}

</script>

<style scoped>

.custom-card {
  background-color: green;
}

</style>
