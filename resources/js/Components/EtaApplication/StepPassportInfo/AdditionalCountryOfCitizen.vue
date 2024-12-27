<script setup>
import { Button } from '@/Components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { Plus, Trash } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;

const additionalCitizenship = ref(null);

const addAdditionalCitizenship = () => {
    if (additionalCitizenship.value || additionalCitizenship.value == 0) {
        const item = countryOptions.value.find((item) => item.value == additionalCitizenship.value);
        const rawItem = JSON.parse(JSON.stringify(item));

        const exists = formData.value.personalDetails.additionalCountriesOfCitizenship.some(
            (existingItem) => existingItem.value === rawItem.value
        );

        if (!exists) {
            etaApplicationStore.addCountriesOfCitizen(rawItem);
        }

        // clear select
        additionalCitizenship.value = null;
    }
};

const deleteCountryOfCitizen = (value) => {
    etaApplicationStore.deleteCountryOfCitizen(value);
};

const countryOptions = ref([
    { value: 0, label: 'Afghanistan' },
    { value: 1, label: 'Albania' },
    { value: 2, label: 'Algeria' },
    { value: 3, label: 'Andorra' },
    { value: 4, label: 'Angola' },
    { value: 5, label: 'Antigua And Barbuda' },
    { value: 6, label: 'Argentina' },
    { value: 7, label: 'Armenia' },
    { value: 8, label: 'Australia' },
    { value: 9, label: 'Austria' },
    { value: 10, label: 'Azerbaijan' },
    { value: 11, label: 'Bahamas' },
    { value: 12, label: 'Bahrain' },
    { value: 13, label: 'Bangladesh' },
    { value: 14, label: 'Barbados' },
    { value: 15, label: 'Belarus' },
    { value: 16, label: 'Belgium' },
    { value: 17, label: 'Belize' },
    { value: 18, label: 'Benin' },
    { value: 19, label: 'Bhutan' },
    { value: 20, label: 'Bolivia' },
    { value: 21, label: 'Bosnia and Herzegovina' },
    { value: 22, label: 'Botswana' },
    { value: 23, label: 'Brazil' },
    { value: 24, label: 'Brunei Darussalam' },
    { value: 25, label: 'Bulgaria' },
    { value: 26, label: 'Burkina Faso' },
    { value: 27, label: 'Burma (Myanmar)' },
    { value: 28, label: 'Burundi' },
    { value: 29, label: 'Cabo Verde' },
    { value: 30, label: 'Cambodia' },
    { value: 31, label: 'Cameroon' },
    { value: 32, label: 'Canada' },
    { value: 33, label: 'Central African Republic' },
    { value: 34, label: 'Chad' },
    { value: 35, label: 'Chile' },
    { value: 36, label: 'China' },
    { value: 37, label: 'China (Hong Kong SAR)' },
    { value: 38, label: 'China (Macao SAR)' },
    { value: 39, label: 'Colombia' },
    { value: 40, label: 'Comoros' },
    { value: 41, label: 'Costa Rica' },
    { value: 42, label: 'Croatia' },
    { value: 43, label: 'Cuba' },
    { value: 44, label: 'Cyprus' },
    { value: 45, label: 'Czech Republic' },
    { value: 46, label: 'Democratic Rep. of Congo' },
    { value: 47, label: 'Denmark' },
    { value: 48, label: 'Djibouti' },
    { value: 49, label: 'Dominica' },
    { value: 50, label: 'Dominican Republic' },
    { value: 51, label: 'East Timor' },
    { value: 52, label: 'Ecuador' },
    { value: 53, label: 'Egypt' },
    { value: 54, label: 'El Salvador' },
    { value: 55, label: 'Equatorial Guinea' },
    { value: 56, label: 'Eritrea' },
    { value: 57, label: 'Estonia' },
    { value: 58, label: 'Ethiopia' },
    { value: 59, label: 'Federated States of Micronesia' },
    { value: 60, label: 'Fiji' },
    { value: 61, label: 'Finland' },
    { value: 62, label: 'France' },
    { value: 63, label: 'Gabon' },
    { value: 64, label: 'Gambia' },
    { value: 65, label: 'Georgia' },
    { value: 66, label: 'Germany, Federal Republic Of' },
    { value: 67, label: 'Ghana' },
    { value: 68, label: 'Greece' },
    { value: 69, label: 'Grenada' },
    { value: 70, label: 'Guatemala' },
    { value: 71, label: 'Guinea' },
    { value: 72, label: 'Guinea-Bissau' },
    { value: 73, label: 'Guyana' },
    { value: 74, label: 'Haiti' },
    { value: 75, label: 'Honduras' },
    { value: 76, label: 'Hungary' },
    { value: 77, label: 'Iceland' },
    { value: 78, label: 'India' },
    { value: 79, label: 'Indonesia' },
    { value: 80, label: 'Iran' },
    { value: 81, label: 'Iraq' },
    { value: 82, label: 'Ireland' },
    { value: 83, label: 'Israel' },
    { value: 84, label: 'Italy' },
    { value: 85, label: 'Ivory Coast' },
    { value: 86, label: 'Jamaica' },
    { value: 87, label: 'Jordan' },
    { value: 88, label: 'Kazakhstan' },
    { value: 89, label: 'Kenya' },
    { value: 90, label: 'Kiribati' },
    { value: 91, label: 'Korea, North (DPRK)' },
    { value: 92, label: 'Korea, South' },
    { value: 93, label: 'Kosovo' },
    { value: 94, label: 'Kuwait' },
    { value: 95, label: 'Kyrgyzstan' },
    { value: 96, label: 'Laos' },
    { value: 97, label: 'Latvia' },
    { value: 98, label: 'Lebanon' },
    { value: 99, label: 'Lesotho' },
    { value: 100, label: 'Liberia' },
    { value: 101, label: 'Libya' },
    { value: 102, label: 'Liechtenstein' },
    { value: 103, label: 'Lithuania' },
    { value: 104, label: 'Luxembourg' },
    { value: 105, label: 'Macedonia' },
    { value: 106, label: 'Madagascar' },
    { value: 107, label: 'Malawi' },
    { value: 108, label: 'Malaysia' },
    { value: 109, label: 'Maldives' },
    { value: 110, label: 'Mali' },
    { value: 111, label: 'Malta' },
    { value: 112, label: 'Marshall Islands' },
    { value: 113, label: 'Mauritania' },
    { value: 114, label: 'Mauritius' },
    { value: 115, label: 'Mexico' },
    { value: 116, label: 'Moldova' },
    { value: 117, label: 'Monaco' },
    { value: 118, label: 'Mongolia' },
    { value: 119, label: 'Montenegro' },
    { value: 120, label: 'Morocco' },
    { value: 121, label: 'Mozambique' },
    { value: 122, label: 'Namibia' },
    { value: 123, label: 'Nauru' },
    { value: 124, label: 'Nepal' },
    { value: 125, label: 'Netherlands, The' },
    { value: 126, label: 'New Caledonia' },
    { value: 127, label: 'New Zealand' },
    { value: 128, label: 'Nicaragua' },
    { value: 129, label: 'Niger' },
    { value: 130, label: 'Nigeria' },
    { value: 131, label: 'Northern Mariana Islands' },
    { value: 132, label: 'Norway' },
    { value: 133, label: 'Oman' },
    { value: 134, label: 'Pakistan' },
    { value: 135, label: 'Palestinian Authority' },
    { value: 136, label: 'Panama' },
    { value: 137, label: 'Papua New Guinea' },
    { value: 138, label: 'Paraguay' },
    { value: 139, label: 'Peru' },
    { value: 140, label: 'Philippines' },
    { value: 141, label: 'Poland' },
    { value: 142, label: 'Portugal' },
    { value: 143, label: 'Qatar' },
    { value: 144, label: 'Republic of Congo' },
    { value: 145, label: 'Republic of Palau' },
    { value: 146, label: 'Romania' },
    { value: 147, label: 'Russia' },
    { value: 148, label: 'Rwanda' },
    { value: 149, label: 'Saint Kitts and Nevis' },
    { value: 150, label: 'Saint Lucia' },
    { value: 151, label: 'Samoa' },
    { value: 152, label: 'San Marino' },
    { value: 153, label: 'Sao Tome and Principe' },
    { value: 154, label: 'Saudi Arabia' },
    { value: 155, label: 'Senegal' },
    { value: 156, label: 'Serbia, Republic Of' },
    { value: 157, label: 'Seychelles' },
    { value: 158, label: 'Sierra Leone' },
    { value: 159, label: 'Singapore' },
    { value: 160, label: 'Slovakia' },
    { value: 161, label: 'Slovenia' },
    { value: 162, label: 'Solomon Islands' },
    { value: 163, label: 'Somalia' },
    { value: 164, label: 'South Africa, Republic Of' },
    { value: 165, label: 'South Sudan' },
    { value: 166, label: 'Spain' },
    { value: 167, label: 'Sri Lanka' },
    { value: 168, label: 'St. Vincent and the Grenadines' },
    { value: 169, label: 'Stateless' },
    { value: 170, label: 'Sudan' },
    { value: 171, label: 'Suriname' },
    { value: 172, label: 'Swaziland' },
    { value: 173, label: 'Sweden' },
    { value: 174, label: 'Switzerland' },
    { value: 175, label: 'Syria' },
    { value: 176, label: 'Taiwan' },
    { value: 177, label: 'Tajikistan' },
    { value: 178, label: 'Tanzania' },
    { value: 179, label: 'Thailand' },
    { value: 180, label: 'Togo' },
    { value: 181, label: 'Tonga' },
    { value: 182, label: 'Trinidad and Tobago' },
    { value: 183, label: 'Tunisia' },
    { value: 184, label: 'Turkey' },
    { value: 185, label: 'Turkmenistan' },
    { value: 186, label: 'Tuvalu' },
    { value: 187, label: 'Uganda' },
    { value: 188, label: 'UK - Brit. Ntl. Overseas' },
    { value: 189, label: 'UK - Brit. overseas citizen' },
    { value: 190, label: 'UK - Brit. overseas terr.' },
    { value: 191, label: 'UK - British citizen' },
    { value: 192, label: 'Ukraine' },
    { value: 193, label: 'United Arab Emirates' },
    { value: 194, label: 'United States of America' },
    { value: 195, label: 'Uruguay' },
    { value: 196, label: 'Uzbekistan' },
    { value: 197, label: 'Vanuatu' },
    { value: 198, label: 'Vatican City State' },
    { value: 199, label: 'Venezuela' },
    { value: 200, label: 'Vietnam' },
    { value: 201, label: 'Western Sahara' },
    { value: 202, label: 'Yemen' },
    { value: 203, label: 'Zambia' },
    { value: 204, label: 'Zimbabwe' },
]);
</script>

<template>
    <div class="flex w-[60%] justify-between">
        <div class="w-[81%]">
            <FormField v-slot="{ errors }" name="additionalCitizenship">
                <FormItem>
                    <Select v-model="additionalCitizenship">
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="item in countryOptions" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            </FormField>
        </div>

        <Button
            class="button flex"
            size="lg"
            type="button"
            :disabled="additionalCitizenship == null"
            @click="addAdditionalCitizenship"
        >
            <Plus />
            <span>{{ messages.insert }}</span>
        </Button>
    </div>

    <div class="mt-3 w-[60%]">
        <div
            v-for="(item, index) in formData.personalDetails.additionalCountriesOfCitizenship"
            :key="index"
            class="mt-1 flex w-[100%] rounded-sm bg-gray-100 px-2 py-2"
        >
            <p class="w-[95%]">
                {{ item.label }}
            </p>
            <button
                v-if="item.value != 105"
                class="ml-2 text-red-400 hover:text-red-800"
                type="button"
                @click="deleteCountryOfCitizen(item.value)"
            >
                <Trash class="w-[20px]" />
            </button>
        </div>
    </div>
</template>
