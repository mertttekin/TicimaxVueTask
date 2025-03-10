<template>
    <div class="table-container">
      <h2>Ürün Listesi</h2>
      
      <!-- Eğer loading true ise 'Yükleniyor...' mesajını göster -->
      <div v-if="loading">Yükleniyor...</div>
      
      <!-- Eğer loading false ise 'Sorun' mesajını göster -->
      <div v-else>Sorun</div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    computed: {
      ...mapState({
        loading: state => state.loading,  // Vuex store'dan loading state'ini al
      }),
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  div {
    margin-top: 10px;
  }
  </style>
  