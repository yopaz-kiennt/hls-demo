<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalHelpApplyForSomeone = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepApplicantType/Modals/ModalHelpApplyForSomeone.vue')
);

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const isOpenModalHelpApplyForSomeone = ref(false);
</script>

<template>
    <FormField v-slot="{ componentField, errors }" name="isRepresentative">
        <FormItem class="form-group">
            <div class="flex">
                <LabelRequired :title="messages.are_you_applying_for_someone" />
                <CircleHelp class="icon-question" @click="isOpenModalHelpApplyForSomeone = true" />
            </div>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.isRepresentative" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">
                                {{ messages.yes }}
                            </SelectItem>
                            <SelectItem value="1">{{ messages.no }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField
        v-if="formData.isRepresentative && formData.isRepresentative == '0'"
        v-slot="{ componentField, errors }"
        name="isApplyingOnBehalfOfMinorChild"
    >
        <FormItem class="form-group">
            <LabelRequired :title="messages.are_you_applying_on_behalf_of_minor" />

            <div class="md:max-w-[60%]">
                <Select v-model="formData.isApplyingOnBehalfOfMinorChild" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue :placeholder="messages.please_select" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">{{ messages.yes }}</SelectItem>
                            <SelectItem value="1">{{ messages.no }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <ModalHelpApplyForSomeone :open="isOpenModalHelpApplyForSomeone" @close="isOpenModalHelpApplyForSomeone = false" />
</template>
