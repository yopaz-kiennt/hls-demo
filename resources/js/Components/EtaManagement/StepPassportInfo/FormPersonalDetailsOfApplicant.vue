<script setup>
import { ref } from 'vue';

defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});

const personalDetailsAdditionalCitizenshipMapping = ref({
    105: 'JPN (Japan)',
});

const personalDetailsMaritalStatusMapping = ref({
    0: '既婚',
    1: '法的別居',
    2: '離婚',
    3: '婚姻取消',
    4: '寡婦・寡夫',
    5: '事実婚',
    6: '独身／未婚',
});
</script>

<template>
    <div>
        <h2 class="title">個人情報</h2>

        <ul class="list-items">
            <li v-if="item.data.personalDetails.additionalCitizenship" class="item">
                <b class="item__title">追加の市民権</b>
                <p class="item__content">
                    {{ personalDetailsAdditionalCitizenshipMapping[item.data.personalDetails.additionalCitizenship] }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">婚姻状況</b>
                <p class="item__content">
                    {{ personalDetailsMaritalStatusMapping[item.data.personalDetails.maritalStatus] }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">以前にカナダへの申請歴があるか</b>
                <p class="item__content">
                    <span v-if="item.data.personalDetails.hasPreviouslyAppliedToCanada == '0'">はい</span>
                    <span v-else>いいえ</span>
                </p>
            </li>

            <li v-if="item.data.personalDetails.uci" class="item">
                <b class="item__title">UCI番号</b>
                <p class="item__content">{{ item.data.personalDetails.uci }}</p>
            </li>
        </ul>
    </div>
</template>
