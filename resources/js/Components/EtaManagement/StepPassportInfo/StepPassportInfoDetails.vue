<script setup>
import FormBackgroundQuestion from './FormBackgroundQuestion.vue';
import FormContactInformation from './FormContactInformation.vue';
import FormContentComplete from './FormContentComplete.vue';
import FormEmploymentInformation from './FormEmploymentInformation.vue';
import FormPassportDetailsOfApplicant from './FormPassportDetailsOfApplicant.vue';
import FormPersonalDetailsOfApplicant from './FormPersonalDetailsOfApplicant.vue';
import FormPrivacyNotice from './FormPrivacyNotice.vue';
import FormResidentialAddress from './FormResidentialAddress.vue';
import FormTravelInformation from './FormTravelInformation.vue';

defineProps({
    item: {
        type: Object,
        default: () => {},
    },
    occupations: {
        type: Object,
        default: () => {},
    },
});
</script>

<template>
    <FormContentComplete :item="item" />

    <FormPassportDetailsOfApplicant :item="item" />

    <FormPersonalDetailsOfApplicant :item="item" />

    <FormEmploymentInformation v-if="item.data.employmentDetails.occupation" :item="item" :occupations="occupations" />

    <FormContactInformation :item="item" />

    <FormResidentialAddress :item="item" />

    <FormTravelInformation v-if="item.data.travelDetails.isTravelDateKnown == '0'" :item="item" />

    <FormBackgroundQuestion
        v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada"
        :item="item"
    />

    <FormPrivacyNotice :item="item" />
</template>
