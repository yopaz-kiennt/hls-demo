<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SelectYear from '@/Components/ui/select-year/SelectYear.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const occupations = ref([
    {
        title:
            lang === 'en' ? 'Art, culture, recreation and sport occupations' : '芸術、文化、レクリエーション、スポーツ',
        value: '0',
    },
    {
        title: lang === 'en' ? 'Business, finance and administration occupations' : '金融、管理',
        value: '1',
    },
    {
        title:
            lang === 'en'
                ? 'Education, law and social, community and government services occupations'
                : '教育、法律、社会福祉、地域・行政サービス',
        value: '2',
    },
    {
        title: lang === 'en' ? 'Health occupations' : '保健医療',
        value: '3',
    },
    {
        title: lang === 'en' ? 'Homemaker' : '主婦/主夫',
        value: '4',
    },
    {
        title: lang === 'en' ? 'Management occupations' : '経営管理',
        value: '5',
    },
    {
        title: lang === 'en' ? 'Manufacturing and utilities occupations' : '製造、公益事業（電気・ガス等）',
        value: '6',
    },
    {
        title: lang === 'en' ? 'Military/armed forces' : '軍事、防衛',
        value: '7',
    },
    {
        title: lang === 'en' ? 'Natural and applied sciences and related occupations' : '自然、応用科学関連',
        value: '8',
    },
    {
        title:
            lang === 'en'
                ? 'Natural resources, agriculture and related production occupations'
                : '天然資源、農業および関連生産業',
        value: '9',
    },
    {
        title: lang === 'en' ? 'Retired' : '引退後',
        value: '10',
    },
    {
        title: lang === 'en' ? 'Sales and service occupations' : '営業・販売、サービス',
        value: '11',
    },
    {
        title: lang === 'en' ? 'Student' : '学生',
        value: '12',
    },
    {
        title:
            lang === 'en'
                ? 'Trades, transport and equipment operators and related occupations'
                : '技能（例：電気技師、配管工、大工）、交通、機械機器操作関連',
        value: '13',
    },
    {
        title: lang === 'en' ? 'Unemployed' : '無職',
        value: '14',
    },
]);

const jobTitles = ref({
    0: 'Automotive service technicians',
    1: 'Carpenters and cabinetmakers',
    2: 'Contractors and supervisors in industrial, electrical and construction trades and related workers',
    3: 'Contractors and supervisors in maintenance trades and heavy equipment and transport operators',
    4: 'Crane operators, drillers and blasters',
    5: 'Electrical trades and electrical power line and telecommunications workers',
    6: 'Heavy equipment operators',
    7: 'Longshore workers and material handlers',
    8: 'Machinery and transportation equipment mechanics',
    9: 'Machining, metal forming, shaping and erecting trades',
    10: 'Masonry and plastering trades',
    11: 'Motor vehicle and transit drivers',
    12: 'Other construction trades',
    13: 'Other installers, repairers and servicers',
    14: 'Other mechanics and related repairers',
    15: 'Other transport equipment operators and related maintenance workers',
    16: 'Plumbers, pipefitters and gas fitters',
    17: 'Printing press operators, other trades and related occupations',
    18: 'Public works and other labourers',
    19: 'Trades helpers and labourers',
    20: 'Train crew operating occupations',
});
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
                <Select v-model="formData.employmentDetails.occupation" v-bind="componentField">
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
                                    {{ occupation.title }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template v-if="formData.employmentDetails.occupation && formData.employmentDetails.occupation != 10">
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
                                    <SelectItem v-for="(title, index) in jobTitles" :key="index" :value="index">
                                        {{ title }}
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
