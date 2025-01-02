<script setup>
import FormErrors from '@/Components/EtaApplication/FormErrors.vue';
import { Button } from '@/Components/ui/button';
import Loading from '@/Components/ui/loading/Loading.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head, usePage } from '@inertiajs/vue3';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { Form } from 'vee-validate';
import { onBeforeUnmount } from 'vue';
import StepApplicantType from './StepApplicantType.vue';
import StepPassportInfo from './StepPassportInfo.vue';
import StepRepresentativeDetails from './StepRepresentativeDetails.vue';

const etaApplicationStore = useEtaApplicationStore();

const { formSchema, formData, currentStep, loading } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;

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
    <Head title="eTA登録" />

    <AuthenticatedLayout>
        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white p-4 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <h1 class="mb-[40px] border-b-2 border-red-600 text-[32px] font-medium">eTA登録</h1>

                    <Form
                        ref="formRef"
                        v-slot="{ meta, errors }"
                        keep-values
                        :validation-schema="formSchema[currentStep]"
                        @submit="nextStep()"
                    >
                        <FormErrors :errors="errors" />

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
                            class="mt-4 flex items-center justify-between"
                        >
                            <div>
                                <Button
                                    v-if="currentStep > 0"
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    @click="etaApplicationStore.prevStep()"
                                >
                                    <ArrowLeft />
                                    <span>{{ messages.previous }}</span>
                                </Button>
                            </div>

                            <div class="flex items-center gap-3">
                                <Button v-if="currentStep !== 2" type="submit" size="lg" @click="scrollToTop()">
                                    <span>{{ messages.next }}</span>
                                    <ArrowRight />
                                </Button>

                                <Button
                                    v-if="currentStep === 2"
                                    size="lg"
                                    type="submit"
                                    @click="!meta.valid ? scrollToTop() : null"
                                >
                                    <span>{{ messages.proceed_to_payment }}</span>
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                    </Form>

                    <Button
                        v-if="currentStep === 0"
                        class="bg-red-600"
                        type="button"
                        size="lg"
                        @click="etaApplicationStore.submitFormFake()"
                    >
                        <span>Test Submission</span>
                    </Button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading-overlay">
            <Loading />
        </div>
    </AuthenticatedLayout>
</template>
