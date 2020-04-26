<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="closeSidebarPanel"
      v-if="isPanelOpen"
    ></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot>
          <ul>
            <li @click="closeSidebarPanel">
              <nuxt-link to="/" :class="$route === '/' ? 'is-active' : ''">Acceuil</nuxt-link>
            </li>
            <li @click="closeSidebarPanel">
              <nuxt-link to="/project" :class="$route === '/project' ? 'is-active' : ''">Projets</nuxt-link>
            </li>
            <li @click="closeSidebarPanel">
              <nuxt-link to="/contact" :class="$route === '/contact' ? 'is-active' : ''">Contactez</nuxt-link>
            </li>
          </ul>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
/* es-lint-disable */
export default {
  methods: {
    closeSidebarPanel () {
      return this.$store.commit('toggle')
    }
  },
  computed: {
    isPanelOpen () {
      return this.$store.state.isNavOpen
    }
  }
}
</script>

<style lang="scss" >
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 900;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: $background-menu;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  width: 25.4133333vw;
  padding-top: 3.3333333vw;
  padding-left: 3.3333333vw;
  display: grid;
  grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
  row-gap: 1.666666667vw;
  ul{
    grid-row: row-2/row-2;
    font-size: 50px;
    font-family: 'Roboto-bold', 'Roboto', Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    line-height: 55px;
    font-weight: bold;
    a{
      text-decoration: none;
      color:black;
    }
    a.nuxt-link-exact-active{
      color: transparent;
      -webkit-text-stroke: 1px black;
    }
  }
}
</style>
