<template>
    <v-card class="pa-6">
        <v-select
            v-model="drink"
            :items="['Cocktail' , 'Ingredients']"
            label="search By"
            class="mb-3"
        > </v-select>

        <v-text-field
            v-model="val"
            label="Search"
            placeholder="Type and press Enter"
            @keyup.enter="search"
        ></v-text-field>

        <v-btn class="ma-2" @click="search"> Search </v-btn>
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