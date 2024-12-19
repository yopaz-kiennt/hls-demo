<script setup>
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

const { formSchema, currentStep, loading, fieldNames } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;

etaApplicationStore.setMessages(messages);

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
                        v-slot="{ meta }"
                        keep-values
                        :validation-schema="formSchema[currentStep]"
                        @submit="nextStep()"
                    >
                        <!-- <div v-if="Object.keys(errors).length > 0">
                            <div v-for="(error, field) in errors" :key="field">
                                <p>{{ fieldNames[field] || field }}: {{ error }}</p>
                            </div>
                        </div> -->

                        <StepApplicantType v-if="currentStep === 0" />
                        <StepRepresentativeDetails v-if="currentStep === 1" />
                        <StepPassportInfo v-if="currentStep === 2" />

                        <div class="mt-4 flex items-center justify-between">
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
                                <Button
                                    v-if="currentStep !== 2"
                                    type="submit"
                                    size="lg"
                                    @click="(meta.valid && nextStep, scrollToTop())"
                                >
                                    <span>{{ messages.next }}</span>
                                    <ArrowRight />
                                </Button>

                                <Button
                                    v-if="currentStep === 2"
                                    size="lg"
                                    type="submit"
                                    @click="meta.valid ? nextStep() : scrollToTop()"
                                >
                                    <span>{{ messages.proceed_to_payment }}</span>
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading-overlay">
            <Loading />
        </div>
    </AuthenticatedLayout>
</template>
