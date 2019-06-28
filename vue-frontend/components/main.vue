<template>
  <v-app>

    <v-toolbar app flat>
 
    <v-container mx-auto py-0>
      <v-layout>
       
        <v-btn
          v-for="(link, i) in this.$store.state.links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
         
        >
          {{ link.text }}
        </v-btn>
        <v-spacer />
        <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />
      </v-layout>
    </v-container>
  </v-toolbar>

    <v-content>
      <v-container>
        <keep-alive include="list-component">
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-content>

    <v-footer class="py-4" dark height="auto">
      <v-container mx-auto>
        <v-layout wrap>
          
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>