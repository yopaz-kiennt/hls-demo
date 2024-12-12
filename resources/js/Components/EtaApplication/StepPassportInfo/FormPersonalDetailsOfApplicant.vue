<script setup>
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <h2 class="leading-form">Personal details of applicant</h2>

    <h3 class="text-[18px] font-medium">Additional nationalities</h3>

    <div class="form-group">
        <p>Indicate which countries/territories you are a citizen of.</p>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personalDetails.additionalCitizenship">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="ja">Japan</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Marital status'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personalDetails.maritalStatus">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Married</SelectItem>
                        <SelectItem value="1">Legally Separated</SelectItem>
                        <SelectItem value="2">Divorced</SelectItem>
                        <SelectItem value="3">Annulled Marriage</SelectItem>
                        <SelectItem value="4">Widowed</SelectItem>
                        <SelectItem value="5">Common-Law</SelectItem>
                        <SelectItem value="6">Never Married/Single</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired
            :title="'Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada?'"
        />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personalDetails.hasPreviouslyAppliedToCanada">
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

    <template
        v-if="
            formData.personalDetails.hasPreviouslyAppliedToCanada &&
            formData.personalDetails.hasPreviouslyAppliedToCanada == 'yes'
        "
    >
        <div class="form-group">
            <LabelNoRequired
                :title="'Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (optional)'"
            />

            <div class="md:max-w-[60%]">
                <Input v-model="formData.personalDetails.uci" type="text" />
            </div>
        </div>

        <div class="form-group">
            <LabelNoRequired
                :title="'Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (re-enter)'"
            />

            <div class="md:max-w-[60%]">
                <Input v-model="formData.personalDetails.uciReEnter" type="text" />
            </div>
        </div>
    </template>
</template>
