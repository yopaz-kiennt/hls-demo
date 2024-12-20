<script setup>
const ModalTravelDocument = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/Modals/ModalTravelDocument.vue')
);
import ModalSelectCodeOnPassport from '@/Components/EtaApplication/StepPassportInfo/Modals/ModalSelectCodeOnPassport.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import IconWarning from '@/Components/ui/icons/IconWarning.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalNationalOnPassport = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/Modals/ModalNationalOnPassport.vue')
);

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages, lang } = usePage().props;

const travelDocuments = ref([
    {
        title: lang === 'en' ? 'Passport - ordinary/regular' : 'パスポート－一般/通常',
        value: '0',
    },
    {
        title: lang === 'en' ? 'Passport - diplomatic' : 'パスポート－外交用',
        value: '1',
    },
    {
        title: lang === 'en' ? 'Passport - official' : 'パスポート－公務用',
        value: '2',
    },
    {
        title: lang === 'en' ? 'Passport - service' : 'パスポート－サービス',
        value: '3',
    },
    {
        title: lang === 'en' ? 'Emergency/temporary travel document' : '緊急/臨時渡航文書',
        value: '4',
    },
    {
        title: lang === 'en' ? 'Refugee travel document' : '難民渡航文書',
        value: '5',
    },
    {
        title:
            lang === 'en'
                ? 'Alien passport/travel document issued for non-citizens'
                : '国民以外の個人に発給された外国人パスポート/渡航文書 (※この文書では eTA 申請ができません)',
        value: '6',
    },
    {
        title: lang === 'en' ? 'Permit to re-enter the United States (I-327)' : '米国再入国許可証(I-327)',
        value: '7',
    },
    {
        title: lang === 'en' ? 'U.S. Refugee travel document (I-571)' : '米国難民渡航文書(I-571)',
        value: '8',
    },
]);

const isOpenModalTravelDocument = ref(false);
const isOpenModalSelectCodeOnPassport = ref(false);
const isOpenModalNationalOnPassport = ref(false);
</script>

<template>
    <!-- <h2 class="leading-form">Complete the application form</h2>

    <div class="content">
        <p>Before you submit an application, review it carefully. Make sure it is complete and accurate.</p>

        <p>
            Entering incorrect information could lead to a delay or even a refusal of an eTA application and/or prevent
            the applicant from boarding their flight.
        </p>

        <p>
            This form is available in English and French only. To help you better understand this form, descriptions of
            each of the form fields are available in the following languages:
            <a href="https://www.cic.gc.ca/english/pdf/eta/arabic.pdf" target="_blank"> Arabic </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/bulgarian.pdf" target="_blank"> Bulgarian </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/simplified-chinese.pdf" target="_blank">
                Chinese (simplified) </a
            >,
            <a href="https://www.cic.gc.ca/english/pdf/eta/traditional-chinese.pdf" target="_blank">
                Chinese (traditional) </a
            >, <a href="https://www.cic.gc.ca/english/pdf/eta/dutch.pdf" target="_blank"> Dutch </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/english.pdf" target="_blank"> English </a>,
            <a href="https://www.cic.gc.ca/francais/pdf/ave/francais.pdf" target="_blank"> French </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/german.pdf" target="_blank"> German </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/greek.pdf" target="_blank"> Greek </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/hungarian.pdf" target="_blank"> Hungarian </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/italian.pdf" target="_blank"> Italian </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/japanese.pdf" target="_blank"> Japanese </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/korean.pdf" target="_blank"> Korean </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/polish.pdf" target="_blank"> Polish </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/portuguese.pdf" target="_blank"> Portuguese </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/portuguese-brazil.pdf" target="_blank">
                Portuguese (Brazilian) </a
            >, <a href="https://www.cic.gc.ca/english/pdf/eta/romanian.pdf" target="_blank"> Romanian </a>,
            <a href="https://www.cic.gc.ca/english/pdf/eta/spanish.pdf" target="_blank"> Spanish </a>.
        </p>
    </div> -->

    <FormField v-slot="{ componentField, errors }" name="prerequisite.travelDocumentType">
        <FormItem class="form-group">
            <div class="flex">
                <LabelRequired :title="messages.travel_document_question" />
                <!-- What travel document do you plan to use to travel to Canada? -->

                <CircleHelp class="icon-question" @click="isOpenModalTravelDocument = true" />
            </div>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.prerequisite.travelDocumentType" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="(item, index) in travelDocuments" :key="index" :value="item.value">
                                {{ item.title }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <template v-if="formData.prerequisite.travelDocumentType && formData.prerequisite.travelDocumentType <= 4">
        <FormField v-slot="{ componentField, errors }" name="prerequisite.countryOfCitizenship">
            <FormItem class="form-group">
                <div class="flex">
                    <LabelRequired :title="messages.passport_code_selection" />
                    <!-- Select the code that matches the one on your passport. -->

                    <CircleHelp class="icon-question" @click="isOpenModalSelectCodeOnPassport = true" />
                </div>

                <div class="md:max-w-[60%]">
                    <Select v-model="formData.prerequisite.countryOfCitizenship" v-bind="componentField">
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="97">JPN (Japan)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>

        <FormField
            v-if="formData.prerequisite.countryOfCitizenship"
            v-slot="{ componentField, errors }"
            name="prerequisite.passportNotedNationality"
        >
            <FormItem class="form-group">
                <div class="flex">
                    <LabelRequired :title="messages.passport_nationality" />
                    <!-- What is the nationality noted on this passport? -->

                    <CircleHelp class="icon-question" @click="isOpenModalNationalOnPassport = true" />
                </div>

                <div class="md:max-w-[60%]">
                    <Select v-model="formData.prerequisite.passportNotedNationality" v-bind="componentField">
                        <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                            <SelectTrigger>
                                <SelectValue :placeholder="messages.please_select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="87">JPN (Japan)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <FormMessage />
            </FormItem>
        </FormField>
    </template>

    <div
        v-if="formData.prerequisite.travelDocumentType && formData.prerequisite.travelDocumentType > 4"
        class="alert alert-travel mb-3 flex"
    >
        <IconWarning class="mr-2" />

        <p v-if="lang === 'en'">
            Based on your answers, you cannot apply for an eTA. You may
            <a href="https://www.cic.gc.ca/english/visit/visas.asp">need a visa</a> or
            <a href="https://www.cbsa-asfc.gc.ca/travel-voyage/td-dv-eng.html"> other type of travel document</a> to
            travel to Canada.
        </p>

        <p v-else>
            ご回答に基づき、eTA（電子渡航認証）を申請することはできません。カナダへの渡航には、ビザまたは他の渡航書類が必要です。
        </p>
    </div>

    <ModalTravelDocument :open="isOpenModalTravelDocument" @close="isOpenModalTravelDocument = false" />
    <ModalSelectCodeOnPassport
        :open="isOpenModalSelectCodeOnPassport"
        @close="isOpenModalSelectCodeOnPassport = false"
    />
    <ModalNationalOnPassport :open="isOpenModalNationalOnPassport" @close="isOpenModalNationalOnPassport = false" />
</template>

<style scoped lang="scss">
a {
    color: #2929c5;
    text-decoration: underline;
}

.alert {
    &.alert-travel {
        margin-top: 35px;
        padding: 17px 0;
    }
}
</style>
