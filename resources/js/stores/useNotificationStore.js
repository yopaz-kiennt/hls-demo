import { acceptHMRUpdate, defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
        showNotify: false,
        title: '',
        description: '',
        type: null,
    }),
    actions: {
        addNotification(type, title, description = '') {
            const id = Date.now();
            this.notifications.push({ id, type, title, description, showNotify: true, position: 20 });

            setTimeout(() => {
                this.resetNotify();
            }, 5000);
        },
        triggerNotify({ type, title, description }) {
            this.type = type;
            this.title = title;
            this.description = description;
        },
        resetNotify() {
            this.title = '';
            this.description = '';
            this.type = null;
            this.showNotify = false;
            this.notifications = [];
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot));
}
