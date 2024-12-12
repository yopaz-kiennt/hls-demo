<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const props = defineProps({
    endYear: {
        type: Number || null,
        default: null,
    },
});

// Init years
const currentYear = new Date().getFullYear();
let years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse();
if (props.endYear) {
    years = Array.from({ length: props.endYear - currentYear + 1 }, (_, i) => currentYear + i);
}

const model = defineModel();
</script>

<template>
    <div class="flex w-[100%] justify-between">
        <div class="md:w-[32%]">
            <Select v-model="model">
                <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="yearOption in years" :key="yearOption" :value="`'${yearOption}'`">
                            {{ yearOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
