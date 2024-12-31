<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, watch } from 'vue';

import { useNotificationStore } from '@/stores/useNotificationStore';
import { storeToRefs } from 'pinia';
import Notify from './Notify.vue';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

const page = usePage();
const notify = computed(() => {
    return page.props.session_flash;
});

watch(notify, () => {
    handleNotify();
});

watch(
    () => notificationStore.showNotify,
    (newValue) => {
        if (newValue) {
            notificationStore.addNotification(
                notificationStore.type,
                notificationStore.title,
                notificationStore.description
            );
        }
    }
);

onMounted(() => {
    handleNotify();
});

const handleNotify = () => {
    const alertType = notify.value.alert_success ? 'success' : notify.value.alert_error ? 'error' : null;

    if (alertType) {
        const message = notify.value[`alert_${alertType}`];
        console.log(message, alertType);
        notificationStore.addNotification(alertType, message);
    }
};
</script>

<template>
    <div v-for="notification in notifications" :key="notification.id">
        <Notify
            v-model="notification.showNotify"
            :title="notification.title"
            :description="notification.description"
            :type="notification.type"
        />
    </div>
</template>
