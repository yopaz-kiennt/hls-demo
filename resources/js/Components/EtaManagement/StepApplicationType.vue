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
        <h2 class="title">代行人情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">代理人か</b>

                <p class="item__content">
                    <span v-if="item.data.isRepresentative == '0'">はい</span>
                    <span v-else>いいえ</span>
                </p>
            </li>

            <li v-if="item.data.isRepresentative == '0'" class="item">
                <b class="item__title top-0">未成年者の<br />代理申請か</b>

                <p class="item__content">
                    <span v-if="item.data.isApplyingOnBehalfOfMinorChild == '0'">はい</span>
                    <span v-else>いいえ</span>
                </p>
            </li>
        </ul>
    </div>
</template>
