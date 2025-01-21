<script setup>
import AdditionalCountryOfCitizen from '@/Components/EtaApplication/StepPassportInfo/AdditionalCountryOfCitizen.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData, checkAgeOfPersonalDetails, minAgeRequired } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const changeHasPreviouslyAppliedToCanada = (value) => {
    if (value == 1) {
        etaApplicationStore.changeHasPreviouslyAppliedToCanada();
    }
};
</script>

<template>
    <h2 class="leading-form">
        <div class="dot"></div>
        <span>{{ messages.personal_details_of_applicant }}</span>
    </h2>
    <!-- Personal details of applicant -->

    <!-- <h3 class="text-[18px] font-medium">Additional nationalities</h3> -->

    <div>
        <LabelNoRequired :title="messages.indicate_countries_of_citizenship" />
        <!-- Indicate which countries/territories you are a citizen of. -->
        <AdditionalCountryOfCitizen />
    </div>

    <FormField
        v-if="checkAgeOfPersonalDetails >= minAgeRequired"
        v-slot="{ componentField, errors }"
        name="personalDetails.maritalStatus"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.marital_status" />
            <!-- Marital status -->

            <div>
                <Select
                    v-bind="componentField"
                    id="personalDetails.maritalStatus"
                    v-model="formData.personalDetails.maritalStatus"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">
                                {{ lang === 'en' ? 'Married' : '既婚' }}
                            </SelectItem>
                            <SelectItem value="1">
                                {{ lang === 'en' ? 'Legally Separated' : '法的別居' }}
                            </SelectItem>
                            <SelectItem value="2">
                                {{ lang === 'en' ? 'Divorced' : '離婚' }}
                            </SelectItem>
                            <SelectItem value="3">
                                {{ lang === 'en' ? 'Annulled Marriage' : '婚姻取消' }}
                            </SelectItem>
                            <SelectItem value="4">
                                {{ lang === 'en' ? 'Widowed' : '寡婦・寡夫' }}
                            </SelectItem>
                            <SelectItem value="5">
                                {{ lang === 'en' ? 'Common-Law' : '事実婚' }}
                            </SelectItem>
                            <SelectItem value="6">
                                {{ lang === 'en' ? 'Never Married/Singl' : '独身／未婚' }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField
        v-slot="{ componentField, errors }"
        v-model="formData.personalDetails.hasPreviouslyAppliedToCanada"
        name="personalDetails.hasPreviouslyAppliedToCanada"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.visa_eta_permit_applied_obtained" />
            <!-- Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada? -->

            <div>
                <Select
                    v-bind="componentField"
                    id="personalDetails.hasPreviouslyAppliedToCanada"
                    @update:modelValue="changeHasPreviouslyAppliedToCanada"
                >
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

    <template
        v-if="
            formData.personalDetails.hasPreviouslyAppliedToCanada &&
            formData.personalDetails.hasPreviouslyAppliedToCanada == '0'
        "
    >
        <FormField v-slot="{ componentField, errors }" name="personalDetails.uci">
            <FormItem class="form-group">
                <LabelNoRequired :hasNinni="true" :title="messages.uci_previous_visa_eta_permit_number" />
                <!-- Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (optional) -->

                <div>
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-bind="componentField"
                            id="personalDetails.uci"
                            v-model="formData.personalDetails.uci"
                            type="text"
                            maxlength="20"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, errors }" name="personalDetails.uciReEnter">
            <FormItem class="form-group">
                <LabelNoRequired :hasNinni="true" :title="messages.uci_previous_visa_eta_permit_number_reenter" />
                <!-- Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (re-enter) -->

                <div>
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-bind="componentField"
                            id="personalDetails.uciReEnter"
                            v-model="formData.personalDetails.uciReEnter"
                            type="text"
                            maxlength="20"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>
</template>
