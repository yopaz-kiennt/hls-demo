<script setup>
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/vue3';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const { messages, lang } = usePage().props;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd');
};

const df = {
    format(date, lang) {
        // if (lang === 'en') {
        //     return formatDate(date);
        // } else {
        //     const formatter = new DateFormatter('ja-JP', {
        //         dateStyle: 'long',
        //     });
        //     return formatter.format(date);
        // }

        return formatDate(date);
    },
};

const value = ref();
const isPopoverOpen = ref(false);

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    classes: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
    value.value = parseStringToDateValue(props.modelValue);
});

const parseStringToDateValue = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('/').map(Number);
    return new CalendarDate(year, month, day);
};

const handleDateSelect = (selectedDate) => {
    value.value = selectedDate;
    isPopoverOpen.value = false;
    emit('update:modelValue', formatDate(selectedDate));
};
</script>

<template>
    <Popover v-model:open="isPopoverOpen">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="
                    cn(
                        'max-w-[280px] justify-between rounded-none border-[#707070] text-left font-normal',
                        !value && 'text-muted-foreground',
                        classes
                    )
                "
            >
                {{ value ? df.format(value.toDate(getLocalTimeZone()), lang) : messages.choose_a_date }}
                <CalendarIcon class="h-4 w-4" />
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value" :locale="lang" initial-focus @update:modelValue="handleDateSelect" />
        </PopoverContent>
    </Popover>
</template>
