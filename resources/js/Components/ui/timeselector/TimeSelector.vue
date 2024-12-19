<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePage } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const timezones = [
    { value: '0', name: 'Acre Time' },
    { value: '1', name: 'Afghanistan Time' },
    { value: '2', name: 'Alaska Time' },
    { value: '3', name: 'Alma-Ata Time' },
    { value: '4', name: 'Amazon Time' },
    { value: '5', name: 'Anadyr Time' },
    { value: '6', name: 'Aqtau Time' },
    { value: '7', name: 'Aqtobe Time' },
    { value: '8', name: 'Arabia Time' },
    { value: '9', name: 'Argentine Time' },
    { value: '10', name: 'Armenia Time' },
    { value: '11', name: 'Atlantic Time' },
    { value: '12', name: 'Australian Central Time (Northern Territory)' },
    { value: '13', name: 'Australian Central Time (South Australia)' },
    { value: '14', name: 'Australian Central Time (South Australia/New South Wales)' },
    { value: '15', name: 'Australian Central Western Time' },
    { value: '16', name: 'Australian Eastern Time (New South Wales)' },
    { value: '17', name: 'Australian Eastern Time (Queensland)' },
    { value: '18', name: 'Australian Eastern Time (Tasmania)' },
    { value: '19', name: 'Australian Eastern Time (Victoria)' },
    { value: '20', name: 'Australian Western Time' },
    { value: '21', name: 'Azerbaijan Time' },
    { value: '22', name: 'Azores Time' },
    { value: '23', name: 'Bangladesh Time' },
    { value: '24', name: 'Bhutan Time' },
    { value: '25', name: 'Bolivia Time' },
    { value: '26', name: 'Bougainville Time' },
    { value: '27', name: 'Brasilia Time' },
    { value: '28', name: 'British Time' },
    { value: '29', name: 'Brunei Time' },
    { value: '30', name: 'Cape Verde Time' },
    { value: '31', name: 'Central Africa Time' },
    { value: '32', name: 'Central European Time' },
    { value: '33', name: 'Central Indonesia Time' },
    { value: '34', name: 'Central Time' },
    { value: '35', name: 'Chamorro Time' },
    { value: '36', name: 'Chatham Time' },
    { value: '37', name: 'Chile Time' },
    { value: '38', name: 'China Time' },
    { value: '39', name: 'Choibalsan Time' },
    { value: '40', name: 'Christmas Island Time' },
    { value: '41', name: 'Chuuk Time' },
    { value: '42', name: 'Cocos Islands Time' },
    { value: '43', name: 'Colombia Time' },
    { value: '44', name: 'Cook Is. Time' },
    { value: '45', name: 'Coordinated Universal Time' },
    { value: '46', name: 'Cuba Time' },
    { value: '47', name: 'Davis Time' },
    { value: '48', name: "Dumont-d'Urville Time" },
    { value: '49', name: 'East Indonesia Time' },
    { value: '50', name: 'Easter Is. Time' },
    { value: '51', name: 'Eastern Africa Time' },
    { value: '52', name: 'Eastern European Time' },
    { value: '53', name: 'Eastern Greenland Time' },
    { value: '54', name: 'Eastern Time' },
    { value: '55', name: 'Ecuador Time' },
    { value: '56', name: 'Falkland Is. Time' },
    { value: '57', name: 'Fernando de Noronha Time' },
    { value: '58', name: 'Fiji Time' },
    { value: '59', name: 'French Guiana Time' },
    { value: '60', name: 'French Southern & Antarctic Lands Time' },
    { value: '61', name: 'Galapagos Time' },
    { value: '62', name: 'Gambier Time' },
    { value: '63', name: 'Georgia Time' },
    { value: '64', name: 'Ghana Mean Time' },
    { value: '65', name: 'Gilbert Is. Time' },
    { value: '66', name: 'Greenwich Mean Time' },
    { value: '67', name: 'Gulf Time' },
    { value: '68', name: 'Guyana Time' },
    { value: '69', name: 'Hawaii Time' },
    { value: '70', name: 'Hong Kong Time' },
    { value: '71', name: 'Hovd Time' },
    { value: '72', name: 'India Time' },
    { value: '73', name: 'Indian Ocean Territory Time' },
    { value: '74', name: 'Indochina Time' },
    { value: '75', name: 'Iran Time' },
    { value: '76', name: 'Irish Time' },
    { value: '77', name: 'Irkutsk Time' },
    { value: '78', name: 'Israel Time' },
    { value: '79', name: 'Japan Time' },
    { value: '80', name: 'Kirgizstan Time' },
    { value: '81', name: 'Kiribati Time' },
    { value: '82', name: 'Korea Time' },
    { value: '83', name: 'Kosrae Time' },
    { value: '84', name: 'Krasnoyarsk Time' },
    { value: '85', name: 'Line Is. Time' },
    { value: '86', name: 'Lord Howe Time' },
    { value: '87', name: 'Macquarie Island Time' },
    { value: '88', name: 'Magadan Time' },
    { value: '89', name: 'Malaysia Time' },
    { value: '90', name: 'Maldives Time' },
    { value: '91', name: 'Marquesas Time' },
    { value: '92', name: 'Marshall Islands Time' },
    { value: '93', name: 'Mauritius Time' },
    { value: '94', name: 'Mawson Time' },
    { value: '95', name: 'Moscow Time' },
    { value: '96', name: 'Mountain Time' },
    { value: '97', name: 'Myanmar Time' },
    { value: '98', name: 'Nauru Time' },
    { value: '99', name: 'Nepal Time' },
    { value: '100', name: 'New Caledonia Time' },
    { value: '101', name: 'New Zealand Time' },
    { value: '102', name: 'Newfoundland Time' },
    { value: '103', name: 'Niue Time' },
    { value: '104', name: 'Norfolk Time' },
    { value: '105', name: 'Novosibirsk Time' },
    { value: '106', name: 'Omsk Time' },
    { value: '107', name: 'Oral Time' },
    { value: '108', name: 'Pacific Time' },
    { value: '109', name: 'Pakistan Time' },
    { value: '110', name: 'Palau Time' },
    { value: '111', name: 'Papua New Guinea Time' },
    { value: '112', name: 'Paraguay Time' },
    { value: '113', name: 'Peru Time' },
    { value: '114', name: 'Petropavlovsk-Kamchatski Time' },
    { value: '115', name: 'Philippines Time' },
    { value: '116', name: 'Phoenix Is. Time' },
    { value: '117', name: 'Pierre & Miquelon Time' },
    { value: '118', name: 'Pitcairn Time' },
    { value: '119', name: 'Ponape Time' },
    { value: '120', name: 'Qyzylorda Time' },
    { value: '121', name: 'Reunion Time' },
    { value: '122', name: 'Rothera Time' },
    { value: '123', name: 'Sakhalin Time' },
    { value: '124', name: 'Samara Time' },
    { value: '125', name: 'Samoa Time' },
    { value: '126', name: 'Seychelles Time' },
    { value: '127', name: 'Singapore Time' },
    { value: '128', name: 'Solomon Is. Time' },
    { value: '129', name: 'South Africa Time' },
    { value: '130', name: 'South Georgia Time' },
    { value: '131', name: 'Srednekolymsk Time' },
    { value: '132', name: 'Suriname Time' },
    { value: '133', name: 'Syowa Time' },
    { value: '134', name: 'Tahiti Time' },
    { value: '135', name: 'Tajikistan Time' },
    { value: '136', name: 'Timor-Leste Time' },
    { value: '137', name: 'Tokelau Time' },
    { value: '138', name: 'Tonga Time' },
    { value: '139', name: 'Troll Time' },
    { value: '140', name: 'Turkmenistan Time' },
    { value: '141', name: 'Tuvalu Time' },
    { value: '142', name: 'Ulaanbaatar Time' },
    { value: '143', name: 'Uruguay Time' },
    { value: '144', name: 'Ust-Nera Time' },
    { value: '145', name: 'Uzbekistan Time' },
    { value: '146', name: 'Vanuatu Time' },
    { value: '147', name: 'Venezuela Time' },
    { value: '148', name: 'Vladivostok Time' },
    { value: '149', name: 'Vostok Time' },
    { value: '150', name: 'Wake Time' },
    { value: '151', name: 'Wallis & Futuna Time' },
    { value: '152', name: 'West Indonesia Time' },
    { value: '153', name: 'West Samoa Time' },
    { value: '154', name: 'Western African Time' },
    { value: '155', name: 'Western European Time' },
    { value: '156', name: 'Western Greenland Time' },
    { value: '157', name: 'Xinjiang Time' },
    { value: '158', name: 'Yakutsk Time' },
    { value: '159', name: 'Yekaterinburg Time' },
];

