<script setup>
import { ref } from 'vue';

import Header from '@/Components/Layouts/Header.vue';
import Sidebar from '@/Components/Layouts/Sidebar.vue';
import CommonNotify from '@/Components/ui/notify/CommonNotify.vue';

const isMobileMenuOpen = ref(false);
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <Sidebar
            :isMobileMenuOpen="isMobileMenuOpen"
            @closeMobileMenu="isMobileMenuOpen = false"
        />

        <main class="flex-1 pl-[0px]">
            <Header @openMobileMenu="isMobileMenuOpen = true" />

            <article class="m-2 rounded-xl bg-[#f4f4f580] p-6">
                <slot></slot>
            </article>
        </main>
    </div>

    <CommonNotify />
</template>
