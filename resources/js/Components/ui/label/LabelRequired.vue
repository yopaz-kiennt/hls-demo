<script setup>
import { Label } from '@/Components/ui/label';

defineProps({
    title: {
        type: String,
        default: '',
    },
    classes: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <Label class="hissu mb-[5px] text-[1rem]" :class="classes">
        <span>{{ title }}</span>
    </Label>
</template>

<style scoped lang="scss">
.hissu {
    position: relative;
    font-weight: normal;

    &::after {
        content: '必須';
        background: #e0232f;
        color: #fff;
        font-size: 0.5em;
        padding: 3px 5px;
        margin-left: 5px;
        vertical-align: text-top;
    }
}
</style>
