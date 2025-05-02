<template>
  <div id="ap">
    <template   v-if="!isAuthPage">
      <div  class="app-layout">
        <SideBar />
      <Main>
        <router-view />
      </Main>
      </div>
     
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import SideBar from './components/SideBar/SideBar.vue'
import Main from './components/Main/Main.vue'

export default {
  name: 'App',
  components: {
    SideBar,
    Main
  },
  computed: {
    isAuthPage() {
      return ['/login', '/register'].includes(this.$route.path)
    }
  },
  watch: {
    '$route.path'() {
      // перерендерится автоматически благодаря computed
    }
  }
}
</script>

<style lang="scss">
.app-layout {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr;
  width: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
}
</style>
