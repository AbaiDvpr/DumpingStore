<template>
    <div class="login-page">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" required><br>

            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required><br>

            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            const payload = {
                email: this.email,
                password: this.password
            };

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/user/login/', payload);
                if (response.status === 200) {
                    // Store token and handle successful login
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('user_id', response.data.user_id);
                    localStorage.setItem('email', response.data.email);

                    this.$router.push('/');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data.detail || 'Login failed!';
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped src="./Login.scss"></style>
