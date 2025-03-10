<template>
    <div class="table-container">
        <h2>Ürün Listesi</h2>

        <div>
            <label>Sırala: </label>
            <select v-model="productStore.filter.sortType" @change="updateSortType">
                <option value="asc">Fiyata Göre Artan</option>
                <option value="desc">Fiyata Göre Azalan</option>
            </select>
        </div>

        <div id="loading" v-if="productStore.loading">Yükleniyor...</div>
        <div v-else-if="productStore.error">{{ productStore.error }}</div>
        <table v-else>
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Fiyat</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in productStore.sortedProducts" :key="product.id">
                    <td>{{ product.title }}</td>
                    <td>{{ product.price }}₺</td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button @click="prevPage" :disabled="productStore.filter.page === 1">Önceki</button>
            <span>Sayfa {{ productStore.filter.page }}</span>
            <button @click="nextPage">Sonraki</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from "@/store";
import { onMounted,watch } from "vue";


const router = useRouter();
const route = useRoute();
// Accessing Pinia store
const productStore = useProductStore();
onMounted(() => {
    const sortTypes = ["asc", "desc"];
        const {query} = route;

        const queryPageAsNumber = Number(query.page);
        const sortType = sortTypes.includes(query.sort) ? query.sort :productStore.filter.sortType;
        const page = queryPageAsNumber && queryPageAsNumber > 0 ? queryPageAsNumber : productStore.filter.page;

        if (sortType !== productStore.filter.sortType) {
           productStore.setSortType(sortType)
        }

        if (page !== productStore.filter.page) {
            productStore.setPage(page)
        }

        if (sortType !== query.sort || page !== queryPageAsNumber) {
            router.replace({
                query: {
                    page,
                    sort: sortType
                }
            })
        }
        
        productStore.fetchProducts();

      

});

watch(() => route.query.page, ()=>{
    productStore.fetchProducts();
})

watch(() => productStore.filter, ({page,sortType}) => {
    router.push({ query: { ...route.query, page, sort:sortType } });
})

const updateSortType = (event) =>{
    productStore.setSortType(event.target.value)
}

const nextPage = () => {
    productStore.setPage(productStore.filter.page + 1);
    // updateRouteWithPage();
}
const prevPage = () => {
    if (!productStore.filter.page <= 1)
        productStore.setPage(productStore.filter.page - 1);
        // updateRouteWithPage();
}

</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>