const hour = defineModel('hour');
const minute = defineModel('minute');
const timezone = defineModel('timezone');

const { messages } = usePage().props;

const props = defineProps({
    inputHour: {
        type: String,
        default: '',
    },
    inputMinute: {
        type: String,
        default: '',
    },
    inputTimezone: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="mt-1 flex justify-between md:max-w-[60%]">
        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ componentField, errors }" :name="inputHour">
                <FormItem :classes="errors.length > 0 ? 'select-invalid' : ''">
                    <FormControl>
                        <Select v-model="hour" v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.select_hour" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem v-for="hourOption in hours" :key="hourOption" :value="hourOption">
                                        {{ hourOption }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>

        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ componentField, errors }" :name="inputMinute">
                <FormItem :classes="errors.length > 0 ? 'select-invalid' : ''">
                    <FormControl>
                        <Select v-model="minute" v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.select_minute" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        v-for="minuteOption in minutes"
                                        :key="minuteOption"
                                        :value="minuteOption"
                                    >
                                        {{ minuteOption }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>

        <div class="w-[33%] md:w-[32%]">
            <FormField v-slot="{ errors }" :name="inputTimezone">
                <FormItem :classes="errors.length > 0 ? 'select-invalid' : ''">
                    <FormControl>
                        <Select v-model="timezone">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.select_timezone" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        v-for="timezoneOption in timezones"
                                        :key="timezoneOption.value"
                                        :value="timezoneOption.value"
                                    >
                                        {{ timezoneOption.name }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>

                    <FormMessage class="mt-2" />
                </FormItem>
            </FormField>
        </div>
    </div>
</template>
