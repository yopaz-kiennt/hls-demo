<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
    endYear: {
        type: Number || null,
        default: null,
    },
    classes: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
});

// Init years
const currentYear = new Date().getFullYear();
let years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse();
if (props.endYear) {
    years = Array.from({ length: props.endYear - currentYear + 1 }, (_, i) => currentYear + i);
}

const model = defineModel();

const { messages } = usePage().props;
</script>

<template>
    <div class="w-[100%]" :class="classes">
        <Select :id="id" v-model="model">
            <SelectTrigger>
                <SelectValue :placeholder="messages.select_year" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="yearOption in years" :key="yearOption" :value="yearOption">
                        {{ yearOption }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
