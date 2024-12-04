<script setup>
const FormStepRepresentativeDetails = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepRepresentativeDetails/FormStepRepresentativeDetails.vue')
);
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
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

    <div class="form-group">
        <Label class="mb-[5px] text-[16px]">
            <span class="required">*</span>
            <span> I am </span>
            <span class="required ml-1 text-[16px]">(required)</span>
        </Label>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.representative.representativeRelationship">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

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
                        <SelectItem :value="representativeRelationship.travelAgent"> A travel agent </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired
            :title="'Are you being paid to represent the applicant and complete the form on their behalf?'"
        />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.representative.representativeCompensated">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <FormStepRepresentativeDetails
        v-if="
            formData.representative.representativeRelationship == representativeRelationship.familyOrMember ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfNonGovernmental ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCollege ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfCanadian ||
            formData.representative.representativeRelationship == representativeRelationship.memberOfChampre
        "
    />

    <div class="form-group">
        <LabelNoRequired :title="'Fax number'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.faxNumber" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelNoRequired :title="'Email address'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.representative.emailAddress" type="email" />
        </div>
    </div>

    <div class="mt-8 grid w-full items-center gap-1.5">
        <LabelRequired title="Representative's declaration" class="text-[22px] font-normal" />

        <div class="flex items-center space-x-2">
            <Checkbox
                id="declareContactAndInformationIsTruthy"
                v-model="formData.representative.declareContactAndInformationIsTruthy"
                value="1"
            />

            <label for="declareContactAndInformationIsTruthy">
                I declare that my contact and personal information above is truthful, complete and correct.
            </label>
        </div>
    </div>

    <div class="mt-8 grid w-full gap-1.5">
        <LabelRequired title="Representative's authorization" class="text-[22px] font-normal" />

        <div class="flex space-x-2">
            <Checkbox id="understandAndAccept" v-model="formData.representative.understandAndAccept" value="1" />

            <label for="understandAndAccept" class="mt-[-5px]">
                I understand and accept that I am the person appointed by the applicant to conduct business on the
                applicant or sponsor's behalf with Immigration, Refugees and Citizenship Canada and the Canada Border
                Services Agency.
            </label>
        </div>
    </div>
</template>
