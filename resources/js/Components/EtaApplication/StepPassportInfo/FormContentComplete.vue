<script setup>
const ModalTravelDocument = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/Modals/ModalTravelDocument.vue')
);
const ModalSelectCodeOnPassport = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/Modals/ModalSelectCodeOnPassport.vue')
);
const ModalNationalOnPassport = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepPassportInfo/Modals/ModalNationalOnPassport.vue')
);
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const travelDocuments = ref([
    {
        title: 'Passport - ordinary/regular',
        value: '0',
    },
    {
        title: 'Passport - diplomatic',
        value: '1',
    },
    {
        title: 'Passport - official',
        value: '2',
    },
    {
        title: 'Passport - service',
        value: '3',
    },
    {
        title: 'Emergency/temporary travel document',
        value: '4',
    },
    {
        title: 'Refugee travel document',
        value: '5',
    },
    {
        title: 'Alien passport/travel document issued for non-citizens',
        value: '6',
    },
    {
        title: 'Permit to re-enter the United States (I-327)',
        value: '7',
    },
    {
        title: 'U.S. Refugee travel document (I-571)',
        value: '8',
    },
]);

const isOpenModalTravelDocument = ref(false);
const isOpenModalSelectCodeOnPassport = ref(false);
const isOpenModalNationalOnPassport = ref(false);
</script>

<template>
    <h2 class="leading-form">Complete the application form</h2>

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
    </div>

    <div class="mt-5 grid w-full items-center gap-1.5">
        <div class="flex">
            <LabelRequired :title="'What travel document do you plan to use to travel to Canada?'" />
            <CircleHelp class="icon-question" @click="isOpenModalTravelDocument = true" />
        </div>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.prerequisite.travelDocumentType">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="(item, index) in travelDocuments" :key="index" :value="item.value">
                            {{ item.title }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>

    <template v-if="formData.prerequisite.travelDocumentType">
        <div class="form-group">
            <div class="flex">
                <LabelRequired :title="'Select the code that matches the one on your passport.'" />
                <CircleHelp class="icon-question" @click="isOpenModalSelectCodeOnPassport = true" />
            </div>

            <p>
                Find this code on your passport information page - see the field named "Code", "Issuing country",
                "Authority" or "Country code".
            </p>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.prerequisite.countryOfCitizenship">
                    <SelectTrigger>
                        <SelectValue placeholder="Please select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="ja">JPN (Japan)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div v-if="formData.prerequisite.countryOfCitizenship" class="form-group">
            <div class="flex">
                <LabelRequired :title="'What is the nationality noted on this passport?'" />
                <CircleHelp class="icon-question" @click="isOpenModalNationalOnPassport = true" />
            </div>

            <p>See "Nationality" on your passport information page</p>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.prerequisite.passportNotedNationality">
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
    </template>

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
</style>
