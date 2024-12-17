<script setup>
import { ref } from 'vue';

import Header from '@/Components/Layouts/Header.vue';
import Sidebar from '@/Components/Layouts/Sidebar.vue';
import CommonNotify from '@/Components/ui/notify/CommonNotify.vue';
import { ScrollArea } from '@/Components/ui/scroll-area';

const isMobileMenuOpen = ref(false);
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <Sidebar :isMobileMenuOpen="isMobileMenuOpen" @closeMobileMenu="isMobileMenuOpen = false" />

        <ScrollArea class="flex-1 overflow-auto pl-[0px]">
            <Header @openMobileMenu="isMobileMenuOpen = true" />

            <article class="m-2 mt-[80px] rounded-xl bg-[#f4f4f580] p-6">
                <slot></slot>
            </article>
        </ScrollArea>
    </div>

    <CommonNotify />
</template>
