<script setup>
import { Button } from '@/Components/ui/button';
import { Form } from '@/Components/ui/form';
import {
    Stepper,
    StepperDescription,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from '@/Components/ui/stepper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head } from '@inertiajs/vue3';
import { ArrowLeft, ArrowRight, Check, Circle, Dot, Save } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';
import StepApplicantType from './StepApplicantType.vue';
import StepPassportInfo from './StepPassportInfo.vue';
import StepRepresentativeDetails from './StepRepresentativeDetails.vue';

const etaApplicationStore = useEtaApplicationStore();

const { stepIndex, formSchema, steps } = storeToRefs(etaApplicationStore);

const handleSubmit = () => {
    etaApplicationStore.submitForm();
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
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
                        v-slot="{ meta, values, validate }"
                        as=""
                        keep-values
                        :validation-schema="formSchema[stepIndex - 1]"
                    >
                        <Stepper
                            v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
                            v-model="stepIndex"
                            class="block w-full"
                        >
                            <form
                                @submit="
                                    (e) => {
                                        e.preventDefault();
                                        validate();

                                        if (stepIndex === steps.length && meta.valid) {
                                            handleSubmit(values);
                                        }
                                    }
                                "
                            >
                                <div class="flex-start mb-5 hidden w-full gap-2">
                                    <StepperItem
                                        v-for="step in steps"
                                        :key="step.step"
                                        v-slot="{ state }"
                                        class="relative flex w-full flex-col items-center justify-center"
                                        :step="step.step"
                                    >
                                        <StepperSeparator
                                            v-if="step.step !== steps[steps.length - 1].step"
                                            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                        />

                                        <StepperTrigger as-child>
                                            <Button
                                                :variant="
                                                    state === 'completed' || state === 'active' ? 'default' : 'outline'
                                                "
                                                size="icon"
                                                class="z-10 shrink-0 rounded-full"
                                                :class="[
                                                    state === 'active' &&
                                                        'ring-2 ring-ring ring-offset-2 ring-offset-background',
                                                ]"
                                                :disabled="state !== 'completed' && !meta.valid"
                                            >
                                                <Check v-if="state === 'completed'" class="size-5" />
                                                <Circle v-if="state === 'active'" />
                                                <Dot v-if="state === 'inactive'" />
                                            </Button>
                                        </StepperTrigger>

                                        <div class="mt-5 flex flex-col items-center text-center">
                                            <StepperTitle
                                                :class="[state === 'active' && 'text-primary']"
                                                class="text-sm font-semibold transition lg:text-base"
                                            >
                                                {{ step.title }}
                                            </StepperTitle>
                                            <StepperDescription
                                                :class="[state === 'active' && 'text-primary']"
                                                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                                            >
                                                {{ step.description }}
                                            </StepperDescription>
                                        </div>
                                    </StepperItem>
                                </div>

                                <StepApplicantType v-if="stepIndex === 1" />

                                <StepRepresentativeDetails v-if="stepIndex === 2" />

                                <StepPassportInfo v-if="stepIndex === 3" />

                                <div class="mt-4 flex items-center justify-between">
                                    <div>
                                        <Button
                                            v-if="stepIndex > 1"
                                            :disabled="isPrevDisabled"
                                            variant="outline"
                                            size="lg"
                                            @click="(prevStep(), scrollToTop())"
                                        >
                                            <ArrowLeft />
                                            <span>Back</span>
                                        </Button>
                                    </div>

                                    <div class="flex items-center gap-3">
                                        <Button
                                            v-if="stepIndex !== 3"
                                            :type="meta.valid ? 'button' : 'submit'"
                                            :disabled="isNextDisabled"
                                            size="lg"
                                            @click="(meta.valid && nextStep(), scrollToTop())"
                                        >
                                            <span>次へ</span>
                                            <ArrowRight />
                                        </Button>
                                        <Button v-if="stepIndex === 3" size="lg" type="submit">
                                            <Save />
                                            <span>Submit</span>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Stepper>
                    </Form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
