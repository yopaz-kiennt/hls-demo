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
    hasNinni: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <Label class="mb-[5px] text-[16px] font-normal" :class="[classes, hasNinni ? 'ninni' : '']">
        <span>{{ title }}</span>
    </Label>
</template>
