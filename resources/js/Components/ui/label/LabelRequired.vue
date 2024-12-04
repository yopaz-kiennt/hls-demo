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
        <span class="required font-medium">*</span>
        <span>{{ title }}</span>
        <span class="required ml-1 text-[16px] font-medium">(required)</span>
    </Label>
</template>
