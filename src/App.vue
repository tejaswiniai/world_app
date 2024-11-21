<template>
  <div id="app">
      <CountryHeader :isDarkTheme="isDarkTheme" @toggleTheme=toggleTheme />
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed  } from 'vue';
import CountriesList from './components/CountryList.vue';
import CountryHeader from './components/CountryHeader.vue';
import { useTheme  } from 'vuetify';
import "lazysizes";
export default defineComponent({
  name: 'App',
  components: {
      CountriesList,
      CountryHeader
  },
  setup() {
    const theme = useTheme ();

    const isDarkTheme = computed(() =>theme.global.name.value === 'dark');
    const toggleTheme = () => {
      theme.global.name.value = isDarkTheme.value ? 'light' : 'dark';
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
 background: rgb(var(--v-theme-background));
}
</style>