<script setup>
import DateSelector from '@/Components/ui/dateselector/DateSelector.vue';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <h2 class="leading-form">Passport details of applicant</h2>

    <div class="form-group">
        <LabelRequired :title="'Passport number'" />

        <p>
            Enter the
            <a class="href-custom" href="javascript:void(0)">passport number</a>
            exactly as it appears on the passport information page.
        </p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personDetails.passportNumber" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Passport number (re-enter)'" />

        <p>You cannot copy and paste into this field.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personDetails.passportNumberReEnter" type="text" @paste.prevent @copy.prevent />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Surname(s) / last name(s)'" />

        <p>Please enter exactly as shown on your passport or identity document.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personDetails.lastName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Given name(s) / first name(s)'" />

        <p>Please enter exactly as shown on your passport or identity document.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personDetails.firstName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Date of birth'" />

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personDetails.dobYear"
                v-model:month="formData.personDetails.dobMonth"
                v-model:day="formData.personDetails.dobDay"
            />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Gender'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personDetails.gender">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Female</SelectItem>
                        <SelectItem value="1">Male</SelectItem>
                        <SelectItem value="2">Another gender</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Country/territory of birth'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personDetails.gender">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="ja">Japan</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'City/town of birth'" />

        <p>
            If there is no city/town/village on your passport, enter the name of the city/town/village where you were
            born.
        </p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personDetails.cityTownOfBirth" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Date of issue of passport'" />

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personDetails.issueDateYear"
                v-model:month="formData.personDetails.issueDateMonth"
                v-model:day="formData.personDetails.issueDateDay"
            />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Date of expiry of passport'" />

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personDetails.expiryDateYear"
                v-model:month="formData.personDetails.expiryDateMonth"
                v-model:day="formData.personDetails.expiryDateDay"
            />
        </div>
    </div>
</template>
