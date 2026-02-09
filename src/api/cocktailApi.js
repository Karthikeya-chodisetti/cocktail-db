const common="https://www.thecocktaildb.com/api/json/v1/1";

export const searchCocktailByName=async (name, alcoholic = false) => {
  let url=`${common}/search.php?s=${name}`;
  if(alcoholic){
    url += "&a=Alcoholic";
  }
  const res=await fetch(url);
  return await res.json();
};

export const searchByIngredient=async (ingredient) => {
  const res=await fetch(`${common}/filter.php?i=${ingredient}`);
  return await res.json();
};

export const searchByLetter=async (letter) => {
  const res=await fetch(`${common}/search.php?f=${letter}`);
  return await res.json();
};

export const getCocktailById=async (id) => {
  const res=await fetch(`${common}/lookup.php?i=${id}`);
  return await res.json();
};
