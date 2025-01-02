<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePage } from '@inertiajs/vue3';

const { messages } = usePage().props;

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

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
                    <SelectItem v-for="monthOption in months" :key="monthOption" :value="monthOption">
                        {{ monthOption }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
