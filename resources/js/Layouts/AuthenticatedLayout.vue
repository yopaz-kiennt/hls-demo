<script setup>
import CommonNotify from '@/Components/ui/notify/CommonNotify.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Link, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { route } from 'ziggy-js';

const isHamburgerOpen = ref(false);

const { messages } = usePage().props;
const etaApplicationStore = useEtaApplicationStore();

etaApplicationStore.setMessages(messages);

function toggleHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value;
}
</script>

<template>
    <div>
        <div id="contents-wrap" class="contents-wrap">
            <header id="header" class="header">
                <div class="header_wrap">
                    <div class="logoWrap">
                        <h1 class="logo">
                            <Link :href="route('home')"><img src="images/logo.png" alt="" /></Link>
                        </h1>
                        <p class="logo_text">カナダeTAを日本語で申請</p>
                    </div>
                    <!-- グローバルナビ -->
                    <!-- ============================================ -->
                    <div class="is-desktop">
                        <div class="header_nav">
                            <nav class="gnav">
                                <ul>
                                    <li
                                        class="gnav_item"
                                        :class="{
                                            active: 'home' && route().current('home'),
                                        }"
                                    >
                                        <Link :href="route('home')" class="">HOME</Link>
                                    </li>
                                    <li
                                        class="gnav_item"
                                        :class="{
                                            active: 'service' && route().current('service'),
                                        }"
                                    >
                                        <Link :href="route('service')">SERVICE</Link>
                                    </li>
                                    <li class="gnav_item gnav_btn">
                                        <a :href="route('eta_application.index')" class="">eTA申請</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- スマホメニューボタン -->
                    <!-- ============================================ -->
                    <div class="is-mobile">
                        <div class="hamburgerBtnArea">
                            <!-- Bắt sự kiện click và toggle class dựa trên isHamburgerOpen -->
                            <div
                                class="hamburgerBtn"
                                :class="{ hamburgerBtn_open: isHamburgerOpen }"
                                @click="toggleHamburger"
                            >
                                <span
                                    class="hamburgerBtn_bar"
                                    :class="{ 'is-hamburgerBtn_bar-rotate': isHamburgerOpen }"
                                ></span>
                                <span
                                    class="hamburgerBtn_bar hamburgerBtn_bar2"
                                    :class="{ 'is-hamburgerBtn_bar-rotate2': isHamburgerOpen }"
                                ></span>
                                <span
                                    class="hamburgerBtn_bar hamburgerBtn_bar3"
                                    :class="{ 'is-hamburgerBtn_bar-translate': isHamburgerOpen }"
                                ></span>
                            </div>
                        </div>
                        <!-- スマホメニュー -->
                        <div class="hamburger" :class="{ 'is-hamburger-open': isHamburgerOpen }">
                            <ul class="hamburger_list">
                                <li class="hamburger_item">
                                    <Link :href="route('home')" class="hamburger_link">HOME</Link>
                                </li>
                                <li class="hamburger_item">
                                    <Link :href="route('service')" class="hamburger_link">SERVICE</Link>
                                </li>
                                <li class="hamburger_item">
                                    <a :href="route('eta_application.index')" class="hamburger_link hamburger_listBtn">
                                        eTA申請
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>

            <footer class="footer">
                <p class="copyright"><small>© HAJIMARI Business Partners Inc.</small></p>
                <ul class="fnav_list">
                    <li class="fnav_item"><Link :href="route('service')">SERVICE</Link></li>
                    <li class="fnav_item"><Link :href="route('policy')">プライバシーポリシー</Link></li>
                </ul>
            </footer>
        </div>
    </div>

    <CommonNotify />
</template>

<style>
@import url('@css/reset.css');
@import url('@css/base.css');
@import url('@css/spacer.css');
@import url('@css/header.css');
@import url('@css/footer.css');
@import url('@css/main.css');
@import url('@css/animation.css');

.gnav_item {
    border-bottom: 2px solid transparent;
}

.gnav_item.active {
    border-bottom: 2px solid #ff0000;
}
</style>
