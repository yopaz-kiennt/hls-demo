<script setup>
import { usePage } from '@inertiajs/vue3';
import { ErrorMessage } from 'vee-validate';
import { toValue } from 'vue';
import { useFormField } from './useFormField';

const { name, formMessageId } = useFormField();

const { lang } = usePage().props;
</script>

<template>
    <ErrorMessage
        :id="formMessageId"
        as="p"
        :name="toValue(name)"
        class="font-medium text-destructive"
        :class="lang === 'en' ? 'text-[13px]' : 'text-[12px]'"
    />
</template>
