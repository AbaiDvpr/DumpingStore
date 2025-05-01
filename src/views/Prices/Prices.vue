<template>
    <div class="prices-page">
        <h1>Цены</h1>
        <div class="content">
            <!-- Здесь можно отобразить таблицу цен или карточки -->
            <p>Тут будет список ценовых предложений.</p>
        </div>

        <PricesTable :tableData="prices" />

    </div>
</template>

<script>
import PricesTable from '@/components/PricesTable/PricesTable.vue';

export default {
    name: 'Prices',
    components: {
        PricesTable,
    },
    data() {
        return {
            prices: [
                {
                    id: 1,
                    photo: 'https://resources.cdn-kaspi.kz/img/m/p/hb3/h8a/87327387680798.jpg?format=gallery-medium',
                    url: 'https://example.com/item/1',
                    quantity: 10,
                    sale_price: 4990,
                    active: true,
                    updated_at: '2025-05-01',
                    is_dumping: false,
                    competitor_price: 5200,
                    comment: 'Все ок',
                    my_place:2,
                    min_price:null
                },
                // ещё данные...
            ],
        };
    },
};
</script>

<style lang="scss" scoped src="./Prices.scss"></style>