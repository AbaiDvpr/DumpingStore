<template>
    <Main>
        <div class="settings-page">
            <h1>Настройки</h1>

            


            <div v-if="user?.KaspiStatus == true">
                <p>  ✅ Соединение с Каспи успешно</p>
            </div>

            <div v-if="user?.KaspiStatus == false">
                <p>   ❌ Ошибка соединения. Пожалуйста, попробуйте снова.</p>
            </div>



            <div v-if="user?.KaspiStatus == null">
                <p> ℹ️ Попробуйте сделать connect.</p>
            </div>



            <br>

            <!-- Enable Price Dumping Section -->
            <div class="setting-card"  v-if="user?.KaspiStatus == true">
                <div class="setting-info">
                    <h2>Включить демпинг цен</h2>
                    <p>Разрешить автоматическое снижение цен до минимального порога.</p>
                </div>
                <label class="switch">
                    <input type="checkbox" v-model="enableDumping" />
                    <span class="slider"></span>
                </label>
            </div>

            <!-- Kaspi Connection Section -->

            <!-- {{ user }} -->
            <div class="setting-card" v-if="user?.KaspiStatus != true && user?.KaspiStatusCode  != 2">
                <div class="setting-info">
                    <h2>Соединить с Каспи</h2>
                    <p>Проверьте статус соединения с Каспи.</p>
                </div>
                <button @click="checkKaspiConnection">Проверить соединение:3</button>
                <p v-if="kaspiStatus !== null">
                    Статус соединения с Каспи: {{ kaspiStatus }}
                </p>
            </div>


            <div class="setting-card" v-if="user?.KaspiStatus != true && user?.KaspiStatusCode  == 2">
               
                <p >
                   Идет работа, подождите
                </p>
            </div>

           
            <!-- Update Table Section -->
            <div class="setting-card" 
                v-if="user?.KaspiStatus === true 
                        && (user?.tableUpdated === true 
                        || [ 1,3 ,null].includes(user?.tableUpdatedStatus))">
                <div class="setting-info">
                    <h2>Обновить таблицу  1</h2>
                    <p>Обновить данные в таблице.</p>
                </div>
                <button @click="updateTable">Обновить таблицу</button>
            </div>
            <!-- Блок "В ожидании" -->
            <div class="setting-card waiting" 
                v-if="user?.KaspiStatus === true  && [2].includes(user?.tableUpdatedStatus)">
                <div class="setting-info">
                    <h2>В ожидании...</h2>
                    <p>Обновление таблицы в процессе. Пожалуйста, подождите.</p>
                </div>
            </div>

            <!-- Demo Version for Dumping Section -->
            <div class="setting-card" v-if="user?.KaspiStatus == true">
                <div class="setting-info">
                    <h2>Демпинг (Демо-версия)</h2>
                    <p>Включить демо-режим для демпинга.</p>
                </div>
                <label class="switch">
                    <input type="checkbox" v-model="enableDemoMode" />
                    <span class="slider"></span>
                </label>
            </div>

            <button class="save-btn" @click="saveSettings">Сохранить</button>
        </div>
    </Main>
</template>

<script>
import Main from '@/components/Main/Main.vue';
import axios from 'axios';

export default {
    name: 'Settings',
    components: { Main },

    data() {
        return {
            enableDumping: false,
            enableDemoMode: false,
            kaspiStatus: null,
            user: null,
            isLoading: true,
            error: null,
        };
        
    },
    
    created() {
        this.fetchUserProfile();
    },
    computed: {
        canUpdateTable() {
            return this.user?.KaspiStatus === true &&
                this.user?.tableUpdated !== false &&
                ![-3, -2, -1].includes(this.user?.tableUpdatedStatus);
        },
        isWaitingUpdate() {
            return this.user?.KaspiStatus === true && this.user?.tableUpdatedStatus === -2;
        }
    },

    methods: {
        async fetchUserProfile() {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/user/${user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.user = response.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;

                if (error.response) {
                    console.error('Ошибка при загрузке данных пользователя:', error.response.data);
                    alert('Ошибка при загрузке данных пользователя. Пожалуйста, попробуйте позже.');
                } else if (error.request) {
                    console.error('Нет ответа от сервера:', error.request);
                    alert('Ошибка связи с сервером. Пожалуйста, попробуйте позже.');
                } else {
                    console.error('Ошибка:', error.message);
                    alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
                }
            }
        },

        saveSettings() {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const settings = {
                enableDumping: this.enableDumping,
                enableDemoMode: this.enableDemoMode,
            };

            axios.put(`http://127.0.0.1:8000/api/user/user/${user_id}/settings/`, settings, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                alert('Настройки успешно сохранены!');
            })
            .catch(error => {
                console.error('Ошибка при сохранении настроек:', error);
                alert('Не удалось сохранить настройки. Пожалуйста, попробуйте позже.');
            });
        },

        checkKaspiConnection() {
            const user_id = localStorage.getItem('user_id');

            const token = localStorage.getItem('token');
            console.log(token)
            console.log(user_id)

            axios.post(`http://127.0.0.1:8000/api/kaspi/login/${user_id}/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log("vse done")
                console.log(response)
                this.fetchUserProfile()
                // this.kaspiStatus = response.data.success ? 'Соединение успешно' : 'Ошибка соединения';
            })
            .catch(error => {
                console.error('Ошибка при проверке соединения с Каспи:', error);
                this.kaspiStatus = 'Ошибка соединения';
            });
        },

        updateTable() {
            const user_id = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');

            axios.post(`http://127.0.0.1:8000/api/kaspi/table/update/${user_id}/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log('Обновление таблицы запущено');
                console.log(response);
                this.fetchUserProfile(); // обнови данные юзера после запроса
            })
            .catch(error => {
                console.error('Ошибка при обновлении таблицы:', error);
            });
        },
    },
};
</script>


<style lang="scss" src="./Settings.scss"></style>
