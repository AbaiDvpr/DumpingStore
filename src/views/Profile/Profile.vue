<template>
    <Main>
        <div class="profile-page">
            <h1>Профиль пользователя</h1>

            <div class="profile-card">
                <img class="avatar" :src="user.avatar" alt="Аватар" />
                <div class="info">
                    <h2>{{ user.name }}</h2>
                    <p>Магазин: {{ user.storeName }}</p>
                    <p>Email: {{ user.email }}</p>
                    <p>Роль: {{ user.role }}</p>
                    <p>Последний вход: {{ user.lastLogin }}</p>
                </div>
            </div>
        </div>
    </Main>
</template>

<script>
import Main from '@/components/Main/Main.vue';

export default {
    name: 'Profile',
    components: { Main },

    data() {
        return {
            user: {
                name: 'Аблай Абишев',
                storeName: 'IT-Market.kz', // ← Название магазина
                email: 'ablay@example.com',
                role: 'Администратор',
                lastLogin: '2025-04-30 23:12',
                avatar: 'https://avrorastore.ru/upload/medialibrary/641/6416697240b7d91bbe01e782cbba0c7f.jpg',
            },
        };
    },
};
</script>


<style lang="scss" scoped src="./Profile.scss"></style>
