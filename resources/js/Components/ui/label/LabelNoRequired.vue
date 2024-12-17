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
    <Label class="mb-[5px] text-[16px]" :class="classes">
        <span>{{ title }}</span>
    </Label>
</template>
