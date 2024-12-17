<script setup>
import Input from '@/Components/ui/input/Input.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { representativeRelationship } from '@/helper';

import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <div
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfChampre
        "
        class="form-group"
    >
        <LabelRequired :title="'Membership ID number'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.membershipIdNumber" type="text" />
        </div>
    </div>

    <div
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian
        "
        class="form-group"
    >
        <LabelRequired :title="'Which province or territory?'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.province" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Surname(s) / last name(s)'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.lastName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Given name(s) / first name(s)'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.firstName" type="text" />
        </div>
    </div>

    <div
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfNonGovernmental ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfChampre ||
            formData.representative.representativeRelationship == representativeRelationship.travelAgent
        "
        class="form-group"
    >
        <LabelRequired :title="'Name of firm, organization'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.organizationName" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Mailing address'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.mailingAddress" type="text" />
        </div>
    </div>

    <div
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian
        "
        class="form-group"
    >
        <LabelRequired :title="'Postal code'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.postalCodeZip" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Telephone number'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.phoneNumber" type="text" />
        </div>
    </div>
</template>
