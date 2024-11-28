<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref, watch } from 'vue';

import Notify from './Notify.vue';

const page = usePage();
const notify = computed(() => {
    return page.props.session_flash;
});

const showNotify = ref(false);
const message = ref('');
const type = ref(null);

watch(notify, () => {
    handleNotify();
});

onMounted(() => {
    handleNotify();
});

const handleNotify = () => {
    if (notify.value.alert_success) {
        type.value = 'success';
        showNotify.value = true;
        message.value = notify.value.alert_success;
    } else if (notify.value.alert_error) {
        type.value = 'error';
        showNotify.value = true;
        message.value = notify.value.alert_error;
    }
};
</script>

<template>
    <Notify v-model="showNotify" :message="message" :type="type" />
</template>
