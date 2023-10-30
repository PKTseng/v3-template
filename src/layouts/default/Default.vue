<template>
  <v-layout class="rounded rounded-md">
    <v-progress-linear
      v-if="isProgressing"
      indeterminate
      style="position: fixed; top: 0; z-index: 999"
      :height="5"
      color="primary darken-2"
    ></v-progress-linear>

    <v-overlay :value="isPageLoading" z-index="999">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </v-overlay>

    <default-bar />

    <default-drawer />

    <default-view />

    <default-footer />
  </v-layout>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultDrawer from './Drawer.vue'
import DefaultView from './View.vue'
import DefaultFooter from './Footer.vue'

import { ref } from 'vue'

const isPageLoading = ref(false)
const isProgressing = ref(false)
</script>
