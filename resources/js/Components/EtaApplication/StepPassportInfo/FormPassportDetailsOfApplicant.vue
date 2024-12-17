<script setup>
import DateSelector from '@/Components/ui/dateselector/DateSelector.vue';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalPassportNumber = defineAsyncComponent(() => import('./Modals/ModalPassportNumber.vue'));
const ModalSurnameOrLastname = defineAsyncComponent(() => import('./Modals/ModalSurnameOrLastname.vue'));
const ModalDateOfIssueOfPassport = defineAsyncComponent(() => import('./Modals/ModalDateOfIssueOfPassport.vue'));
const ModalDateOfExpiryOfPassport = defineAsyncComponent(() => import('./Modals/ModalDateOfExpiryOfPassport.vue'));

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const isOpenModalPassportNumber = ref(false);
const isOpenModalSurnameOrLastname = ref(false);
const isOpenModalDateOfIssueOfPassport = ref(false);
const isOpenModalDateOfExpiryOfPassport = ref(false);
</script>

<template>
    <h2 class="leading-form">Passport details of applicant</h2>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="'Passport number'" />
            <CircleHelp class="icon-question" @click="isOpenModalPassportNumber = true" />
        </div>

        <p>
            Enter the
            <a class="href-custom" href="javascript:void(0)">passport number</a>
            exactly as it appears on the passport information page.
        </p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personalDetails.passportNumber" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Passport number (re-enter)'" />

        <p>You cannot copy and paste into this field.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personalDetails.passportNumberReEnter" type="text" @paste.prevent @copy.prevent />
        </div>
    </div>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="'Surname(s) / last name(s)'" />
            <CircleHelp class="icon-question" @click="isOpenModalSurnameOrLastname = true" />
        </div>

        <p>Please enter exactly as shown on your passport or identity document.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personalDetails.lastName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Given name(s) / first name(s)'" />

        <p>Please enter exactly as shown on your passport or identity document.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.personalDetails.firstName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Date of birth'" />

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personalDetails.dobYear"
                v-model:month="formData.personalDetails.dobMonth"
                v-model:day="formData.personalDetails.dobDay"
            />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Gender'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personalDetails.gender">
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
            <Select v-model="formData.personalDetails.countryOfBirth">
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
            <Input v-model="formData.personalDetails.cityTownOfBirth" type="text" />
        </div>
    </div>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="'Date of issue of passport'" />
            <CircleHelp class="icon-question" @click="isOpenModalDateOfIssueOfPassport = true" />
        </div>

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personalDetails.issueDateYear"
                v-model:month="formData.personalDetails.issueDateMonth"
                v-model:day="formData.personalDetails.issueDateDay"
            />
        </div>
    </div>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="'Date of expiry of passport'" />
            <CircleHelp class="icon-question" @click="isOpenModalDateOfExpiryOfPassport = true" />
        </div>

        <div class="md:max-w-[60%]">
            <DateSelector
                v-model:year="formData.personalDetails.expiryDateYear"
                v-model:month="formData.personalDetails.expiryDateMonth"
                v-model:day="formData.personalDetails.expiryDateDay"
                :end-year="2066"
            />
        </div>
    </div>

    <ModalPassportNumber :open="isOpenModalPassportNumber" @close="isOpenModalPassportNumber = false" />
    <ModalSurnameOrLastname :open="isOpenModalSurnameOrLastname" @close="isOpenModalSurnameOrLastname = false" />
    <ModalDateOfIssueOfPassport
        :open="isOpenModalDateOfIssueOfPassport"
        @close="isOpenModalDateOfIssueOfPassport = false"
    />
    <ModalDateOfExpiryOfPassport
        :open="isOpenModalDateOfExpiryOfPassport"
        @close="isOpenModalDateOfExpiryOfPassport = false"
    />
</template>
