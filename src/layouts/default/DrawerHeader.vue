<template>
  <v-list-item class="mb-0 pl-3" style="justify-content: center">
    <v-avatar class="company-logo-group">
      <v-img :src="imgSrc" />
    </v-avatar>

    <!--
    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h3" style="color:var(--v-info-base);">
      </v-list-item-title>
    </v-list-item-content>
    -->
  </v-list-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imgSrc = ref('') // Assuming you'll bind some dynamic image source
</script>

<style scoped>
.company-logo-group {
  margin-right: 0px !important;
}

.company-name-sub-title {
  font-size: 0.75em;
}
</style>
