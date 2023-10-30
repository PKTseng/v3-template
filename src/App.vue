<template>
  <router-view />
</template>

<script setup lang="ts">
import { provideAuthStore } from '@/store/AuthStore'
import { provideGlobalStore } from '@/store/GlobalStore'
provideAuthStore()
provideGlobalStore()
</script>
