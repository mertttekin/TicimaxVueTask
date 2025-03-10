<template>
    <div class="table-container">
        <h2>Ürün Listesi</h2>

        <div>
            <label>Sırala: </label>
            <select id="sort" v-model="sortType" @change="updateSort">
                <option value="asc">Fiyata Göre Artan</option>
                <option value="desc">Fiyata Göre Azalan</option>
            </select>
        </div>

        <div id="loading" v-if="loading">Yükleniyor...</div>
        <div v-else-if="error">{{ error }}</div>
        <table v-else>
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Fiyat</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in sortedProducts" :key="product.id">
                    <td>{{ product.title }}</td>
                    <td>{{ product.price }}₺</td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Önceki</button>
            <span>Sayfa {{ currentPage }}</span>
            <button @click="nextPage">Sonraki</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState(["loading", "error", "currentPage", "sortType"]),
        ...mapGetters(["sortedProducts"]),
        sortType: {
            get() {
                return this.$store.state.sortType;
            },
            set(value) {
                this.$store.commit("SET_SORT", value);
            },
        },
    },
    methods: {
        ...mapActions(["fetchProducts"]),
        updateSort() {
            this.$store.commit("SET_SORT", this.sortType);
        },
        nextPage() {
            this.$store.commit("SET_PAGE", this.currentPage + 1);
            this.$router.push({ query: { ...this.$route.query, page: this.$store.state.currentPage } });

        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$store.commit("SET_PAGE", this.currentPage - 1);
                this.$router.push({ query: { ...this.$route.query, page: this.$store.state.currentPage } });
            }
        },
    },
    watch: {
        '$route.query.page': function () {
            this.fetchProducts();
        }
    },
    created() {
        const sortTypes = ["asc", "desc"];
        const query = this.$route.query;

        const queryPageAsNumber = Number(query.page);
        const sortType = sortTypes.includes(query.sort) ? query.sort : this.$store.state.sortType;
        const page = queryPageAsNumber && queryPageAsNumber > 0 ? queryPageAsNumber : this.$store.state.currentPage;

        if (sortType !== query.sort || page !== queryPageAsNumber) {
            this.$router.replace({
                query: {
                    page,
                    sort: sortType
                }
            })
        }

        if (sortType !== this.$store.state.sortType) {
            this.$store.commit("SET_SORT", sortType);
        }

        if (page !== this.$store.state.currentPage) {
            this.$store.commit("SET_PAGE", page);
        }

        this.fetchProducts();
    },


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