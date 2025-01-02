<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <h2 class="leading-form">{{ messages.contact_information }}</h2>
    <!-- Contact information -->

    <FormField v-slot="{ componentField, errors }" name="contactDetails.emailAddressOfContactDetails">
        <FormItem class="form-group">
            <LabelRequired :title="messages.email_address" />
            <!-- Email address -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.emailAddressOfContactDetails"
                        v-model="formData.contactDetails.emailAddress"
                        type="email"
                        maxlength="100"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="contactDetails.emailAddressReEnterOfContactDetails">
        <FormItem class="form-group">
            <LabelRequired :title="messages.email_address_re_enter" />
            <!-- Email address (re-enter) -->

            <div class="md:max-w-[60%]">
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="contactDetails.emailAddressReEnterOfContactDetails"
                        v-model="formData.contactDetails.emailAddressReEnter"
                        type="email"
                        maxlength="100"
                    />
                    <!-- @paste.prevent @copy.prevent -->
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
