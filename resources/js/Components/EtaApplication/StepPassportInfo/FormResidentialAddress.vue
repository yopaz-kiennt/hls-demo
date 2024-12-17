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
    <h2 class="leading-form">Residential address</h2>

    <p>Enter your permanent home address. Do not enter an address where you live temporarily.</p>

    <div class="form-group">
        <LabelNoRequired :title="'Apartment/unit number (if applicable)'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.aptUnit" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Street/civic number or house name'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.streetNo" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Street address/name'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.streetAddress" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelNoRequired :title="'Street address/name line 2 (if applicable)'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.streetAddressAlt" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'City/town'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.city" type="text" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Country/territory'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.personalDetails.country">
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
        <LabelNoRequired :title="'District/region'" />

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.district" type="text" />
        </div>
    </div>
</template>
