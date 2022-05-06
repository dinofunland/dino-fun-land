<template>
    <div class="item" :class="{ active: $props.isActive }"><span v-if="$props.isActive">&#10153; </span>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    isActive: {
        type: Boolean,
        default: true
    }
})
</script>
<style scoped>
.item {
    cursor: pointer;
}

.item.active {
    font-size: 1.1rem;
}

.item:hover {
    color: #ffb570;
}
</style>