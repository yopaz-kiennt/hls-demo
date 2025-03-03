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
        <Head title="Payment Cancel" />
        <div
            class="mx-auto mb-[40px] mt-[126px] max-w-[750px] rounded-[10px] border border-black py-[40px] text-center"
        >
            <div
                class="flex min-h-[96px] items-center justify-center bg-[#FF0000] text-[40px] font-bold text-[#FFFFFF]"
            >
                エラーが発生しました
            </div>
            <div class="px-[20px]">
                <div class="mt-[33px] text-[32px] font-bold">ご利用のクレジットカードをご確認いただき</div>
                <div class="mb-[32px] text-[32px] font-bold">再度ご登録ください</div>
                <div class="text-[16px] font-normal">エラーが解消されない場合はカード会社に</div>
                <div class="text-[16px] font-normal">直接お問合せいただきますようお願いいたします。</div>
                <div class="text-[16px] font-normal">クレジットカードに不具合が見られない場合は、</div>
                <div class="text-[16px] font-normal">お手数ですが下記メールアドレスにお問い合わせください。</div>
                <div class="mb-[49px] mt-[26px] text-[18px] font-normal">{{ contactEmail }}</div>
                <a :href="route('home')" class="cta_btn !mb-[0px] !bg-[#D9D9D9] !text-black"> ホームに戻る </a>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
