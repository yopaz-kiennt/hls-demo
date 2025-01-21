<script setup>
import InputError from '@/Components/InputError.vue';
import { FormControl, FormField, FormItem } from '@/Components/ui/form';
import { ref } from 'vue';
import SelectDay from '../select-day/SelectDay.vue';
import SelectMonth from '../select-month/SelectMonth.vue';
import SelectYear from '../select-year/SelectYear.vue';

const year = defineModel('year');
const month = defineModel('month');
const day = defineModel('day');
const yearErrors = ref([]);
const monthErrors = ref([]);
const dayErrors = ref([]);

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
    <div class="mt-1 flex">
        <div class="mr-2 w-[28%] md:w-[25%]">
            <FormField v-slot="{ componentField, errors }" v-model="year" :name="inputYear">
                <FormItem>
                    <FormControl class="max-w-[140px]">
                        <SelectYear
                            v-bind="componentField"
                            :id="inputYear"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                            :end-year="endYear"
                        />
                    </FormControl>

                    <!-- <FormMessage class="mt-2" /> -->
                    <span class="hidden">
                        {{ yearErrors = errors && errors?.length > 0 ? errors : [] }}
                    </span>
                </FormItem>
            </FormField>
        </div>

        <div class="mr-2 w-[28%] md:w-[25%]">
            <FormField v-slot="{ componentField, errors }" v-model="month" :name="inputMonth">
                <FormItem>
                    <FormControl class="max-w-[140px]">
                        <SelectMonth
                            v-bind="componentField"
                            :id="inputMonth"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                        />
                    </FormControl>

                    <!-- <FormMessage class="mt-2" /> -->
                    <span class="hidden">
                        {{ monthErrors = errors && errors?.length > 0 ? errors : [] }}
                    </span>
                </FormItem>
            </FormField>
        </div>

        <div class="w-[28%] md:w-[25%]">
            <FormField v-slot="{ componentField, errors }" v-model="day" :name="inputDay">
                <FormItem>
                    <FormControl class="max-w-[140px]">
                        <SelectDay
                            v-bind="componentField"
                            :id="inputDay"
                            :classes="errors.length > 0 ? 'select-invalid' : ''"
                        />
                    </FormControl>

                    <!-- <FormMessage class="mt-2" /> -->
                    <span class="hidden">
                        {{ dayErrors = errors && errors?.length > 0 ? errors : [] }}
                    </span>
                </FormItem>
            </FormField>
        </div>
    </div>

    <div class="error-messages mt-2">
        <InputError v-if="yearErrors.length > 0" class="mb-1" :message="yearErrors[0]" />
        <InputError v-if="monthErrors.length > 0" class="mb-1" :message="monthErrors[0]" />
        <InputError v-if="dayErrors.length > 0" :message="dayErrors[0]" />
    </div>
</template>
