<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import SelectDay from '../select-day/SelectDay.vue';
import SelectMonth from '../select-month/SelectMonth.vue';
import SelectYear from '../select-year/SelectYear.vue';

const year = defineModel('year');
const month = defineModel('month');
const day = defineModel('day');

defineProps({
    inputYear: {
        type: String,
        default: '',
    },
    inputMonth: {
        type: String,
        default: '',
    },
    inputDay: {
        type: String,
        default: '',
    },
    endYear: {
        type: Number || null,
        default: null,
    },
});
</script>

<template>
    <div class="mt-1 flex justify-between md:max-w-[60%]">
        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ componentField, errors }" v-model="year" :name="inputYear">
                <FormItem>
                    <FormControl>
                        <SelectYear
                            v-bind="componentField"
                            :id="inputYear"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                            :end-year="endYear"
                        />
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>

        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ componentField, errors }" v-model="month" :name="inputMonth">
                <FormItem>
                    <FormControl>
                        <SelectMonth
                            v-bind="componentField"
                            :id="inputMonth"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                        />
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>

        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ componentField, errors }" v-model="day" :name="inputDay">
                <FormItem>
                    <FormControl>
                        <SelectDay
                            v-bind="componentField"
                            :id="inputDay"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                        />
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>
    </div>
</template>
