<script setup>
import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';
import StepApplicantType from './StepApplicantType.vue';
import StepPassportInfo from './StepPassportInfo.vue';
import StepRepresentativeDetails from './StepRepresentativeDetails.vue';

const etaApplicationStore = useEtaApplicationStore();

const { stepIndex } = storeToRefs(etaApplicationStore);

const handleSubmit = () => {
    etaApplicationStore.submitForm();
};

onBeforeUnmount(() => {
    etaApplicationStore.$reset();
});
</script>

<template>
    <Head title="eService - Immigration, Refugees and Citizenship Canada" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Eta Application</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white p-4 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <h1 class="mb-[20px] border-b-2 border-red-600 text-[32px] font-medium">
                        Application for an Electronic Travel Authorization (eTA)
                    </h1>

                    <form method="POST" @submit.prevent="handleSubmit">
                        <StepApplicantType v-if="stepIndex === 1" />

                        <StepRepresentativeDetails v-if="stepIndex === 2" />

                        <StepPassportInfo v-if="stepIndex === 3" />

                        <Button class="float-right mt-3">
                            <span>Next</span>
                            <ArrowRight />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
