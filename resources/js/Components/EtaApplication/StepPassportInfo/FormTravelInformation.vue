<script setup>
import DateSelector from '@/Components/ui/dateselector/DateSelector.vue';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import TimeSelector from '@/Components/ui/timeselector/TimeSelector.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <h2 class="leading-form">Travel information</h2>

    <div class="form-group">
        <LabelNoRequired :title="'Do you know when you will travel to Canada?'" />

        <p>
            This information may help us to process your application. If you do not know when you will travel to Canada,
            please select "no".
        </p>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.travelDetails.isTravelDateKnown">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template v-if="formData.travelDetails.isTravelDateKnown && formData.travelDetails.isTravelDateKnown == 'yes'">
        <div class="form-group">
            <LabelRequired :title="'When do you plan to travel to Canada?'" />

            <p>If you don't know, you may enter an approximate date.</p>

            <div class="md:max-w-[60%]">
                <DateSelector
                    v-model:year="formData.travelDetails.travelDateYear"
                    v-model:month="formData.travelDetails.travelDateMonth"
                    v-model:day="formData.travelDetails.travelDateDay"
                />
            </div>
        </div>

        <div class="form-group">
            <LabelRequired :title="'Please enter the time your flight to Canada will depart'" />

            <p>If you don't know, you may enter an approximate date.</p>

            <div class="md:max-w-[60%]">
                <TimeSelector
                    v-model:hour="formData.travelDetails.travelDateTimeHour"
                    v-model:minute="formData.travelDetails.travelDateTimeMinute"
                    v-model:timezone="formData.travelDetails.travelDateTimeTimezone"
                />
            </div>
        </div>
    </template>
</template>
