<template>
  <v-app-bar
    color="primary"
    id="default-app-bar"
    app
    position="absolute"
    border-style="bottom"
    prominent
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        variant="text"
        @click="drawerVisibility = !drawerVisibility"
      />
    </template>

    <AppBarToggle class="hidden-sm-and-down" />
    <!-- <v-spacer></v-spacer> -->
    <v-toolbar-title class="font-weight-bold text-h4 pl-2">
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <default-account class="ml-5" />
  </v-app-bar>
</template>
<script setup lang="ts">
import DefaultAccount from './AppBarAccount.vue'
import AppBarToggle from './AppBarToggle.vue'
import { ref } from 'vue'

const title = ref('APIM')
const drawerVisibility = ref(false)
</script>

<style scoped></style>
