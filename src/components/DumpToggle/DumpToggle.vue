<!-- DumpToggle.vue -->
<template>
    <div class="dump-toggle">
        <label class="switch">
            <input type="checkbox" v-model="isDumping" @change="$emit('toggle', isDumping)" />
            <span class="slider round"></span>
        </label>
        <span>{{ isDumping ? 'Демпинг включён' : 'Демпинг выключен' }}</span>
    </div>
</template>

<script>
export default {
    name: 'DumpToggle',
    props: {
        value: Boolean,
    },
    data() {
        return {
            isDumping: this.value,
        };
    },
   
    watch: {
        value(val) {
            this.isDumping = val;
        },
    },
};
</script>
