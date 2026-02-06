<template>
  <v-app>

    <v-app-bar scroll-behavior="fade-image hide" color="light-blue-lighten-4" image="https://fastly.picsum.photos/id/1056/1920/1080.jpg?hmac=QYMVMuFjmtGsWKQU_ICfJkVQXngKzlZYH0YO7BbgYGY">
      <v-toolbar-title> TheCocktailDB </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>
