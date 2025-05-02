<template>
    <Main>
        <div class="profile-page">
            <h1>Профиль пользователя</h1>

            <div v-if="isLoading" class="loading">Загрузка...</div>

            <div v-else-if="user" class="profile-card">
                <img class="avatar"  src="https://www.roseltorg.ru/themes/etp/images/telegram-page/img-2.svg" alt="Аватар" />
                <div class="info">
                    <h2>{{ user.username }}</h2>
                    <p>Email: {{ user.email }}</p>
                    <p>Телефон: {{ user.phone }}</p>
                    <p>Статус: {{ user.dumpStatus || 'Не указан' }}</p>
                </div>
            </div>

            <div v-else class="error">
                <p>Не удалось загрузить данные профиля. Пожалуйста, попробуйте позже.</p>
            </div>

            <!-- Logout Button -->
            <button @click="logout" class="logout-button">Выйти</button>
        </div>
    </Main>
</template>

<script>
import axios from 'axios';
import Main from '@/components/Main/Main.vue';

export default {
    name: 'Profile',
    components: { Main },
    data() {
        return {
            user: null,
            isLoading: true,
            error: null,
        };
    },
    created() {
        this.fetchUserProfile();
    },
    methods: {
        async fetchUserProfile() {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');


            console.log(token)

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/user/${user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                console.log('User data:', response.data);
                this.user = response.data; // Сохраняем данные пользователя
                this.isLoading = false; // Останавливаем загрузку

            } catch (error) {
                this.isLoading = false; // Останавливаем загрузку в случае ошибки

                if (error.response) {
                    console.error('Error fetching user data:', error.response.data);
                    // alert('Ошибка при загрузке данных пользователя. Пожалуйста, попробуйте позже.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    // alert('Ошибка связи с сервером. Пожалуйста, попробуйте позже.');
                } else {
                    console.error('Error:', error.message);
                    // alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/login';
        },
    },
};
</script>


<style lang="scss" src="./Profile.scss"></style>
