import { createRouter, createWebHistory } from 'vue-router';
import CountryList from '../components/CountryList.vue';
import CountryDetail from '../components/CountryDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CountryList,
  },
  {
    path: '/country/:name',
    name: 'CountryDetail',
    component: CountryDetail,
    props: true, // Allow route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
