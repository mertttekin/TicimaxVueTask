import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    sortType: "asc",
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_SORT(state, sortType) {
        state.sortType = sortType;
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const limit = 10;
        const skip = (state.currentPage - 1) * limit;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        commit("SET_PRODUCTS", response.data.products);
      } catch (error) {
        commit("SET_ERROR", "Ürünler yüklenirken hata oluştu!");
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    sortedProducts(state) {
      return state.products
        .slice()
        .sort((a, b) =>
          state.sortType === "asc" ? a.price - b.price : b.price - a.price
        );
    },
  },
});
