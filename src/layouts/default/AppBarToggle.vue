<template>
  <v-btn class="ml-3 mr-4" elevation="1" fab small @click="drawerIsMini = !drawerIsMini">
    <v-icon> {{ drawerIsMini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }} </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
// import { useAppStore } from '@/store/app'
// import { computed } from 'vue'
import { ref } from 'vue'

const drawerIsMini = ref(false)

// const store = useAppStore()

// const drawerIsMini = computed({
//   get: () => store.drawerIsMini,
//   set: (v) => {
//     store.drawerIsMini = v
//   }
// })
</script>
