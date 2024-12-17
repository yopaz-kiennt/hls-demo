<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { CircleHelp } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, ref } from 'vue';
const ModalHelpApplyForSomeone = defineAsyncComponent(
    () => import('@/Components/EtaApplication/StepApplicantType/Modals/ModalHelpApplyForSomeone.vue')
);

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const isOpenModalHelpApplyForSomeone = ref(false);
</script>

<template>
    <FormField v-slot="{ componentField, errors }" name="isRepresentative">
        <FormItem class="form-group">
            <div class="flex">
                <LabelRequired :title="'この申請は誰かの代わりに行うものですか？'" />
                <!-- Are you applying on behalf of someone? -->
                <CircleHelp class="icon-question" @click="isOpenModalHelpApplyForSomeone = true" />
            </div>

            <div class="md:max-w-[60%]">
                <Select v-model="formData.isRepresentative" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">はい<!-- Yes --></SelectItem>
                            <SelectItem value="1">いいえ</SelectItem>
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
            <LabelRequired :title="'この申請は未成年者の代わりに行うものですか? '" />
            <!-- Are you applying on behalf of a minor child? -->

            <div class="md:max-w-[60%]">
                <Select v-model="formData.isApplyingOnBehalfOfMinorChild" v-bind="componentField">
                    <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                        <SelectTrigger>
                            <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">はい</SelectItem>
                            <SelectItem value="1">いいえ</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <ModalHelpApplyForSomeone :open="isOpenModalHelpApplyForSomeone" @close="isOpenModalHelpApplyForSomeone = false" />
</template>
