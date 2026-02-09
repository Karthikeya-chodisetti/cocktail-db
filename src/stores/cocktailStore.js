import { defineStore } from "pinia";
import {
  searchCocktailByName,
  searchByIngredient,
  searchByLetter,
  getCocktailById,
} from "@/api/cocktailApi";

export const useCocktailStore = defineStore("cocktail", {
  state: () => ({
    cocktails:[],
    drink:null,
    ingredients:[],
  }),

  actions: {
    async fetchCocktailsByName(name, alcoholic){
      const data=await searchCocktailByName(name, alcoholic);
      this.cocktails=data.drinks || [];
    },

    async fetchCocktailsByIngredient(name){
      const data=await searchByIngredient(name);
      this.cocktails=data.drinks || [];
    },

    async fetchCocktailsByLetter(letter){
      const data=await searchByLetter(letter);
      this.cocktails=data.drinks || [];
    },

    async fetchCocktailDetails(id){
      const data=await getCocktailById(id);
      this.drink=data.drinks[0];
      this.ingredients=[];

      for(let i = 1;i<=15;i++){
        const item=this.drink[`strIngredient${i}`];
        if(item) this.ingredients.push(item);
      }
    },
  },
});
