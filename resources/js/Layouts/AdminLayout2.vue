<script setup>
import CommonNotify from '@/Components/ui/notify/CommonNotify.vue';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

const { messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();

etaApplicationStore.setMessages(messages);
</script>

<template>
    <div class="m-auto h-screen max-w-[1440px]">
        <div class="relative">
            <img src="/images/header_admin.png" alt="" class="h-[125px]" />

            <div class="menu absolute right-[72px] top-[50%] flex translate-y-[-50%] items-center justify-center">
                <span class="mr-[20px] text-[20px] font-bold text-white">ログイン中</span>

                <a
                    :href="route('admin.logout')"
                    class="btn-logout rounded-[30px] bg-[#02B9FA] px-[75px] py-[11px] text-[16px] font-bold text-white hover:bg-[#35a9d3]"
                >
                    ログアウト
                </a>
            </div>
        </div>

        <div class="xs:px-[80px] m-auto px-[20px]">
            <div class="mb-[60px] mt-[50px] flex items-center border-b-4 border-b-[#000000]">
                <div class="img"><img src="/images/logo-admin.png" alt="" /></div>
                <h1 class="ml-[50px] text-[30px] font-bold">申請一覧</h1>
            </div>

            <ScrollArea class="flex-1 overflow-auto pl-[0px]">
                <article>
                    <slot></slot>
                </article>
            </ScrollArea>
        </div>
    </div>

    <CommonNotify />
</template>
