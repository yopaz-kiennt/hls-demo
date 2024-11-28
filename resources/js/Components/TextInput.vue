<script setup>
import { Input } from '@/Components/ui/input';

const model = defineModel({
    type: String,
    required: true,
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <Input ref="input" v-model="model" />
</template>
