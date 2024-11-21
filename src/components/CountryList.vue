


<!-- src/components/CountriesList.vue -->
<template>
    <div class="countries-list">       
        <div v-if="loading">Loading...</div>       
        <div v-else > 
            <div class="search-filter">
                <div class="search-input">
               
                            <v-text-field                
                                prepend-inner-icon="mdi-magnify"
                                density="default"
                                label="Search for a country..."
                                variant="solo"                
                                hide-details
                                single-line           
                                v-model="searchInput"
                                @input="onSearch"        
                    ></v-text-field>
                    
            </div>
            <div class="select-filter">    
                <v-select  :items="regions" label="Filter by Region" v-model="filterByRegion" @update:modelValue="filterRegion" variant="solo-inverted"></v-select>
            </div>
        </div>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <div v-else class="country-container">
            <v-card
            class="mx-auto country-card"
            v-for="country in countries" :key="country.name.common"
                @click="showDetail(country.name.common)"
            >
                <v-img class="flag-img lazyload" :src="country.flags.png" cover></v-img>

                    <v-card-title>
                    {{ country.name.common }}
                    </v-card-title>
                    <v-card-subtitle>
                    <span class="country-subtitle">Population:</span> {{ country.population }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                    <span class="country-subtitle">Region:</span>  {{ country.region }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                    <span class="country-subtitle">Capital:</span>  {{ country.capital ? country.capital[0] : 'No capital' }}
                    </v-card-subtitle>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted  } from 'vue';
import { fetchCountries,fetchCountry,fetchCountryByRegion } from '../services/api';
import { Country } from '../types/country';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'CountriesList',
    setup() {
        const countries = ref<Country[]>([]);
        const loading = ref(true);
        const error = ref<string | null>(null);       
        const searchInput = ref<string>("");
        const router = useRouter();
        const filterByRegion = ref<string>("All");
           
        const regions = ref<string[]>([
          'All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'
            ]);


        const loadCountries = async () => {
            error.value="" ; 
            try {
                countries.value = await fetchCountries();
                console.log( countries.value)
            } catch (err) {
                error.value = 'Failed to load countries';
            } finally {
                loading.value = false;
            }
        };

        const onSearch = async () => {
            if (!searchInput.value.trim()) {
                error.value="" ;             
                return;
            }
            try {
                
                countries.value = await fetchCountry(searchInput.value);
                
            } catch (err) {
                console.log(err)
                error.value = 'Matching country not found';
            } finally {
                loading.value = false;
            }
        };

        const showDetail = (countryName : string) => {
            router.push({ name: 'CountryDetail', params: { name: countryName } });

        }

        const filterRegion = async() => {
          
            if (!filterByRegion.value.trim()) {
                error.value="" ;             
                return;
            }

            try {
                if (filterByRegion.value == 'All') {
                    countries.value = await fetchCountries();
            } else {
                countries.value = await fetchCountryByRegion(filterByRegion.value);
            }
           return;
                
            } catch (err) {
                console.log(err)
                error.value = 'Matching country not found';
            } finally {
                loading.value = false;
            }
        }

      

        onMounted(loadCountries);

        return {
            countries,
            loading,
            error,
            onSearch,
            searchInput,
            showDetail,
            filterByRegion,
            filterRegion,
            regions
        };
    },
});
</script>

<style scoped>
@import url('https://fonts.google.com/specimen/Nunito+Sans');
body {
    font-family: Nunito Sans;
    color: rgb(var(--v-theme-primary)) !important;
}

.region-dropdown {
    width:100px;
    

}

.search-filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 80%;
        justify-content: flex-start;
        text-align: left;
        gap: 40px;
    }
}
.select-filter{
    width:300px;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 50vw;
        justify-content: flex-start;
        text-align: left;
    }
   
}

.search-input{
    width:400px;
    @media (max-width: 768px) {
        width:50vw;
    }
}
.country-subtitle {
    font-weight: 800;
}
.countries-list {
    padding: 20px;
    width: 100%;
    
}
.country-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: auto;
    gap: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: center;
    @media (max-width: 768px) {
        width: 90%;
    }
    
}
.countries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
}

.country-card img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
}
.flag-img {
    width:200px;
    height:100px;
    cursor: pointer;
}
.country-card {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    max-width: calc(25% - 10px);
    width: calc(25% - 10px);
    height: 300px;
    position: relative;
    text-align: left;
    padding-bottom: 30px;
    @media (max-width: 768px) {
        height: 300px;
      flex: calc(100% - 10px);
      max-width: calc(100% - 10px);
    }
}
</style>
