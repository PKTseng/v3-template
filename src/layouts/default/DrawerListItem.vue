<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    :to="item.to"
    active-class="primary white--text"
    link
    class="py-1"
    v-bind="$attrs"
  >
    <v-list-item-avatar v-if="item.avatar">
      <v-img :src="item.avatar" />
    </v-list-item-avatar>

    <v-list-item-icon class="align-self-center">
      <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content v-if="item.title">
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface ListItem {
  href?: string
  to?: string
  avatar?: string
  icon?: string
  title?: string
}

const props = defineProps<{
  item: ListItem
}>()

const item = props.item || {}
</script>
