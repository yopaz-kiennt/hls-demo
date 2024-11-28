<script setup>
import { ref } from 'vue';

import Sidebar from '@/Components/Layouts/Sidebar.vue';
import { ChevronRight, MenuIcon } from 'lucide-vue-next';

const isMobileMenuOpen = ref(false);
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <Sidebar
            :isMobileMenuOpen="isMobileMenuOpen"
            @closeMobileMenu="isMobileMenuOpen = false"
        />

        <main class="flex-1 pl-[0px]">
            <header class="flex h-[73px] items-center gap-2 border-b px-4">
                <button
                    class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 md:hidden"
                    @click="isMobileMenuOpen = true"
                >
                    <MenuIcon class="h-5 w-5" />
                </button>

                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">
                        Building Your Application
                    </span>
                    <ChevronRight class="h-4 w-4 text-gray-400" />
                    <span class="text-sm">Data Fetching</span>
                </div>
            </header>

            <article class="m-2 rounded-xl bg-[#f4f4f580] p-6">
                <slot></slot>
            </article>
        </main>
    </div>
</template>
