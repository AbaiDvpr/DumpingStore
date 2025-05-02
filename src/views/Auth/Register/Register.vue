<template>
    <div class="register-page">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" required><br>

            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required><br>

            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required><br>

            <label for="phone">Phone:</label>
            <input type="text" v-model="phone" id="phone"><br>

            <button type="submit">Register</button>
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
            username: '',
            password: '',
            phone: '',
            errorMessage: ''
        };
    },
    methods: {

        handleRegister() {
  const payload = {
    email: this.email,
    username: this.username,
    password: this.password,
    phone: this.phone
  };

  axios.post('http://127.0.0.1:8000/api/user/register/', payload)
    .then((response) => {
      if (response.status === 201) {
        this.$router.push('/login');
      } else {
        this.errorMessage = 'Unexpected server response.';
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          const errors = Object.values(data).flat().join(' ');
          this.errorMessage = errors || 'Registration failed!';
        } else {
          this.errorMessage = data || 'Registration failed!';
        }
      } else {
        this.errorMessage = 'Server is unreachable.';
      }
    });
},


        async handleRegister2() {
            const payload = {
                email: this.email,
                username: this.username,
                password: this.password,
                phone: this.phone
            };

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/user/register/', payload);
                if (response.status === 201) {
                    // Handle success, for example, redirect to login page
                    this.$router.push('/login');
                }
            } catch (error) {
                console.log(error)
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data.detail || 'Registration failed!';
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped src="./Register.scss"></style>
