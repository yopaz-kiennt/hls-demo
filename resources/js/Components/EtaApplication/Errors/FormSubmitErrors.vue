<script setup>
import IconWarning from '@/Components/ui/icons/IconWarning.vue';
import ScrollArea from '@/Components/ui/scroll-area/ScrollArea.vue';
import { scrollToField } from '@/helper';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

const { showErrorMessageApplyOnBehalfOfMinorChild } = storeToRefs(etaApplicationStore);
</script>

<template>
    <div v-if="showErrorMessageApplyOnBehalfOfMinorChild" class="form-submit-errors">
        <div class="warning">
            <IconWarning class="icon-warning" />
        </div>

        <ScrollArea class="content">
            <h2 class="title">
                {{ messages.the_form_could_not_be_submitted_because_errors_were_found }}
            </h2>

            <ul class="list">
                <li>
                    <a
                        href="#personalDetails.dobYear"
                        class="href-custom"
                        @click.prevent="scrollToField('personalDetails.dobYear')"
                    >
                        {{ messages.year_of_birth }}
                    </a>
                    <span class="ml-2">-</span>

                    <span>
                        {{ messages.you_indicate_that_you_want_to_apply_on_behalf_of_a_minor }}
                    </span>
                </li>
            </ul>
        </ScrollArea>
    </div>
</template>

<style scoped lang="scss">
@import url('../../../../sass/form-errors.scss');
</style>
