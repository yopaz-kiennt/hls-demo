<script setup>
import FormInputCheckbox from '@/Components/ui/checkbox/FormInputCheckbox.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import ScrollArea from '@/Components/ui/scroll-area/ScrollArea.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <h2 class="leading-form">
        <div class="dot"></div>
        <span>{{ messages.privacy_notice }}</span>
    </h2>
    <!-- Privacy notice -->

    <h3 class="mb-[10px] text-[1.17em] font-bold">{{ messages.privacy_policy }}</h3>

    <ScrollArea class="mb-[30px] max-h-[200px] overflow-auto border border-[#ccc] p-3">
        <p class="mb-[15px]">1.タイトルが入ります</p>

        <p>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        <p class="mb-[15px] mt-[10px]">2.タイトルが入ります</p>

        <p>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>

        <p class="mb-[15px] mt-[10px]">3.タイトルが入ります</p>
        <p>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
    </ScrollArea>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.inAggreance">
        <FormItem class="form-group" style="margin-top: 50px">
            <div>
                <FormControl>
                    <FormInputCheckbox
                        id="consentAndDeclaration.inAggreance"
                        v-model="formData.consentAndDeclaration.inAggreance"
                        value="true"
                        :label="messages.i_agree"
                        v-bind="componentField"
                        :class="{ 'checkbox-invalid': errors.length > 0 }"
                        :labelClasses="'hissu'"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.fullNameOfConsent">
        <FormItem class="form-group" style="margin-top: 50px">
            <LabelRequired :title="messages.signature_of_applicant" />
            <!-- Signature of applicant -->
            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="consentAndDeclaration.fullNameOfConsent"
                        v-model="formData.consentAndDeclaration.fullName"
                        type="text"
                        maxlength="160"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
