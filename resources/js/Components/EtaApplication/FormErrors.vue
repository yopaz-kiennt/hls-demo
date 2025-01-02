<script setup>
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import IconWarning from '../ui/icons/IconWarning.vue';
import { ScrollArea } from '../ui/scroll-area';

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

const { fieldNames } = storeToRefs(etaApplicationStore);

defineProps({
    errors: {
        type: Object,
        default: () => {},
    },
});

const scrollToField = (field) => {
    const targetElement = document.getElementById(field);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.focus();
    }
};
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
.form-submit-errors,
.form-submit-errors .content {
    min-height: 80px;
    max-height: 300px;

    @media screen and (max-width: 768px) {
        max-height: 250px;
    }
}

.form-submit-errors {
    padding: 10px 10px 0 10px;
    display: flex;
    position: relative;
    overflow: hidden;

    .warning {
        margin-right: 20px;
        position: absolute;
        height: 100%;

        .icon-warning {
            z-index: 1;
            padding-top: 25px;
            height: 100%;

            &::before {
                top: 0;
            }

            &::after {
                height: 100%;
                bottom: -59px;
            }
        }
    }

    .content {
        padding-left: 40px;
        padding-bottom: 15px;

        width: 100%;
        overflow: auto;

        .title {
            font-size: 24px;
            font-weight: bold;
        }

        ul.list {
            list-style: disc;
            padding-left: 30px;

            a {
                color: #62108b;
                font-weight: bold;
            }
        }
    }
}

@media screen and (max-width: 767px) {
    .form-submit-errors {
        .content {
            .title {
                font-size: 17px;
            }

            .list {
                a {
                    font-size: 13px;
                }
            }
        }
    }
}
</style>
