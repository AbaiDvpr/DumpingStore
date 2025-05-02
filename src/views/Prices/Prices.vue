<template>
    <div class="prices-page">
        <h1>Мои товары</h1>
        <div class="content">
            <!-- Здесь можно отобразить таблицу цен или карточки -->
            <p v-if="loading">Загрузка...</p>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>

        <PricesTable :tableData="prices" />
    </div>
</template>

<script>
import axios from 'axios';
import PricesTable from '@/components/PricesTable/PricesTable.vue';

export default {
    name: 'Prices',
    components: {
        PricesTable,
    },
    data() {
        return {
            prices: [],  // Array to store the prices
            loading: true,  // Loading state
            errorMessage: '',  // Error message state
        };
    },
    mounted() {
        this.fetchPrices();
    },
    methods: {
        async fetchPrices() {
            const userId = localStorage.getItem('user_id');  // Replace this with dynamic user ID
            const token =  localStorage.getItem('token');  // Replace this with actual token

            try {
                console.log(userId)
                console.log(token)


                const response = await axios.get(`http://127.0.0.1:8000/api/kaspi/table/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                // Assuming the API returns the data in a field called 'data'
                this.prices = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.errorMessage = 'Ошибка загрузки данных';
                console.error(error);
            }
        },
    },
};
</script>



<style lang="scss" scoped src="./Prices.scss"></style>