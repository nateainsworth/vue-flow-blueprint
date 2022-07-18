<template>

    <VueFlowView />

</template>

<script>
import VueFlowView from './components/Dashboards/VueFlowView.vue'

export default {
  name: 'App',
  components: {
    VueFlowView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
