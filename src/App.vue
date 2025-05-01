<template>
  <div id="ap" class="app-layout">
    <SideBar />
    <Main>
      <router-view />
    </Main>
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
  }
}
</script>

<style lang="scss">
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f0f0f0;
}
</style>
