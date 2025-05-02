<template>
    <aside class="sidebar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/prices">prices</router-link></li>
            <li><router-link to="/profile">profile</router-link></li>
            <li><router-link to="/settings">настройка</router-link></li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>
<style lang="scss" scoped src="./SideBar.scss"></style>
