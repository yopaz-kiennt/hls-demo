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
    hasNinni: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <Label class="mb-[5px] block text-[16px] font-normal" :class="[classes, hasNinni ? 'ninni' : '']" :for="inputId">
        <span>{{ title }}</span>
    </Label>
</template>
