<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawerVisibility"
    :location="'left'"
    :mini-variant="drawerIsMini"
    mini-variant-width="80"
    app
    width="260"
  >
    <DefaultDrawerHeader />
    <v-divider class="mx-3 mb-2" />
    <div class="menu">
      <DefaultList :items="menuList" />

      <div class="version">
        <span>Web Version : {{ webVersion }}</span>
        <span>Server Version : {{ serverVersion }}</span>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultDrawerHeader from './DrawerHeader.vue'
import DefaultList from './DrawerList.vue'

// State and refs
const drawerVisibility = ref(true)
const menuList = ref([])
const drawerIsMini = ref(false)
const webVersion = import.meta.env.VERSION
const serverVersion = JSON.parse(localStorage.getItem('serverVersion')!)
</script>

<style lang="scss" scoped>
#default-drawer {
  background-color: var(--v-secondary-base);
  height: 100vh;

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90vh;

    .version {
      display: flex;
      flex-direction: column;

      color: #000;
      padding: 40px 12px 12px 12px;
      font-size: 12px;
    }
  }
}
</style>
