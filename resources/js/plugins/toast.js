import { useNotificationStore } from '@/stores/useNotificationStore';

export default {
    install() {
        window.$toast = function ({ type, title, description = '' }) {
            const notificationStore = useNotificationStore();

            if (!notificationStore || !notificationStore.triggerNotify) {
                console.error('Notification store is not available or improperly configured.');
                return;
            }
            notificationStore.resetNotify();
            notificationStore.addNotification(type, title, description);
        };
    },
};
