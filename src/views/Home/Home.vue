<template>
    <div class="page">
        <div class="content">
            <h1>🤖 Я — бот-демпингер Kaspi</h1>
            <p>
                Моя задача — отслеживать и сбивать цены конкурентов на маркетплейсе Kaspi.
                Чтобы продолжить, пожалуйста, перейдите к таблице для мониторинга.
            </p>
            <img src="https://cdn.sites.admitad.ru/www.admitad.ru/2023/08/admitad-bot-blog.png" alt="Kaspi Bot"
                class="bot-image" />
            <button @click="redirectToTable">Перейти к таблице</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        redirectToTable() {
            this.$router.push('/prices'); // Убедитесь, что маршрут '/table' существует
        }
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>
