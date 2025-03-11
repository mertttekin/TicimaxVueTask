<template>
    <div class="table-container">
        <h2>Ürün Listesi</h2>

        <div>
            <label>Sırala: </label>
            <select v-model="productStore.filter.sortType" @change="updateSortType">
                <option v-for="type in sortTypes" :value=type :key=type>{{ sortData[type] }}</option>
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

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from "@/store";
import { onMounted, watch } from "vue";
import type { SortType } from '@/types';


const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const sortTypes:SortType[] = ["asc", "desc"];
const sortData: Record<SortType, string> = {
    asc: 'Fiyata Göre Artan',
    desc : 'Fiyata Göre Azalan'
}

onMounted(() => {
    const { query } = route;

    const queryPageAsNumber = Number(query.page);
    const sortType = query.sort && sortTypes.includes(query.sort.toString() as SortType) ? query.sort as SortType : productStore.filter.sortType;
    const page = queryPageAsNumber && queryPageAsNumber > 0 ? queryPageAsNumber : productStore.filter.page;

    if (sortType !== productStore.filter.sortType) {
        productStore.setSortType(sortType);
    }

    if (page !== productStore.filter.page) {
        productStore.setPage(page);
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

watch(() => route.query.page, () => {
    productStore.fetchProducts();
})

watch(productStore.filter, ({ page, sortType }) => {
    router.push({ query: { ...route.query, page, sort: sortType } });
},{deep:true})

const nextPage = () => {
    productStore.setPage(productStore.filter.page + 1);
}
const prevPage = () => {
    if (!(productStore.filter.page <= 1))
        productStore.setPage(productStore.filter.page - 1);
}
const updateSortType = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    
    productStore.setSortType(target.value as SortType);
};


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