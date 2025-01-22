<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePage } from '@inertiajs/vue3';

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

const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const model = defineModel();

const { messages } = usePage().props;
</script>

<template>
    <div class="flex items-center" :class="classes">
        <Select :id="id" v-model="model">
            <SelectTrigger>
                <SelectValue :placeholder="messages.select_minute" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="minuteOption in minutes" :key="minuteOption" :value="minuteOption">
                        {{ minuteOption }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <span class="xs:block ml-2 hidden w-[60px]">分</span>
    </div>
</template>
