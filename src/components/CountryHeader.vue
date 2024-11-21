<script setup lang="ts">


const props = defineProps({
    isDarkTheme: {
    type: String,
    required: true,
  } 
});
defineEmits(['toggleTheme']);

</script>
<template>
    <div class="header-container">
        <div class="where-block"><span class="where-text">Where in the world?</span></div>
        <div class="theme-block"> <v-btn style="text-transform:  capitalize !important;" variant="plain" @click="$emit('toggleTheme')" class="mb-4">
            <v-icon
          icon="mdi-moon-waning-crescent"
          end
        ></v-icon>{{ props.isDarkTheme ? 'Dark' : 'Light' }} Mode
        </v-btn>
        </div>
    </div>
   
</template>



<style scoped>
@import url('https://fonts.google.com/specimen/Nunito+Sans');
body {
    font-family: Nunito Sans;
    color: rgb(var(--v-theme-primary)) !important;
    
}
.header-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    background-color: rgb(var(--v-theme-secondary)) !important;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 100vw;
        justify-content: flex-start;
        text-align: left;
    }
}
.where-text{
    font-weight: 800;
    color: rgb(var(--v-theme-primary)) !important;
}

.theme-block {
    color: rgb(var(--v-theme-primary)) !important;
    background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>
