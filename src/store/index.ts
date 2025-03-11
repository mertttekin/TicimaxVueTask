// src/store/index.js
import { defineStore } from "pinia";
import axios from "axios";
import type { State } from "@/types";

export const useProductStore = defineStore("product", {
  state: (): State => ({
    products: [],
    loading: false,
    error: null,
    filter: {
      page: 1,
      sortType: "asc",
    },
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;

      try {
        const limit = 10;
        const skip = (this.filter.page - 1) * limit;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );

        this.products = response.data.products;
      } catch (error) {
        this.error = "Ürünler yüklenirken hata oluştu!";
      } finally {
        this.loading = false;
      }
    },

    setPage(page: State["filter"]["page"]) {
      this.filter.page = page;
    },

    setSortType(sortType: State["filter"]["sortType"]) {
      this.filter.sortType = sortType;
    },
  },
  getters: {
    sortedProducts(state) {
      return state.products
        .slice()
        .sort((a, b) =>
          state.filter.sortType === "asc"
            ? a.price - b.price
            : b.price - a.price
        );
    },
  },
});
