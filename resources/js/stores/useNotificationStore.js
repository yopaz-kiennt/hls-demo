import { acceptHMRUpdate, defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        showNotify: false,
        message: '',
        type: null,
    }),
    actions: {
        triggerNotify({ type, message }) {
            this.type = type;
            this.message = message;
            this.showNotify = true;
        },
        resetNotify() {
            this.showNotify = false;
            this.message = '';
            this.type = null;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot));
}
