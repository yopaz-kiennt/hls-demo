<script setup>
import Checkbox from './Checkbox.vue';

defineProps({
    id: {
        type: String,
        default: '',
        required: false,
    },
    label: {
        type: String,
        default: '',
        required: false,
    },
    value: {
        type: String || Number || Boolean,
        default: 0,
        required: true,
    },
    inputClasses: {
        type: String,
        default: '',
    },
    labelClasses: {
        type: String,
        default: '',
    },
    boxClasses: {
        type: String,
        default: '',
    },
});

const model = defineModel({
    type: Boolean,
    default: false,
});
</script>

<template>
    <div class="flex items-center space-x-4" :class="boxClasses">
        <Checkbox :id="id" v-model:checked="model" :value="value" :class="inputClasses" />
        <label :for="id" class="hissu cursor-pointer" :class="labelClasses">{{ label }}</label>
    </div>
</template>
