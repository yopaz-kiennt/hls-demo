<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Payment Success" />
        <div
            class="mx-auto mt-[126px] max-w-[750px] rounded-[10px] border border-black px-[20px] py-[40px] text-center"
        >
            <div class="mx-auto h-[48px] w-[48px]">
                <img src="/images/tick_icon.png" alt="" />
            </div>
            <div class="mt-[14px] text-[46px] font-bold text-[#0273E6]">登録成功</div>
            <div class="mb-[41px] mt-[22px] text-[32px] font-bold">登録とお支払いが完了しました。</div>
            <a :href="route('home')" class="cta_btn !mb-[0px] !bg-[#D9D9D9] !text-black"> ホームに戻る </a>
        </div>
    </AuthenticatedLayout>
</template>
