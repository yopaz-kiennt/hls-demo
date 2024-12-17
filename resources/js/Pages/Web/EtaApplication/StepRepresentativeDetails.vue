<script setup>
const FormStepRepresentativeDetails = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepRepresentativeDetails/FormStepRepresentativeDetails.vue')
);
import { Checkbox } from '@/Components/ui/checkbox';
import FormInputCheckbox from '@/Components/ui/checkbox/FormInputCheckbox.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { representativeRelationship } from '@/helper';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <p class="text-[16px]">
        You indicated that you want to apply on behalf of someone. Please enter information about yourself first.
    </p>

    <h2 class="mb-3 text-[28px] font-medium">Parent/guardian or representative details</h2>

    <FormField v-slot="{ componentField, errors }" name="representativeRelationship">
        <FormItem class="form-group">
            <LabelRequired :title="'I am'" />

            <div class="md:max-w-[60%]">
                <Select v-model="formData.representative.representativeRelationship" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="representativeRelationship.familyOrMember">
                                    A family member or friend
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfNonGovernmental">
                                    A member of a non-governmental or religious organization
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfCollege">
                                    A member of the College of Immigration and Citizenship Consultants (CICC)
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfCanadian">
                                    A member of a Canadian provincial or territorial law society
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.memberOfChampre">
                                    A member of the Chambre des notaires du Québec
                                </SelectItem>
                                <SelectItem :value="representativeRelationship.travelAgent">
                                    A travel agent
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="representativeCompensated">
        <FormItem class="form-group">
            <LabelRequired
                :title="'Are you being paid to represent the applicant and complete the form on their behalf?'"
            />

            <div class="md:max-w-[60%]">
                <Select v-model="formData.representative.representativeCompensated" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">Yes</SelectItem>
                                <SelectItem value="1">No</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormStepRepresentativeDetails />

    <FormField v-slot="{ componentField }" name="faxNumber">
        <FormItem class="form-group">
            <LabelNoRequired :title="'Fax number'" />

            <div class="md:max-w-[60%]">
                <FormControl>
                    <Input v-model="formData.representative.faxNumber" type="text" v-bind="componentField" />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="emailAddress">
        <FormItem class="form-group">
            <LabelNoRequired :title="'Email address'" />

            <div class="md:max-w-[60%]">
                <FormControl>
                    <Input v-model="formData.representative.emailAddress" type="email" v-bind="componentField" />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <div class="mt-8 grid w-full items-center gap-1.5">
        <LabelRequired title="Representative's declaration" class="text-[22px] font-normal" />

        <FormInputCheckbox
            id="declareContactAndInformationIsTruthy"
            v-model="formData.representative.declareContactAndInformationIsTruthy"
            value="1"
            label="I declare that my contact and personal information above is truthful, complete and correct."
        />
    </div>

    <div class="mt-8 grid w-full gap-1.5">
        <LabelRequired title="Representative's authorization" class="text-[22px] font-normal" />

        <div class="flex space-x-2">
            <Checkbox
                id="understandAndAccept"
                v-model:checked="formData.representative.understandAndAccept"
                value="1"
            />

            <label for="understandAndAccept" class="mt-[-5px] cursor-pointer">
                I understand and accept that I am the person appointed by the applicant to conduct business on the
                applicant or sponsor's behalf with Immigration, Refugees and Citizenship Canada and the Canada Border
                Services Agency.
            </label>
        </div>
    </div>
</template>
