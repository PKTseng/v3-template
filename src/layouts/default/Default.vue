<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model:rail="drawerOpen" rail-width="80">
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <default-view />
  </v-layout>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue'

import { ref } from 'vue'

const drawerOpen = ref(false)
</script>
