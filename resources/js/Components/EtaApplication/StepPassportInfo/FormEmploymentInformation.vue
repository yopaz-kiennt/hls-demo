<script setup>
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SelectYear from '@/Components/ui/select-year/SelectYear.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const occupations = ref({
    0: 'Art, culture, recreation and sport occupations',
    1: 'Business, finance and administration occupations',
    2: 'Education, law and social, community and government services occupations',
    3: 'Health occupations',
    4: 'Homemaker',
    5: 'Management occupations',
    6: 'Manufacturing and utilities occupations',
    7: 'Military/armed forces',
    8: 'Natural and applied sciences and related occupations',
    9: 'Natural resources, agriculture and related production occupations',
    10: 'Retired',
    11: 'Sales and service occupations',
    12: 'Student',
    13: 'Trades, transport and equipment operators and related occupations',
    14: 'Unemployed',
});

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
    <h2 class="leading-form">Employment information</h2>

    <div class="form-group">
        <LabelRequired :title="'Occupation'" />

        <p>Select the option that best describes your current employment situation.</p>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.employmentDetails.occupation">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="(occupation, index) in occupations" :key="index" :value="index">
                            {{ occupation }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template v-if="formData.employmentDetails.occupation != 10">
        <div class="form-group">
            <LabelRequired :title="'Job title'" />

            <p>Select the option that best describes your job.</p>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.employmentDetails.title">
                    <SelectTrigger>
                        <SelectValue placeholder="Please select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="(title, index) in jobTitles" :key="index" :value="index">
                                {{ title }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div class="form-group">
            <LabelRequired :title="'Name of employer or school, as appropriate.'" />

            <div class="md:max-w-[60%]">
                <Input v-model="formData.employmentDetails.companyEmployerSchoolFacilityName" type="text" />
            </div>
        </div>

        <div class="form-group">
            <LabelRequired :title="'Country/territory'" />

            <div class="md:max-w-[60%]">
                <Select v-model="formData.employmentDetails.country">
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
            <LabelRequired :title="'City/town'" />

            <div class="md:max-w-[60%]">
                <Input v-model="formData.employmentDetails.city" type="text" />
            </div>
        </div>

        <div class="form-group">
            <LabelRequired :title="'Since what year?'" />

            <div class="md:max-w-[60%]">
                <SelectYear v-model="formData.employmentDetails.fromDateYear" />
            </div>
        </div>
    </template>
</template>
