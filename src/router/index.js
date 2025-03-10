import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "@/views/ProductList.vue";
// import TestList2 from "@/views/TestList2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: ProductList,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
