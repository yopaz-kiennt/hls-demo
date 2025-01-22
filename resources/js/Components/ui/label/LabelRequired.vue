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
    inputId: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <Label class="hissu mb-[5px] block text-[16px] font-normal" :class="classes" :for="inputId">
        <span>{{ title }}</span>
    </Label>
</template>
