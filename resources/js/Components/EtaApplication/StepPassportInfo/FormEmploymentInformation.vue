<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SelectYear from '@/Components/ui/select-year/SelectYear.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData, occupations, jobTitles } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const updateJobTitles = () => {
    etaApplicationStore.getJobTitles();
};
</script>

<template>
    <h2 class="leading-form">
        <div class="dot"></div>
        <span>{{ messages.employment_information }}</span>
    </h2>
    <!-- Employment information -->

    <FormField v-slot="{ componentField, errors }" name="employmentDetails.occupation">
        <FormItem class="form-group">
            <LabelRequired :title="messages.occupation" />
            <!-- Occupation -->

            <!-- <p>Select the option that best describes your current employment situation.</p> -->

            <div>
                <Select
                    v-bind="componentField"
                    id="employmentDetails.occupation"
                    v-model="formData.employmentDetails.occupation"
                    @update:modelValue="updateJobTitles"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem
                                    v-for="(occupation, index) in occupations"
                                    :key="index"
                                    :value="occupation.value"
                                >
                                    {{ lang === 'en' ? occupation.title_en : occupation.title_jp }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template v-if="jobTitles.length">
        <FormField
            v-slot="{ componentField, errors }"
            v-model="formData.employmentDetails.title"
            name="employmentDetails.title"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.job_title" />
                <!-- Job title -->

                <!-- <p>Select the option that best describes your job.</p> -->

                <div>
                    <Select v-bind="componentField" id="employmentDetails.title">
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        v-for="(jobTitle, index) in jobTitles"
                                        :key="index"
                                        :value="jobTitle.value"
                                    >
                                        {{ lang === 'en' ? jobTitle.title_en : jobTitle.title_jp }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField
            v-slot="{ componentField, errors }"
            v-model="formData.employmentDetails.companyEmployerSchoolFacilityName"
            name="employmentDetails.companyEmployerSchoolFacilityName"
        >
            <FormItem class="form-group">
                <LabelRequired
                    :title="messages.name_of_employer_or_school"
                    inputId="employmentDetails.companyEmployerSchoolFacilityName"
                />
                <!-- Name of employer or school, as appropriate. -->

                <div>
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-bind="componentField"
                            id="employmentDetails.companyEmployerSchoolFacilityName"
                            type="text"
                            maxlength="75"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <!-- <FormField
            v-slot="{ componentField, errors }"
            v-model="formData.employmentDetails.country"
            name="employmentDetails.countryOfEmployment"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.country_or_territory" />

                <div>
                    <Select v-bind="componentField" id="employmentDetails.countryOfEmployment">
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="105">Japan</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField> -->

        <FormField
            v-slot="{ componentField, errors }"
            v-model="formData.employmentDetails.city"
            name="employmentDetails.cityOfEmployment"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.city_or_town" inputId="employmentDetails.cityOfEmployment" />
                <!-- City/town -->

                <div>
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-bind="componentField"
                            id="employmentDetails.cityOfEmployment"
                            type="text"
                            maxlength="50"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField
            v-slot="{ componentField, errors }"
            v-model="formData.employmentDetails.fromDateYear"
            name="employmentDetails.fromDateYear"
        >
            <FormItem class="form-group">
                <LabelRequired :title="messages.since_what_year" />
                <!-- Since what year? -->

                <div>
                    <div class="w-[28%] md:w-[25%]">
                        <FormControl>
                            <SelectYear v-bind="componentField" :classes="errors.length > 0 ? 'select-invalid' : ''" />
                        </FormControl>
                    </div>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>
</template>
