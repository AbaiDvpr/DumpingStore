<template>
    <div class="min-price-input">
        <input type="number" v-model="price" class="price-input" placeholder="₸" />
        <button class="save-btn" @click="emitSave">💾</button>
    </div>
</template>

<script>
export default {
    name: 'MinPriceInput',
    props: {
        initialPrice: Number,
        id: [Number, String],
    },
    data() {
        return {
            price: this.initialPrice || 0,
        };
    },
    methods: {
        emitSave() {
            this.$emit('save', { id: this.id, price: this.price });
        },
    },
};
</script>

<style lang="scss" scoped src="./MinPriceInput.scss"></style>

