<script setup>
import InputError from '@/Components/InputError.vue';
import DateSelector from '@/Components/ui/dateselector/DateSelector.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalPassportNumber = defineAsyncComponent(() => import('./Modals/ModalPassportNumber.vue'));
const ModalSurnameOrLastname = defineAsyncComponent(() => import('./Modals/ModalSurnameOrLastname.vue'));
const ModalDateOfIssueOfPassport = defineAsyncComponent(() => import('./Modals/ModalDateOfIssueOfPassport.vue'));
const ModalDateOfExpiryOfPassport = defineAsyncComponent(() => import('./Modals/ModalDateOfExpiryOfPassport.vue'));

const etaApplicationStore = useEtaApplicationStore();

const { formData, validateDatesOfPassport } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const isOpenModalPassportNumber = ref(false);
const isOpenModalSurnameOrLastname = ref(false);
const isOpenModalDateOfIssueOfPassport = ref(false);
const isOpenModalDateOfExpiryOfPassport = ref(false);
</script>

<template>
    <!-- <h2 class="leading-form">{{ messages.passport_details_of_applicant }}</h2> -->
    <!-- Passport details of applicant -->

    <FormField v-slot="{ componentField, errors }" name="personalDetails.passportNumber">
        <FormItem class="form-group">
            <div class="flex">
                <LabelRequired :title="messages.passport_number" inputId="personalDetails.passportNumber" />
                <!-- Passport number -->

                <!-- <CircleHelp class="icon-question" @click="isOpenModalPassportNumber = true" /> -->
            </div>

            <!-- <p>
                Enter the
                <a class="href-custom" href="javascript:void(0)">passport number</a>
                exactly as it appears on the passport information page.
            </p> -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="personalDetails.passportNumber"
                        v-model="formData.personalDetails.passportNumber"
                        type="text"
                        maxlength="12"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="personalDetails.passportNumberReEnter">
        <FormItem class="form-group">
            <LabelRequired :title="messages.passport_number_re_enter" inputId="personalDetails.passportNumberReEnter" />
            <!-- Passport number (re-enter) -->

            <!-- <p>You cannot copy and paste into this field.</p> -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="personalDetails.passportNumberReEnter"
                        v-model="formData.personalDetails.passportNumberReEnter"
                        type="text"
                        maxlength="12"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="personalDetails.lastNameOfPassport">
        <FormItem class="form-group">
            <div class="flex">
                <LabelRequired :title="messages.surname_last_name" inputId="personalDetails.lastNameOfPassport" />
                <!-- Surname(s) / last name(s) -->

                <!-- <CircleHelp class="icon-question" @click="isOpenModalSurnameOrLastname = true" /> -->
            </div>

            <!-- <p>Please enter exactly as shown on your passport or identity document.</p> -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="personalDetails.lastNameOfPassport"
                        v-model="formData.personalDetails.lastName"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="personalDetails.firstNameOfPassport">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.given_first_name" inputId="personalDetails.firstNameOfPassport" />
            <!-- Given name(s) / first name(s) -->

            <!-- <p>Please enter exactly as shown on your passport or identity document.</p> -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="personalDetails.firstNameOfPassport"
                        v-model="formData.personalDetails.firstName"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <div class="form-group">
        <LabelRequired :title="messages.date_of_birth" />
        <!-- Date of birth -->

        <DateSelector
            v-model:year="formData.personalDetails.dobYear"
            v-model:month="formData.personalDetails.dobMonth"
            v-model:day="formData.personalDetails.dobDay"
            inputYear="personalDetails.dobYear"
            inputMonth="personalDetails.dobMonth"
            inputDay="personalDetails.dobDay"
        />
    </div>

    <FormField v-slot="{ componentField, errors }" name="personalDetails.gender">
        <FormItem class="form-group">
            <LabelRequired :title="messages.gender" />
            <!-- Gender -->

            <div>
                <Select v-bind="componentField" id="personalDetails.gender" v-model="formData.personalDetails.gender">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">
                                {{ lang === 'en' ? 'Female' : '女性' }}
                            </SelectItem>
                            <SelectItem value="1">{{ lang === 'en' ? 'Male' : '男性' }}</SelectItem>
                            <SelectItem value="2">{{ lang === 'en' ? 'Another gender' : 'その他の性別' }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <!-- <FormField v-slot="{ componentField, errors }" name="personalDetails.countryOfBirth">
        <FormItem class="form-group">
            <LabelRequired :title="messages.country_of_birth" />

            <div>
                <Select
                    v-bind="componentField"
                    id="personalDetails.countryOfBirth"
                    v-model="formData.personalDetails.countryOfBirth"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="107">Japan</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField> -->

    <FormField v-slot="{ componentField, errors }" name="personalDetails.cityTownOfBirth">
        <FormItem class="form-group">
            <LabelRequired :title="messages.city_of_birth" inputId="personalDetails.cityTownOfBirth" />
            <!-- City/town of birth -->

            <!-- <p>
                If there is no city/town/village on your passport, enter the name of the city/town/village where you
                were born.
            </p> -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="personalDetails.cityTownOfBirth"
                        v-model="formData.personalDetails.cityTownOfBirth"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="messages.date_of_issue_of_passport" />
            <!-- Date of issue of passport -->

            <!-- <CircleHelp class="icon-question" @click="isOpenModalDateOfIssueOfPassport = true" /> -->
        </div>

        <DateSelector
            v-model:year="formData.personalDetails.issueDateYear"
            v-model:month="formData.personalDetails.issueDateMonth"
            v-model:day="formData.personalDetails.issueDateDay"
            inputYear="personalDetails.issueDateYear"
            inputMonth="personalDetails.issueDateMonth"
            inputDay="personalDetails.issueDateDay"
        />

        <div v-if="validateDatesOfPassport">
            <InputError :message="validateDatesOfPassport" />
        </div>
    </div>

    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="messages.date_of_expiry_of_passport" />
            <!-- Date of expiry of passport -->

            <!-- <CircleHelp class="icon-question" @click="isOpenModalDateOfExpiryOfPassport = true" /> -->
        </div>

        <DateSelector
            v-model:year="formData.personalDetails.expiryDateYear"
            v-model:month="formData.personalDetails.expiryDateMonth"
            v-model:day="formData.personalDetails.expiryDateDay"
            inputYear="personalDetails.expiryDateYear"
            inputMonth="personalDetails.expiryDateMonth"
            inputDay="personalDetails.expiryDateDay"
            :end-year="2066"
        />

        <div v-if="validateDatesOfPassport">
            <InputError :message="validateDatesOfPassport" />
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
