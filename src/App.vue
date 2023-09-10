<template>
  <div id="app">
    <div class="row">
      <div class="col-3">
        <NavbarApp/>
      </div>
      <div class="col-9" style="background: linear-gradient(to top, #000000, #363636); margin-left: -0.75rem; padding-bottom: 10%;">
        <ContentApp/>
      </div>
    </div>
    <PlayMusic/>
  </div>
</template>

<script>
import NavbarApp from './components/NavbarApp.vue';
import PlayMusic from './components/PlayMusic.vue';
import ContentApp from './components/ContentApp.vue';
export default {

  components: {
    NavbarApp,
    PlayMusic,
    ContentApp
  }
}
</script>

<style>
@import './assets/main.css';
</style>
