<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePage } from '@inertiajs/vue3';

const { messages } = usePage().props;

const months = Array.from({ length: 12 }, (_, i) => ({
    value: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
    label: (i + 1).toString().padStart(2, '0'),
}));

const model = defineModel();

defineProps({
    classes: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="w-[100%]" :class="classes">
        <Select :id="id" v-model="model">
            <SelectTrigger>
                <SelectValue :placeholder="messages.select_month" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="month in months" :key="month.value" :value="month.value">
                        {{ month.label }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
