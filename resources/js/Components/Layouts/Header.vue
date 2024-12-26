<script setup>
import { ChevronRight, MenuIcon } from 'lucide-vue-next';

defineProps({
    isMobileMenuOpen: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['openMobileMenu']);
</script>

<template>
    <header class="fixed top-0 flex h-[73px] w-[100%] items-center gap-2 border-b bg-white px-4">
        <button
            class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 md:hidden"
            @click="$emit('openMobileMenu')"
        >
            <MenuIcon class="h-5 w-5" />
        </button>

        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500"> アドミン </span>
            <ChevronRight class="h-4 w-4 text-gray-400" />
            <span class="text-sm">登録情報リスト</span>
        </div>
    </header>
</template>
