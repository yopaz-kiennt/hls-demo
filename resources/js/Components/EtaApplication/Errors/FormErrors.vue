<script setup>
import IconWarning from '@/Components/ui/icons/IconWarning.vue';
import ScrollArea from '@/Components/ui/scroll-area/ScrollArea.vue';
import { scrollToField } from '@/helper';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

const { fieldNames } = storeToRefs(etaApplicationStore);

defineProps({
    errors: {
        type: Object,
        default: () => {},
    },
});
</script>

<template>
    <div v-if="Object.keys(errors).length > 0" class="form-submit-errors">
        <div class="warning">
            <IconWarning class="icon-warning" />
        </div>

        <ScrollArea class="content">
            <h2 class="title">
                {{ messages.the_form_could_not_be_submitted_because_errors_were_found }}
            </h2>

            <ul class="list">
                <li v-for="(error, field) in errors" :key="field">
                    <a :href="`#${field}`" class="href-custom" @click.prevent="scrollToField(field)">{{
                        fieldNames[field] || field
                    }}</a
                    >: {{ error }}
                </li>
            </ul>
        </ScrollArea>
    </div>
</template>

<style scoped lang="scss">
@import url('../../../../sass/form-errors.scss');
</style>
