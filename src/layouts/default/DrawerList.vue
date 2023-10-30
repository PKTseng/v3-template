<script lang="tsx">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import DrawerListItem from './DrawerListItem.vue'
import type { menuItem } from '@/store/app'

interface MenuItem {
  title: string
  icon?: string
  to: string
  children?: menuItem[]
}

export default defineComponent({
  name: 'DrawerList',
  components: {
    DrawerListItem
  },
  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      default: () => []
    }
  },
  methods: {
    renderChildrenVNode(items?: MenuItem[]) {
      if (!items) return null

      return items.map((item, idx) => {
        if (item.children) {
          return (
            <v-list-group no-action>
              {{
                activator: () => (
                  <>
                    <v-list-item-icon>{item.icon && <v-icon>{item.icon}</v-icon>}</v-list-item-icon>
                    <v-list-item-title>{item.title}</v-list-item-title>
                  </>
                ),
                default: () => this.renderChildrenVNode(item.children)
              }}
            </v-list-group>
          )
        }
        return <drawer-list-item key={idx} item={item} />
      })
    }
  },
  render() {
    return (
      <v-list expand nav v-slots={{ ...this.$slots, ...this.$attrs }}>
        {this.renderChildrenVNode(this.items)}
      </v-list>
    )
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  &.v-list {
    padding: 0;
  }
  .v-list-item {
    border-radius: 0;
    padding: 4px 1.2rem !important;
    * {
      color: var(--v-text-accent-base);
    }
    &__title {
      font-size: 1rem;
    }
  }

  .v-list-group {
    &__header {
      padding-top: 4px;
      padding-bottom: 4px;
    }
    &__items {
      margin-top: -8px;
      background-color: var(--v-text-primary-base);
    }
  }
}
</style>
