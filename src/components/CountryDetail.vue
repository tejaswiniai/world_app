<template>
    <v-container v-if="country" class="country-container">
        <div  class="btn-div">
            <v-btn @click="countryList">Back</v-btn>
        </div>
     
        <div class="detail-container">
            <v-img :src="country.flags.png" :alt="country.name.common" width="500px" height="300px" />
            <v-card>
        
        <v-card-title>{{ country.name.common }}</v-card-title>
        
        <div class="detail-card">

          <v-card-text>
            <p>Native name: {{ country.name.nativeName.fra?.common}}</p>
            <p>Population: {{ country.population.toLocaleString() }}</p>
            <p>Region: {{ country.region }}</p>
            <p>Subregion: {{ country.subregion }}</p>
            <p>Capital: {{ country.capital[0] }}</p>

          </v-card-text>
          <v-card-text >
            <p>Top Level Domain: {{ country.tld[0] }}</p>
            <p>Currencies: {{ country.currencies.name }}</p>
            <p>Languages: {{ country.languages.eng }}</p>
          </v-card-text>
          </div>
          <div class="border-countries">
          <div>Border Countries : </div>         
          <div v-for="border in borderCountries" :key="border" ><v-btn @click="showDetail(border)">{{ border }}</v-btn></div>
         
        </div>
      </v-card>
      </div>
       
    </v-container>  
    <v-alert v-if="loading" type="info">Loading...</v-alert>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { fetchCountries } from '../services/api';
  import { Country } from '../types/country';
  export default defineComponent({
    name: 'CountryDetail',
    setup() {
      const country = ref<any>(null);
      const loading = ref(false);
      const error = ref('');
      const route = useRoute();
      const router = useRouter();
      const countries = ref<Country[]>([]);
      const borderCountries = ref<string[]>([]);

      watch(
      () => route.params.name,
      () => {
        fetchCountryDetails();
      }
    );
      const fetchCountryDetails = async () => {
        loading.value = true;
        const countryName = route.params.name as string;
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
          country.value = response.data[0]; 
          getBorderCountries(country.value.cca3)
          console.log(country.value)
        } catch (err) {
          error.value = 'Country not found or an error occurred';
        } finally {
          loading.value = false;
        }
      };

      const countryList = () => {
        router.push({ name: 'Home' });
      }

      const getBorderCountries = async (cca:string) => {
        countries.value = await fetchCountries();

        const selected = countries.value.find(
          (country) => country.cca3 === cca
        );
        if (selected?.borders) {
          // Map border codes to country names
          borderCountries.value = countries.value
            .filter((country) => selected.borders.includes(country.cca3))
            .map((country) => country.name.common);
        } else {
          borderCountries.value = [];
        }
    };
    const showDetail = (countryName : string) => {
     
            router.push({ name: 'CountryDetail', params: { name: countryName } });

        }
      onMounted(() => {
        fetchCountryDetails();
      });
  
      return { country, loading, error,countryList,getBorderCountries,borderCountries,showDetail };
    },
  });
  </script>
  

  <style lang="scss" scoped>
@import url('https://fonts.google.com/specimen/Nunito+Sans');
body {
    font-family: Nunito Sans;
    color: rgb(var(--v-theme-primary)) !important;
}
.btn-div{
    width: 100%;
    align-items: flex-start;
    justify-content: left;
}

.border-countries {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    padding: 10px;
  }
}
.detail-card {
  display: flex;
  flex-direction: row;
}
.country-container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: auto;
    gap: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
   
    
}
.detail-container{
    display: flex;
    flex-direction: row;
    gap: 70px;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 90vw;
    }
}
</style>
