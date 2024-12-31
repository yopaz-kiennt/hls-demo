<script setup>
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Bell,
    ChevronDown,
    CreditCard,
    HomeIcon,
    LayoutDashboard,
    LogOut,
    Sparkles,
    SquareChartGantt,
    User,
} from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import { route } from 'ziggy-js';

const { messages } = usePage().props;

defineProps({
    isMobileMenuOpen: {
        type: Boolean,
        default: false,
    },
});

const menuItems = ref([
    {
        title: messages.home,
        icon: HomeIcon,
        children: null,
        isOpen: false,
        routeName: 'dashboard',
    },
    {
        title: messages.registration_information_list,
        icon: SquareChartGantt,
        children: null,
        isOpen: false,
        routeName: 'admin.eta_management.index',
    },
    // {
    //     title: 'Playground',
    //     icon: PlaySquare,
    //     children: [
    //         {
    //             title: 'Settings',
    //             routeName: '',
    //         },
    //         {
    //             title: 'Starred',
    //             routeName: '',
    //         },
    //     ],
    //     isOpen: false,
    // },
    // {
    //     title: 'Models',
    //     icon: Box,
    //     children: [
    //         {
    //             title: 'History',
    //             routeName: '',
    //         },
    //         {
    //             title: 'Explorer',
    //             routeName: '',
    //         },
    //         {
    //             title: 'Quantum',
    //             routeName: '',
    //         },
    //     ],
    //     isOpen: false,
    // },
    // {
    //     title: 'Documentation',
    //     icon: FileText,
    //     children: [
    //         {
    //             title: 'Introduction',
    //             routeName: '',
    //         },
    //         {
    //             title: 'API Reference',
    //             routeName: '',
    //         },
    //         {
    //             title: 'Examples',
    //             routeName: '',
    //         },
    //     ],
    //     isOpen: false,
    // },
]);

const profileMenu = [
    { label: 'Upgrade to Pro', icon: Sparkles },
    { label: 'Account', icon: User },
    { label: 'Billing', icon: CreditCard },
    { label: 'Notifications', icon: Bell },
    { label: 'Log out', icon: LogOut },
];

const isProfileOpen = ref(false);
const menuRef = ref(null);
const profileRef = ref(null);
const emit = defineEmits(['closeMobileMenu']);

const toggleMenu = (index) => {
    const item = menuItems.value[index];

    if (!item.children) {
        return;
    }

    item.isOpen = !item.isOpen;
};

const isChildActive = (children) => {
    return children.some((child) => child.routeName && route().current(child.routeName));
};

const handleClickOutside = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        emit('closeMobileMenu');
    }

    if (profileRef.value && !profileRef.value.contains(event.target)) {
        isProfileOpen.value = false;
    }
};

onMounted(() => {
    menuItems.value.forEach((item, index) => {
        if (item.children && isChildActive(item.children)) {
            menuItems.value[index].isOpen = true;
        }
    });

    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="flex min-h-screen">
        <aside
            ref="menuRef"
            class="relative flex w-[280px] flex-col border-r transition-all duration-300"
            :class="{
                'show-menu': isMobileMenuOpen,
            }"
        >
            <div class="absolute inset-y-0 -right-1 w-2 transition-colors hover:bg-gray-200"></div>

            <div class="flex items-center justify-between border-b p-4">
                <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-[#50b0c7] p-2 text-white">
                        <LayoutDashboard class="h-5 w-5" />
                    </div>

                    <div>
                        <h2 class="font-semibold">アドミン</h2>
                        <!-- <p class="text-xs text-gray-500">Enterprise</p> -->
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <ScrollArea class="flex-1 overflow-y-auto">
                <div class="p-2">
                    <div class="space-y-1">
                        <div v-for="(item, index) in menuItems" :key="index">
                            <component
                                :is="item.children ? 'a' : Link"
                                class="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                                :class="{
                                    active: item.routeName && route().current(item.routeName),
                                }"
                                :title="item.title"
                                :href="item.routeName ? route(item.routeName) : '#'"
                                @click="toggleMenu(index)"
                            >
                                <div class="flex items-center gap-3">
                                    <component :is="item.icon" class="h-5 w-5 text-gray-500" />
                                    <span class="text-sm">
                                        {{ item.title }}
                                    </span>
                                </div>
                                <ChevronDown
                                    v-if="item.children"
                                    class="h-4 w-4 text-gray-400 transition-transform duration-200"
                                    :class="{ 'rotate-180': item.isOpen }"
                                />
                            </component>
                            <transition
                                enter-active-class="transition-all duration-300 ease-in-out"
                                enter-from-class="opacity-0 -translate-y-2"
                                enter-to-class="opacity-100 translate-y-0"
                                leave-active-class="transition-all duration-200 ease-in-out"
                                leave-from-class="opacity-100 translate-y-0"
                                leave-to-class="opacity-0 -translate-y-2"
                            >
                                <div v-show="item.isOpen" class="ul-parent relative overflow-hidden">
                                    <div class="ml-9 mt-1 space-y-1">
                                        <Link
                                            v-for="(child, childIndex) in item.children"
                                            :key="childIndex"
                                            :href="child.routeName ? route(child.routeName) : '#'"
                                            class="block rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
                                            :class="{
                                                active: child.routeName && route().current(child.routeName),
                                            }"
                                        >
                                            {{ child.title }}
                                        </Link>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <!-- User Profile -->
            <div class="mt-auto border-t">
                <div ref="profileRef" class="p-4">
                    <button class="flex w-full items-center gap-3" @click="isProfileOpen = !isProfileOpen">
                        <div class="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                            <span class="text-xs font-medium"> CN </span>
                        </div>
                        <div class="flex-1 text-left">
                            <p class="text-sm font-medium">admin</p>
                            <p class="text-xs text-gray-500">m@example.com</p>
                        </div>
                        <ChevronDown
                            class="h-4 w-4 text-gray-400 transition-transform duration-200"
                            :class="{ 'rotate-180': isProfileOpen }"
                        />
                    </button>

                    <transition
                        enter-active-class="transition-all duration-300 ease-in-out"
                        enter-from-class="opacity-0 scale-95"
                        enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition-all duration-200 ease-in-out"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <div
                            v-show="isProfileOpen"
                            class="absolute bottom-[70px] left-4 right-4 z-50 min-w-[200px] rounded-lg border bg-white py-1 shadow-lg"
                        >
                            <button
                                v-for="(item, index) in profileMenu"
                                :key="index"
                                class="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                            >
                                <component :is="item.icon" class="h-4 w-4" />
                                {{ item.label }}
                            </button>
                        </div>
                    </transition>
                </div>
            </div>
        </aside>
    </div>
</template>

<style scoped lang="scss">
aside {
    .ul-parent {
        &:after {
            content: '';
            position: absolute;
            z-index: 1;
            height: 95%;
            width: 1px;
            background-color: #e2e8f0;
            top: 2px;
            left: 22px;
        }
    }

    .active {
        background-color: #d3d3d380;
        color: #000;
    }
}

@media (max-width: 767px) {
    aside {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 260px;
        z-index: 50;
        background: #fdfdfd;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;

        &.show-menu {
            transform: translateX(0);
        }
    }
}
</style>
