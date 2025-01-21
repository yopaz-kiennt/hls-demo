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

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

const model = defineModel();

const { messages } = usePage().props;
</script>

<template>
    <div class="flex items-center" :class="classes">
        <Select :id="id" v-model="model">
            <SelectTrigger>
                <SelectValue :placeholder="messages.select_hour" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="hourOption in hours" :key="hourOption" :value="hourOption">
                        {{ hourOption }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <span class="ml-2 w-[60px]">時</span>
    </div>
</template>
