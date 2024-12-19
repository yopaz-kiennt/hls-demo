<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import Input from '@/Components/ui/input/Input.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { representativeRelationship } from '@/helper';

import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <FormField
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfChampre
        "
        v-slot="{ componentField, errors }"
        name="representative.membershipIdNumber"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.membership_id_number" />

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.membershipIdNumber"
                        v-bind="componentField"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian
        "
        v-slot="{ componentField, errors }"
        name="representative.province"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.which_province_or_territory" />

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.province"
                        v-bind="componentField"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.lastName">
        <FormItem class="form-group">
            <LabelRequired :title="messages.surname_last_name" />
            <!-- Surname(s) / last name(s) -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.lastName"
                        v-bind="componentField"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.firstName">
        <FormItem class="form-group">
            <LabelRequired :title="messages.given_first_name" />
            <!-- Given name(s) / first name(s) -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.firstName"
                        v-bind="componentField"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfNonGovernmental ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfChampre ||
            formData.representative.representativeRelationship == representativeRelationship.travelAgent
        "
        v-slot="{ componentField, errors }"
        name="representative.organizationName"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.name_of_firm_organization" />
            <!-- Name of firm, organization -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.organizationName"
                        v-bind="componentField"
                        type="text"
                        maxlength="75"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.mailingAddress">
        <FormItem class="form-group">
            <LabelRequired :title="messages.mailing_address" />
            <!-- Mailing address -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.mailingAddress"
                        v-bind="componentField"
                        type="text"
                        maxlength="30"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian
        "
        v-slot="{ componentField, errors }"
        name="representative.postalCodeZip"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.postal_code" />
            <!-- Postal code -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.postalCodeZip"
                        v-bind="componentField"
                        type="text"
                        maxlength="30"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.phoneNumber">
        <FormItem class="form-group">
            <LabelRequired :title="messages.telephone_number" />
            <!-- Telephone number -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-model="formData.representative.phoneNumber"
                        v-bind="componentField"
                        type="text"
                        maxlength="20"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
