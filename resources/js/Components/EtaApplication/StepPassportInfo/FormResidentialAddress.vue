<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <h2 class="leading-form">{{ messages.residential_address }}</h2>
    <!-- Residential address -->

    <!-- <p>Enter your permanent home address. Do not enter an address where you live temporarily.</p> -->

    <FormField v-slot="{ componentField }" name="contactDetails.aptUnit">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.apartment_unit_number" />
            <!-- Apartment/unit number (if applicable) -->

            <div class="md:max-w-[60%]">
                <FormControl>
                    <Input
                        v-bind="componentField"
                        id="contactDetails.aptUnit"
                        v-model="formData.contactDetails.aptUnit"
                        type="text"
                        maxlength="10"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.streetNo">
        <FormItem class="form-group">
            <LabelRequired :title="messages.street_civic_number_or_house_name" />
            <!-- Street/civic number or house name -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.streetNo"
                        v-model="formData.contactDetails.streetNo"
                        type="text"
                        maxlength="30"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.streetAddress">
        <FormItem class="form-group">
            <LabelRequired :title="messages.street_address_or_name" />
            <!-- Street address/name -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.streetAddress"
                        v-model="formData.contactDetails.streetAddress"
                        type="text"
                        maxlength="100"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.streetAddressAlt">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.street_address_or_name_line_2" />
            <!-- Street address/name line 2 (if applicable) -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.streetAddressAlt"
                        v-model="formData.contactDetails.streetAddressAlt"
                        type="text"
                        maxlength="100"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.cityOfContactDetails">
        <FormItem class="form-group">
            <LabelRequired :title="messages.city_or_town" />
            <!-- City/town -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.cityOfContactDetails"
                        v-model="formData.contactDetails.city"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.countryOfContactDetails">
        <FormItem class="form-group">
            <LabelRequired :title="messages.country_or_territory" />
            <!-- Country/territory -->

            <div class="md:max-w-[60%]">
                <Select
                    v-bind="componentField"
                    id="contactDetails.countryOfContactDetails"
                    v-model="formData.contactDetails.country"
                >
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="105">Japan</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.district">
        <FormItem class="form-group">
            <LabelNoRequired :title="messages.district_or_region" />
            <!-- District/region -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.district"
                        v-model="formData.contactDetails.district"
                        type="text"
                        maxlength="50"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
