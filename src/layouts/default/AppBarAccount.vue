<template>
  <v-menu bottom left min-width="200px" offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        :style="{
          backgroundColor: 'var(--v-text-primary-base)',
          color: 'var(--v-text-accent-base)'
        }"
        class="ml-2"
        min-width="0"
        fab
        x-small
        depressed
        v-bind="props"
      >
        <v-icon size="1.5rem">mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list :tile="false" nav>
      <template v-for="(p, i) in profile">
        <v-divider v-if="i > 0" :key="i" />

        <v-list-item
          v-for="(item, i) in profile"
          :key="i"
          :value="item"
          color="primary"
          rounded="xl"
          @click="onItemClick(p)"
        >
          <v-list-item-title> {{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// import { useUserStore } from '@/store/user'

const profile = ref([{ title: 'Log out' }])

const onItemClick = async (p: { title: string; divider?: boolean }) => {
  if (p.title === 'Log out') {
    console.log('Log out')
    // const { logout: _logout } = useUserStore()
    // _logout()
  }
}
</script>
