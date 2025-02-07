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
        <h2 class="title">連絡に関する情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">メールアドレス</b>
                <p class="item__content">{{ item.data.contactDetails.emailAddress }}</p>
            </li>
        </ul>
    </div>
</template>
