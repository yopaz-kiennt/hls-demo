<script setup>
defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});
</script>

<template>
    <div>
        <h2 class="title">プライバシーポリシーに関して</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">申請者の署名</b>
                <p class="item__content">{{ item.data.consentAndDeclaration.fullName }}</p>
            </li>
        </ul>
    </div>
</template>
