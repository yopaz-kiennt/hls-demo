<script setup>
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);
</script>

<template>
    <h2 class="leading-form">Contact information</h2>

    <div class="form-group">
        <LabelRequired :title="'Preferred language to contact you'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.contactDetails.languageOfPreference">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Email address'" />

        <p>Please enter a valid email address. It will be used to contact you about your application.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.emailAddress" type="email" />
        </div>
    </div>

    <div class="form-group">
        <LabelRequired :title="'Email address (re-enter)'" />

        <p>You cannot copy and paste into this field.</p>

        <div class="md:max-w-[60%]">
            <Input v-model="formData.contactDetails.emailAddressReEnter" type="email" @paste.prevent @copy.prevent />
        </div>
    </div>
</template>
