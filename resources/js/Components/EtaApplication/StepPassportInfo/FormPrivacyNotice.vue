<script setup>
import FormInputCheckbox from '@/Components/ui/checkbox/FormInputCheckbox.vue';
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
    <h2 class="leading-form">{{ messages.privacy_notice }}</h2>
    <!-- Privacy notice -->

    <p class="mb-4">
        Personal information provided on this form is collected and will be used, disclosed, and retained by
        Immigration, Refugees and Citizenship Canada (IRCC) under the authority of the Immigration and Refugee
        Protection Act (IRPA). The personal information provided will be used for the purpose of processing
        applications. The personal information provided may be disclosed to other federal government institutions and
        third parties including law enforcement bodies, provincial/territorial governments and/or foreign governments
        for the purpose of validating identity, eligibility and admissibility.
    </p>

    <p class="mb-4">
        The personal information collected on an application, and other information collected in support of an
        application, may be used for advanced analytics, automation, and other technologies to support processing of
        applications and decision making, including your application. Personal information, including from advanced
        analytics, automation, and other technologies, may also be used for purposes including research, statistics,
        program and policy evaluation, internal audit, compliance, risk management, strategy development and reporting.
    </p>

    <p class="mb-4">
        Where biometrics are provided in support of an application, the fingerprints collected will be stored and shared
        with the RCMP. The fingerprint record may also be disclosed to law enforcement agencies in Canada in accordance
        with subsection 13.11(1) of the Immigration and Refugee Protection Regulations. The information may be used to
        establish or verify the identity of a person in order to prevent, investigate, or prosecute an offence under any
        law of Canada or a Province. This information may also be used to establish or verify the identity of an
        individual whose identity cannot reasonably be otherwise established or verified because of physical or mental
        condition. Canada may also share immigration information related to biometric records with foreign governments
        with whom Canada has an agreement or arrangement.
    </p>

    <p class="mb-4">
        Failure to complete the form in full may result in a delay or the application not being processed. The Privacy
        Act gives individuals the right of access to, protection, and correction of their personal information. Further
        details are available in
        <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/transparency/access-information-privacy/info-source/sources-information.html"
            class="href-custom"
        >
            Info Source </a
        >. If you are not satisfied with the manner in which IRCC handles your personal information, you may exercise
        your right to file a complaint to the
        <a
            href="https://www.priv.gc.ca/en/report-a-concern/file-a-formal-privacy-complaint/file-a-complaint-about-a-federal-institution/"
            class="href-custom"
        >
            Office of the Privacy Commissioner of Canada </a
        >. The collection, use, disclosure and retention of your personal information is further described in IRCC's
        Personal Information Bank -
        <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/transparency/access-information-privacy/info-source/personal-information-banks.html#migrationcontrol"
            class="href-custom"
        >
            IRCC PPU 068 </a
        >.
    </p>

    <p class="mb-4">
        <b>{{ messages.consent_and_declaration }}</b> <br />
        <b>Declaration of applicant</b> <br />
        <span>I have read and understand the above.</span>
    </p>

    <p class="mb-4">
        I declare that the information I have given in this application is truthful, complete and correct.
    </p>

    <p class="mb-4">
        I understand that any false statements or concealment of a material fact may result in my inadmissibility to
        Canada and may be grounds for my prosecution or removal.
    </p>

    <p class="mb-4">
        I also understand that should I be found to be inadmissible for misrepresentation under section 40 of the
        Immigration and Refugee Protection Act, I may be ineligible to apply to certain IRCC programs for a period of
        five years following a final determination of my inadmissibility or, if this determination is made in Canada,
        following my removal from Canada.
    </p>

    <p>I agree that by typing my name and clicking sign, I am electronically signing my application.</p>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.inAggreance">
        <FormItem class="form-group">
            <LabelRequired :title="messages.i_agree" :classes="'text-[24px] font-normal'" />

            <div>
                <FormControl>
                    <FormInputCheckbox
                        id="consentAndDeclaration.inAggreance"
                        v-model="formData.consentAndDeclaration.inAggreance"
                        value="true"
                        :label="messages.i_agree"
                        v-bind="componentField"
                        :class="{ 'checkbox-invalid': errors.length > 0 }"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.fullNameOfConsent">
        <FormItem class="form-group">
            <LabelRequired :title="messages.signature_of_applicant" />
            <!-- Signature of applicant -->

            <p>{{ messages.sign_instructions }}</p>
            <!-- To sign, enter your name as it appears on your passport. -->

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
