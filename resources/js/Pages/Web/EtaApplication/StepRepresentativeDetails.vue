<script setup>
import FormStepRepresentativeDetails from '@/Components/EtaApplication/StepRepresentativeDetails/FormStepRepresentativeDetails.vue';
import FormInputCheckbox from '@/Components/ui/checkbox/FormInputCheckbox.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { representativeRelationship } from '@/helper';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const changeRepresentativeRelationship = (value) => {
    if (value || value == 0) {
        etaApplicationStore.changeRepresentativeRelationship();
    }
};
</script>

<template>
    <FormField v-slot="{ componentField, errors }" name="representative.representativeRelationship">
        <FormItem class="form-group">
            <LabelRequired :title="messages.i_am" />

            <div>
                <Select
                    v-bind="componentField"
                    id="representative.representativeRelationship"
                    v-model="formData.representative.representativeRelationship"
                    @update:modelValue="changeRepresentativeRelationship"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="representativeRelationship.familyOrMember">
                                    {{ messages.a_family_member_or_friend }}
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfNonGovernmental">
                                    {{ messages.a_member_of_a_non_governmental_or_religious_organization }}
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfCollege">
                                    {{ messages.a_member_of_the_college_of_immigration_and_citizenship_consultants }}
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfCanadian">
                                    {{ messages.a_member_of_a_canadian_provincial_or_territorial_law_society }}
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfChampre">
                                    {{ messages.a_member_of_the_chambre_des_notaires_du_quebec }}
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.travelAgent">
                                    {{ messages.a_travel_agent }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.representativeCompensated">
        <FormItem class="form-group">
            <LabelRequired :title="messages.are_you_being_paid_to_represent" />

            <div>
                <Select v-model="formData.representative.representativeCompensated" v-bind="componentField">
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

    <FormStepRepresentativeDetails />

    <FormField v-slot="{ componentField, errors }" name="representative.faxNumber">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.fax_number" />
            <!-- Fax number -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="representative.faxNumber"
                        v-model="formData.representative.faxNumber"
                        type="text"
                        maxlength="20"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.emailAddress">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.email_address" />
            <!-- Email address -->

            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="representative.emailAddress"
                        v-model="formData.representative.emailAddress"
                        type="email"
                        maxlength="100"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representative.declareContactAndInformationIsTruthy">
        <FormItem class="mt-8 grid w-full items-center gap-1.5">
            <LabelRequired :title="messages.representative_declaration" class="text-[1rem]" style="font-weight: bold" />

            <div>
                <FormControl>
                    <FormInputCheckbox
                        id="representative.declareContactAndInformationIsTruthy"
                        v-model="formData.representative.declareContactAndInformationIsTruthy"
                        value="true"
                        :label="messages.declaration_contact_info"
                        v-bind="componentField"
                        boxClasses="items-unset"
                        labelClasses="mt-[-5px]"
                        :class="{ 'checkbox-invalid': errors.length > 0 }"
                    />
                    <!-- I declare that my contact and personal information above is truthful, complete and correct. -->
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" type="checkbox" name="representative.understandAndAccept">
        <FormItem class="mt-8 grid w-full gap-1.5">
            <LabelRequired
                :title="messages.representative_authorization"
                class="text-[1rem]"
                style="font-weight: bold"
            />
            <!-- Representative's authorization -->

            <div class="md:max-w-[100%]">
                <FormControl>
                    <FormInputCheckbox
                        v-bind="componentField"
                        id="representative.understandAndAccept"
                        v-model="formData.representative.understandAndAccept"
                        value="true"
                        :label="messages.declaration_authorization"
                        boxClasses="items-unset"
                        labelClasses="mt-[-5px]"
                        :class="{ 'checkbox-invalid': errors.length > 0 }"
                    />

                    <!-- I understand and accept that I am the person appointed by the applicant to conduct business on the
                            applicant or sponsor's behalf with Immigration, Refugees and Citizenship Canada and the Canada
                            Border Services Agency. -->
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
