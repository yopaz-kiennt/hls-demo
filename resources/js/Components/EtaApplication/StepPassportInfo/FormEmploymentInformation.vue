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
    <h2 class="leading-form">{{ messages.employment_information }}</h2>
    <!-- Employment information -->

    <FormField v-slot="{ componentField, errors }" name="employmentDetails.occupation">
        <FormItem class="form-group">
            <LabelRequired :title="messages.occupation" />
            <!-- Occupation -->

            <!-- <p>Select the option that best describes your current employment situation.</p> -->

            <div class="md:max-w-[60%]">
                <Select
                    v-model="formData.employmentDetails.occupation"
                    v-bind="componentField"
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
        <FormField v-slot="{ componentField, errors }" name="employmentDetails.title">
            <FormItem class="form-group">
                <LabelRequired :title="messages.job_title" />
                <!-- Job title -->

                <!-- <p>Select the option that best describes your job.</p> -->

                <div class="md:max-w-[60%]">
                    <Select v-model="formData.employmentDetails.title" v-bind="componentField">
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

        <FormField v-slot="{ componentField, errors }" name="employmentDetails.companyEmployerSchoolFacilityName">
            <FormItem class="form-group">
                <LabelRequired :title="messages.name_of_employer_or_school" />
                <!-- Name of employer or school, as appropriate. -->

                <div class="md:max-w-[60%]">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-model="formData.employmentDetails.companyEmployerSchoolFacilityName"
                            v-bind="componentField"
                            type="text"
                            maxlength="75"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, errors }" name="employmentDetails.countryOfEmployment">
            <FormItem class="form-group">
                <LabelRequired :title="messages.country_or_territory" />
                <!-- Country/territory -->

                <div class="md:max-w-[60%]">
                    <Select v-model="formData.employmentDetails.country" v-bind="componentField">
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
        </FormField>

        <FormField v-slot="{ componentField, errors }" name="employmentDetails.cityOfEmployment">
            <FormItem class="form-group">
                <LabelRequired :title="messages.city_or_town" />
                <!-- City/town -->

                <div class="md:max-w-[60%]">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <Input
                            v-model="formData.employmentDetails.city"
                            v-bind="componentField"
                            type="text"
                            maxlength="75"
                        />
                    </FormControl>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, errors }" name="employmentDetails.fromDateYear">
            <FormItem class="form-group">
                <LabelRequired :title="messages.since_what_year" />
                <!-- Since what year? -->

                <div class="md:max-w-[60%]">
                    <div class="md:w-[32%]">
                        <FormControl>
                            <SelectYear
                                v-bind="componentField"
                                v-model="formData.employmentDetails.fromDateYear"
                                :classes="errors.length > 0 ? 'select-invalid' : ''"
                            />
                        </FormControl>
                    </div>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>
</template>
