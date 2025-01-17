<script setup>
import FormSubmitErrors from '@/Components/EtaApplication/Errors/FormSubmitErrors.vue';
import { Button } from '@/Components/ui/button';
import Loading from '@/Components/ui/loading/Loading.vue';
import CommonNotify from '@/Components/ui/notify/CommonNotify.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head, usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { Form } from 'vee-validate';
import { onBeforeUnmount } from 'vue';
import StepApplicantType from './StepApplicantType.vue';
import StepPassportInfo from './StepPassportInfo.vue';
import StepRepresentativeDetails from './StepRepresentativeDetails.vue';

const etaApplicationStore = useEtaApplicationStore();

const { formSchema, formData, currentStep, loading } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;

etaApplicationStore.setMessages(messages);

const props = defineProps({
    occupations: {
        type: Object,
        default: () => {},
    },
});

etaApplicationStore.setOccupations(props.occupations);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const nextStep = () => {
    etaApplicationStore.nextStep();
};

onBeforeUnmount(() => {
    etaApplicationStore.$reset();
});
</script>

<template>
    <Head title="CANADA eTA" />

    <div class="dark:bg-gray-900">
        <main>
            <div>
                <h1
                    class="text-center text-[2em] font-bold"
                    :class="{
                        'mb-[7%] mt-[7%]': currentStep === 0,
                        'mb-[6%] mt-[7%]': currentStep === 1,
                        'mt-[4%]': currentStep === 2,
                    }"
                >
                    {{ messages.canada_eta_application_form }}
                </h1>

                <div class="mx-auto max-w-[607px] p-[20px] sm:px-6">
                    <Form
                        ref="formRef"
                        v-slot="{ meta }"
                        keep-values
                        :validation-schema="formSchema[currentStep]"
                        @submit="nextStep()"
                    >
                        <!-- <FormErrors :errors="errors" /> -->

                        <FormSubmitErrors />

                        <StepApplicantType v-if="currentStep === 0" />
                        <StepRepresentativeDetails v-if="currentStep === 1" />
                        <StepPassportInfo v-if="currentStep === 2" />

                        <div
                            v-if="
                                (!formData.prerequisite.travelDocumentType && currentStep < 2) ||
                                (formData.prerequisite.travelDocumentType &&
                                    formData.prerequisite.travelDocumentType <= 4 &&
                                    formData.prerequisite.passportNotedNationality)
                            "
                            class="mt-4"
                        >
                            <div class="text-right">
                                <Button
                                    v-if="currentStep === 0"
                                    type="submit"
                                    size="lg"
                                    class="mt-[7%] w-[50%] rounded-[20px] bg-[#e0232f] hover:bg-[#45a049]"
                                    @click="scrollToTop()"
                                >
                                    <span>{{ messages.next }}</span>
                                </Button>
                            </div>

                            <div
                                v-if="currentStep === 1"
                                class="w-100 mb-[70px] mt-[60px] flex justify-between gap-[2em]"
                            >
                                <Button
                                    v-if="currentStep > 0 && currentStep < 2"
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    class="w-[50%] rounded-[20px] border border-[#e0232f] font-bold text-[#e0232f] hover:bg-[#45a049] hover:text-[#e0232f]"
                                    @click="etaApplicationStore.prevStep()"
                                >
                                    <span>{{ messages.previous }}</span>
                                </Button>

                                <Button
                                    type="submit"
                                    size="lg"
                                    class="w-[50%] rounded-[20px] bg-[#e0232f] font-bold hover:bg-[#45a049]"
                                    @click="scrollToTop()"
                                >
                                    <span>{{ messages.next }}</span>
                                </Button>
                            </div>

                            <Button
                                v-if="currentStep === 2"
                                size="lg"
                                type="submit"
                                class="w-100 rounded-none bg-[#e0232f] hover:bg-[#45a049]"
                                @click="!meta.valid ? scrollToTop() : null"
                            >
                                <span>{{ messages.proceed_to_payment }}</span>
                            </Button>
                        </div>
                    </Form>

                    <!-- <Button
                        v-if="currentStep === 0"
                        class="bg-red-600"
                        type="button"
                        size="lg"
                        @click="etaApplicationStore.submitFormFake()"
                    >
                        <span>Test Submission</span>
                    </Button> -->
                </div>
            </div>

            <div v-if="loading" class="loading-overlay">
                <Loading />
            </div>
        </main>
    </div>

    <CommonNotify />
</template>
