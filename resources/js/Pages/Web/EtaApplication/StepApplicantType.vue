<script setup>
import InputError from '@/Components/InputError.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalHelpApplyForSomeone = defineAsyncComponent(() => import('@/Components/Modals/ModalHelpApplyForSomeone.vue'));

const etaApplicationStore = useEtaApplicationStore();

const { formData, errors } = storeToRefs(etaApplicationStore);

const isOpenModalHelpApplyForSomeone = ref(false);
</script>

<template>
    <div class="form-group">
        <div class="flex">
            <LabelRequired :title="'Are you applying on behalf of someone?'" />
            <CircleHelp class="icon-question" @click="isOpenModalHelpApplyForSomeone = true" />
        </div>

        <div class="md:max-w-[60%]">
            <Select v-model="formData.isRepresentative">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <InputError :message="errors.isRepresentative && errors.isRepresentative[0]" />
        </div>
    </div>

    <div v-if="formData.isRepresentative && formData.isRepresentative == 'yes'" class="form-group">
        <LabelRequired :title="'Are you applying on behalf of a minor child?'" />

        <div class="md:max-w-[60%]">
            <Select v-model="formData.isApplyingOnBehalfOfMinorChild">
                <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <InputError :message="errors.isApplyingOnBehalfOfMinorChild && errors.isApplyingOnBehalfOfMinorChild[0]" />
        </div>
    </div>

    <ModalHelpApplyForSomeone :open="isOpenModalHelpApplyForSomeone" @close="isOpenModalHelpApplyForSomeone = false" />
</template>
