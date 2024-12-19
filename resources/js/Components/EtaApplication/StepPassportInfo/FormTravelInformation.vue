<script setup>
import DateSelector from '@/Components/ui/dateselector/DateSelector.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import TimeSelector from '@/Components/ui/timeselector/TimeSelector.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <h2 class="leading-form">{{ messages.travel_information }}</h2>
    <!-- Travel information -->

    <FormField v-slot="{ componentField, errors }" name="travelDetails.isTravelDateKnown">
        <FormItem class="form-group">
            <LabelRequired :title="messages.travel_date_question" />
            <!-- Do you know when you will travel to Canada? -->

            <!-- <p>
                This information may help us to process your application. If you do not know when you will travel to
                Canada, please select "no".
            </p> -->

            <div class="md:max-w-[60%]">
                <Select v-model="formData.travelDetails.isTravelDateKnown" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">{{ messages.yes }}</SelectItem>
                                <SelectItem value="1">{{ messages.no }}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <div v-show="formData.travelDetails.isTravelDateKnown && formData.travelDetails.isTravelDateKnown == '0'">
        <div class="form-group">
            <LabelRequired :title="messages.travel_plan_question" />
            <!-- When do you plan to travel to Canada? -->

            <!-- <p>If you don't know, you may enter an approximate date.</p> -->

            <DateSelector
                v-model:year="formData.travelDetails.travelDateYear"
                v-model:month="formData.travelDetails.travelDateMonth"
                v-model:day="formData.travelDetails.travelDateDay"
                inputYear="travelDetails.travelDateYear"
                inputMonth="travelDetails.travelDateMonth"
                inputDay="travelDetails.travelDateDay"
            />
        </div>

        <div class="form-group">
            <LabelRequired :title="messages.flight_departure_time_question" />
            <!-- Please enter the time your flight to Canada will depart -->

            <!-- <p>If you don't know, you may enter an approximate date.</p> -->

            <TimeSelector
                v-model:hour="formData.travelDetails.travelDateTimeHour"
                v-model:minute="formData.travelDetails.travelDateTimeMinute"
                v-model:timezone="formData.travelDetails.travelDateTimeTimezone"
                inputHour="travelDetails.travelDateTimeHour"
                inputMinute="travelDetails.travelDateTimeMinute"
                inputTimezone="travelDetails.travelDateTimeTimezone"
            />
        </div>
    </div>
</template>
