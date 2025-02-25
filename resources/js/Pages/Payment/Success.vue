<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    contactEmail: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Payment Success" />
        <div
            class="mx-auto mt-[126px] max-w-[607px] rounded-[10px] border border-black p-[40px] text-center sm:px-6 md:p-[20px]"
        >
            <div class="mx-auto mt-[16px] h-[48px] w-[48px]">
                <img src="/images/tick_icon.png" alt="" />
            </div>
            <h2 class="mt-[14px] text-[46px] font-bold text-[#0273E6]">登録成功</h2>
            <div class="mt-[22px] text-[32px] font-bold">[名前] 様</div>
            <div class="text-[32px] font-bold">登録とお支払いが完了しました。</div>
            <div class="mt-[48px] text-[18px] font-normal">5分以上経過しても決済完了のメールが届かない場合は、</div>
            <div class="text-[18px] font-normal">下記へお問い合わせください</div>
            <div class="mb-[41px] mt-[19px] text-[18px] font-normal underline">{{ contactEmail }}</div>
            <a :href="route('home')" class="cta_btn pageLink--black !text-black"> ホームに戻る </a>
        </div>
    </AuthenticatedLayout>
</template>
