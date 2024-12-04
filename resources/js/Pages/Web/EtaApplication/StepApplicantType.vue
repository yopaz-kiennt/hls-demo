<script setup>
import InputError from '@/Components/InputError.vue';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData, errors } = storeToRefs(etaApplicationStore);
</script>

<template>
    <div class="form-group">
        <LabelRequired :title="'Are you applying on behalf of someone?'" />

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
</template>
