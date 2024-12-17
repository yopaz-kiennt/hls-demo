<script setup>
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <h2 class="leading-form">Background Questions</h2>

    <div class="form-group">
        <LabelNoRequired
            :title="'Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada or any other country/territory?'"
        />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Yes</SelectItem>
                        <SelectItem value="1">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template
        v-if="
            formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada &&
            formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada == '0'
        "
    >
        <div class="form-group">
            <LabelRequired
                :title="'For each refusal, please indicate the country that refused you a visa or permit, or denied you entry, as well as the reasons provided to you by the country.'"
            />

            <div class="md:max-w-[60%]">
                <Textarea
                    v-model="formData.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails"
                    class="min-h-[150px]"
                />
            </div>
        </div>
    </template>

    <div class="form-group">
        <LabelRequired
            :title="'Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory?'"
        />

        <div class="md:max-w-[60%]">
            <Select
                v-model="formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Yes</SelectItem>
                        <SelectItem value="1">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template
        v-if="
            formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere &&
            formData.backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere == '0'
        "
    >
        <div class="form-group">
            <LabelRequired
                :title="'For each arrest, charge, or conviction, please indicate where (city, country), when (month/year), the nature of the offence, and the sentence.'"
            />

            <div class="md:max-w-[60%]">
                <Textarea
                    v-model="
                        formData.backgroundQuestions
                            .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                    "
                    class="min-h-[150px]"
                />
            </div>
        </div>
    </template>

    <div class="form-group">
        <LabelRequired
            :title="'In the past two years, were you diagnosed with tuberculosis or have you been in close contact with a person with tuberculosis?'"
        />

        <div class="md:max-w-[60%]">
            <Select
                v-model="formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Yes</SelectItem>
                        <SelectItem value="1">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template
        v-if="
            formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis &&
            formData.backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis == '0'
        "
    >
        <div class="form-group">
            <LabelRequired :title="'Is your contact with tuberculosis the result of being a health care worker?'" />

            <div class="md:max-w-[60%]">
                <Select
                    v-model="formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Please select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">Yes</SelectItem>
                            <SelectItem value="1">No</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div
            v-if="
                formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker &&
                formData.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker == '0'
            "
            class="form-group"
        >
            <LabelRequired :title="'Have you ever been diagnosed with tuberculosis?'" />

            <div class="md:max-w-[60%]">
                <Select v-model="formData.backgroundQuestions.haveYouEverBeenDiagnosedWithTuberculosis">
                    <SelectTrigger>
                        <SelectValue placeholder="Please select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">Yes</SelectItem>
                            <SelectItem value="1">No</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </template>

    <div class="form-group">
        <LabelRequired :title="'Do you have one of these conditions?'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.backgroundQuestions.doYouHaveOneOfTheseConditions">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Untreated syphilis</SelectItem>
                        <SelectItem value="1">Untreated drug or alcohol addiction</SelectItem>
                        <SelectItem value="2">Untreated mental health condition with psychosis</SelectItem>
                        <SelectItem value="3">None of the above</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelNoRequired
            :title="'Please briefly indicate if there are additional details pertinent to your application. For example, an urgent need to travel to Canada. Provide relevant details to avoid delays in the processing of your application.'"
        />

        <div class="md:max-w-[60%]">
            <Textarea
                v-model="formData.backgroundQuestions.haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails"
                class="min-h-[150px]"
            />
        </div>
    </div>
</template>
