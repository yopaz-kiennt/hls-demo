<script setup>
import { Button } from '@/Components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelNoRequired from '@/Components/ui/label/LabelNoRequired.vue';
import Loading2 from '@/Components/ui/loading/Loading2.vue';
import { useLoginStore } from '@/stores/useLoginStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { Form } from 'vee-validate';

const loginStore = useLoginStore();

const { messages } = usePage().props;
const { formData, formSchema, errorMessage, loading } = storeToRefs(loginStore);

loginStore.setMessages(messages);
</script>

<template>
    <div class="login-page">
        <div class="card-login">
            <Form class="form" keep-values :validation-schema="formSchema" @submit="loginStore.submit()">
                <h1 class="title">Login</h1>

                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                <FormField v-slot="{ componentField, errors }" name="email">
                    <FormItem class="form-group">
                        <div class="flex">
                            <LabelNoRequired :title="messages.email" inputId="email" />
                        </div>

                        <div>
                            <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                                <Input
                                    v-bind="componentField"
                                    id="email"
                                    v-model="formData.email"
                                    type="text"
                                    :placeholder="messages.please_enter"
                                />
                            </FormControl>
                        </div>

                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField, errors }" name="password">
                    <FormItem class="form-group">
                        <div class="flex">
                            <LabelNoRequired :title="messages.password" inputId="password" />
                        </div>

                        <div>
                            <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                                <Input
                                    v-bind="componentField"
                                    id="password"
                                    v-model="formData.password"
                                    type="password"
                                    :placeholder="messages.please_enter"
                                />
                            </FormControl>
                        </div>

                        <FormMessage />
                    </FormItem>
                </FormField>

                <Button class="btn-submit" type="submit" :disabled="loading">
                    <Loading2 v-if="loading" />
                    <span>{{ messages.log_in }}</span>
                </Button>
            </Form>

            <div class="logo">
                <img src="/images/admin_logo.png" alt="Logo" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import url('@sass/login.scss');
</style>
