<script setup>
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';

import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/lib/utils';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const df = new DateFormatter('ja-JP', {
    dateStyle: 'long',
});

const value = ref();
const isPopoverOpen = ref(false);

defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const handleDateSelect = (selectedDate) => {
    value.value = selectedDate;
    isPopoverOpen.value = false;

    const dateFormatted = `${selectedDate.year}/${selectedDate.month}/${selectedDate.day}`;
    emit('update:modelValue', dateFormatted);
};
</script>

<template>
    <Popover v-model:open="isPopoverOpen">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')"
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date' }}
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value" initial-focus @update:modelValue="handleDateSelect" />
        </PopoverContent>
    </Popover>
</template>
