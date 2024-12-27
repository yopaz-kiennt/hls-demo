<script setup>
import FormContactInformation from '@/Components/EtaApplication/StepPassportInfo/FormContactInformation.vue';
import FormContentComplete from '@/Components/EtaApplication/StepPassportInfo/FormContentComplete.vue';
import FormPassportDetailsOfApplicant from '@/Components/EtaApplication/StepPassportInfo/FormPassportDetailsOfApplicant.vue';
import FormPersonalDetailsOfApplicant from '@/Components/EtaApplication/StepPassportInfo/FormPersonalDetailsOfApplicant.vue';
import FormPrivacyNotice from '@/Components/EtaApplication/StepPassportInfo/FormPrivacyNotice.vue';
import FormResidentialAddress from '@/Components/EtaApplication/StepPassportInfo/FormResidentialAddress.vue';
import FormTravelInformation from '@/Components/EtaApplication/StepPassportInfo/FormTravelInformation.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const FormEmploymentInformation = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormEmploymentInformation.vue')
);
const FormBackgroundQuestion = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormBackgroundQuestion.vue')
);
const etaApplicationStore = useEtaApplicationStore();
const { checkAgeOfPersonalDetails, formData, minAgeRequired } = storeToRefs(etaApplicationStore);
</script>

<template>
    <!-- Complete the application form -->
    <FormContentComplete />

    <template
        v-if="
            formData.prerequisite.passportNotedNationality &&
            formData.prerequisite.passportNotedNationality == 87 &&
            formData.prerequisite.travelDocumentType <= 4
        "
    >
        <!-- Passport details of applicant -->
        <FormPassportDetailsOfApplicant />

        <!-- Personal details of applicant -->
        <FormPersonalDetailsOfApplicant />

        <!-- Employment information -->
        <FormEmploymentInformation v-if="checkAgeOfPersonalDetails >= minAgeRequired" />

        <!-- Contact information -->
        <FormContactInformation />

        <!-- Residential address -->
        <FormResidentialAddress />

        <!-- Travel information -->
        <FormTravelInformation />

        <!-- Background Questions -->
        <FormBackgroundQuestion v-if="checkAgeOfPersonalDetails >= minAgeRequired" />

        <!-- Privacy notice -->
        <FormPrivacyNotice />
    </template>
</template>
