<script setup>
import FormContentComplete from '@/Components/EtaApplication/StepPassportInfo/FormContentComplete.vue';
import FormPassportDetailsOfApplicant from '@/Components/EtaApplication/StepPassportInfo/FormPassportDetailsOfApplicant.vue';
import { defineAsyncComponent } from 'vue';
const FormPersonalDetailsOfApplicant = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormPersonalDetailsOfApplicant.vue')
);
const FormContactInformation = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormContactInformation.vue')
);
const FormResidentialAddress = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormResidentialAddress.vue')
);
const FormTravelInformation = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormTravelInformation.vue')
);
const FormPrivacyNotice = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/FormPrivacyNotice.vue')
);
</script>

<template>
    <!-- Complete the application form -->
    <FormContentComplete />

    <!-- Passport details of applicant -->
    <FormPassportDetailsOfApplicant />

    <!-- Personal details of applicant -->
    <FormPersonalDetailsOfApplicant />

    <!-- Contact information -->
    <FormContactInformation />

    <!-- Residential address -->
    <FormResidentialAddress />

    <!-- Travel information -->
    <FormTravelInformation />

    <!-- Privacy notice -->
    <FormPrivacyNotice />
</template>
