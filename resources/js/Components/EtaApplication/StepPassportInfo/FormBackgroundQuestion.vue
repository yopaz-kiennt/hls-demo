<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const untreatedConditions = ref([
    {
        title: lang === 'en' ? 'Untreated syphilis' : '未治療の梅毒',
        value: '0',
    },
    {
        title: lang === 'en' ? 'Untreated drug or alcohol addiction' : '未治療の薬物・アルコール中毒',
        value: '1',
    },
    {
        title:
            lang === 'en'
                ? 'Untreated mental health condition with psychosis'
                : '未治療の精神病（妄想・幻覚を伴う精神障害)',
        value: '2',
    },
    {
        title: lang === 'en' ? 'None of the above' : '上記のいずれにも該当しない',
        value: '3',
    },
]);
</script>

<template>
    <h2 class="leading-form">{{ messages.background_questions }}</h2>
    <!-- Background Questions -->

    <FormField v-slot="{ componentField, errors }" name="backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada">
        <FormItem class="form-group">
            <LabelRequired :title="messages.visa_refused_or_denied_entry" />
            <!-- Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada or any other country/territory? -->

            <div class="md:max-w-[60%]">
                <Select
                    v-model="formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada"
                    v-bind="componentField"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">{{ messages.yes }}</SelectItem>
                            <SelectItem value="1">{{ messages.no }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template
        v-if="
            formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada &&
            formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada == '0'
        "
    >
        <FormField
            v-slot="{ componentField, errors }"
            name="backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.refusal_details" />
                <!-- For each refusal, please indicate the country that refused you a visa or permit, or denied you entry, as well as the reasons provided to you by the country. -->

                <div class="md:max-w-[60%]">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Textarea
                            v-model="formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails"
                            class="min-h-[150px]"
                            v-bind="componentField"
                            maxlength="500"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>

    <FormField
        v-slot="{ componentField, errors }"
        name="backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.criminal_offence" />
            <!-- Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory? -->

            <div class="md:max-w-[60%]">
                <Select
                    v-model="
                        formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere
                    "
                    v-bind="componentField"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">{{ messages.yes }}</SelectItem>
                            <SelectItem value="1">{{ messages.no }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template
        v-if="
            formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere &&
            formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere == '0'
        "
    >
        <FormField
            v-slot="{ componentField, errors }"
            name="backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.arrest_charge_conviction_details" />
                <!-- For each arrest, charge, or conviction, please indicate where (city, country), when (month/year), the nature of the offence, and the sentence. -->

                <div class="md:max-w-[60%]">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Textarea
                            v-model="
                                formData.backgroundQuestions
                                    .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                            "
                            class="min-h-[150px]"
                            v-bind="componentField"
                            maxlength="500"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>

    <FormField
        v-slot="{ componentField, errors }"
        name="backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.tuberculosis_diagnosis_contact" />
            <!-- In the past two years, were you diagnosed with tuberculosis or have you been in close contact with a person with tuberculosis? -->

            <div class="md:max-w-[60%]">
                <Select
                    v-model="
                        formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis
                    "
                    v-bind="componentField"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">{{ messages.yes }}</SelectItem>
                            <SelectItem value="1">{{ messages.no }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template
        v-if="
            formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis &&
            formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis == '0'
        "
    >
        <FormField
            v-slot="{ componentField, errors }"
            name="backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.tuberculosis_contact_health_worker" />
                <!-- Is your contact with tuberculosis the result of being a health care worker? -->

                <div class="md:max-w-[60%]">
                    <Select
                        v-model="
                            formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker
                        "
                        v-bind="componentField"
                    >
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">{{ messages.yes }}</SelectItem>
                                <SelectItem value="1">{{ messages.no }}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField
            v-if="
                formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker &&
                formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker == '0'
            "
            v-slot="{ componentField, errors }"
            name="backgroundQuestions.haveYouEverBeenDiagnosedWithTuberculosis"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.tuberculosis_diagnosed" />
                <!-- Have you ever been diagnosed with tuberculosis? -->

                <div class="md:max-w-[60%]">
                    <Select
                        v-model="formData.backgroundQuestions.haveYouEverBeenDiagnosedWithTuberculosis"
                        v-bind="componentField"
                    >
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">{{ messages.yes }}</SelectItem>
                                <SelectItem value="1">{{ messages.no }}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>

    <FormField v-slot="{ componentField, errors }" name="backgroundQuestions.doYouHaveOneOfTheseConditions">
        <FormItem class="form-group">
            <LabelRequired :title="messages.health_condition_check" />
            <!-- Do you have one of these conditions? -->

            <div class="md:max-w-[60%]">
                <Select v-model="formData.backgroundQuestions.doYouHaveOneOfTheseConditions" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="(item, index) in untreatedConditions" :key="index" :value="item.value">
                                {{ item.title }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.additional_details" />
            <!-- Please briefly indicate if there are additional details pertinent to your application. For example, an urgent need to travel to Canada. Provide relevant details to avoid delays in the processing of your application. -->

            <div class="md:max-w-[60%]">
                <FormControl>
                    <Textarea
                        v-model="
                            formData.backgroundQuestions.haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails
                        "
                        v-bind="componentField"
                        class="min-h-[150px]"
                        maxlength="250"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
