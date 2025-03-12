<script setup>
import Loading from '@/Components/ui/loading/Loading.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

defineProps({
    applicationUuid: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
});

const { messages } = usePage().props;
const csrfToken = computed(() => usePage().props.csrf_token);

const isLoading = ref();
const disableSubmitting = () => {
    isLoading.value = true;
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Pay" />
        <h1 class="mb-[24px] mt-[126px] text-center text-[32px] font-bold">{{ messages.summary_of_fees }}</h1>
        <div class="mx-auto max-w-[607px] p-[40px] sm:px-6 md:p-[20px]">
            <table class="w-full">
                <thead>
                    <tr class="bg-[#D9D9D9]">
                        <th class="py-[6px] text-center text-[16px] font-normal">{{ messages.application }}</th>
                        <th class="py-[6px] text-center text-[16px] font-normal">{{ messages.quantity }}</th>
                        <th class="py-[6px] text-center text-[16px] font-normal">{{ messages.price }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-dashed border-black">
                        <td class="py-[20px] text-center text-[20px] font-normal">{{ messages.eta_fee }}</td>
                        <td class="py-[20px] text-center text-[20px] font-normal">1</td>
                        <td class="py-[20px] text-center text-[20px] font-normal">7カナダ$</td>
                    </tr>
                    <tr class="border-b-2 border-black">
                        <td class="py-[20px] text-center text-[20px] font-normal">
                            {{ messages.application_support_fee }}
                        </td>
                        <td class="py-[20px] text-center text-[20px] font-normal">1</td>
                        <td class="py-[20px] text-center text-[20px] font-normal">3200円</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-[20px] flex flex-col items-end">
                <div class="flex items-center space-x-12 pr-[48px] font-bold">
                    <span class="text-[25px]">{{ messages.total }}</span>
                    <span class="text-[34px]">{{ totalAmount }}円</span>
                </div>
                <p class="pr-[48px] text-[14px] font-normal">{{ messages.price_note }}</p>
            </div>
            <div>
                <div class="mt-[40px] text-center text-[18px] font-normal">上記内容でお間違いなければ</div>
                <div class="mb-[40px] text-center text-[18px] font-normal">
                    「支払いへ進む」にて次へお進みくださいください。
                </div>
            </div>
            <div class="flex space-x-20">
                <a :href="route('eta_application.index')" class="cta_btn pageLink--black flex-1">
                    {{ messages.previous_screen }}
                </a>
                <form
                    class="flex-1"
                    :action="route('payment.checkout', applicationUuid)"
                    method="POST"
                    @submit="disableSubmitting()"
                >
                    <input type="hidden" :value="csrfToken" name="_token" />
                    <button class="cta_btn" type="submit" :disabled="isLoading">
                        {{ messages.proceed_to_payment }}
                    </button>
                </form>
            </div>
            <div v-if="isLoading" class="loading-overlay">
                <Loading />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
