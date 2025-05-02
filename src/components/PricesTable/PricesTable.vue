<template>
    <div class="table-wrapper">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Фото</th>
                    <th>URL</th>
                    <th>Кол-во</th>
                    <th>my price</th>
                    <th>market price</th>

                    <th>Активный</th>
                    <th>Обновлено</th>
                    <th>Place product</th>
                    <th>Дэмпинг status</th>
                    <th>min price</th>

                    <th>Конкурентная цена</th>
                    <th>Комментарий</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td><img :src="item.url_photo" alt="Фото" class="thumb" /></td>
                    <td><a :href="item.url_link" target="_blank">Открыть</a></td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.my_price }} ₸</td>
                    <td>{{ item.market_price }} ₸</td>
                    

                    <td :class="{ active: item.active }">
                        {{ item.active ? 'Да' : 'Нет' }}
                    </td>
                    <td>{{ item.updated_at }}</td>
                    <td :class="{ dumping: item.my_place }">
                        {{ item.my_place }}
                    </td>

                    <td>
                        <DumpToggle :value="item.is_dumping" @toggle="val => toggleDumping(item.id, val)" />
                    </td>
                    <MinPriceInput :initialPrice="item.min_price" :id="item.id" @save="saveMinPrice" />


                    <td>{{ item.competitor_price }} ₸</td>
                    <td>{{ item.comment }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DumpToggle from '@/components/DumpToggle/DumpToggle.vue';
import MinPriceInput from '@/components/MinPriceInput/MinPriceInput.vue';

export default {
    components: { DumpToggle, MinPriceInput },

    name: 'PricesTable',
    props: {
        tableData: Array, // Передаётся из родителя
    },
    methods: {
        toggleDumping(id, value) {
            const item = this.tableData.find(i => i.id === id);
            if (item) {
                item.is_dumping = value;
                // TODO: отправить на сервер или Vuex
            }
        },
        saveMinPrice({ id, price }) {
            console.log(`Save min price: ${price} for item ${id}`);
            // Здесь можно отправить на бэкенд
        }
    },
};
</script>
<style lang="scss" scoped src="./PricesTable.scss"></style>
