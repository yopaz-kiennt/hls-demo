import { router } from '@inertiajs/vue3';
import axios, { AxiosError } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import * as yup from 'yup';

export const useLoginStore = defineStore('login', {
    state: () => ({
        messages: {},
        formData: {
            email: '',
            password: '',
        },
        errorMessage: '',
        loading: false,
    }),
    getters: {
        formSchema() {
            const schemas = yup.object({
                email: yup
                    .string()
                    .required(this.messages.please_be_sure_to_enter_this_item)
                    .email(this.messages.email_valid),
                password: yup.string().required(this.messages.please_be_sure_to_enter_this_item),
            });
            return schemas;
        },
    },
    actions: {
        setMessages(messages) {
            this.messages = messages;
        },
        async submit() {
            try {
                this.loading = true;
                await axios.post(this.$route('admin.login'), this.formData);

                router.visit(this.$route('admin.eta_management.index'));
                this.errorMessage = '';
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response) {
                        this.errorMessage = error.response.data.message;
                    } else {
                        console.error(error);
                    }
                }

                setTimeout(() => {
                    this.loading = false;
                }, 200);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
