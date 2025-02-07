<script setup>
import { getMonthNumber } from '@/helper';

defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});
</script>

<template>
    <div>
        <h2 class="title">個人情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">パスポート番号</b>
                <p class="item__content">{{ item.data.personalDetails.passportNumber }}</p>
            </li>

            <li class="item">
                <b class="item__title">名前</b>
                <p class="item__content">
                    {{ item.data.personalDetails.firstName }}
                    <span v-if="item.data.personalDetails.lastName">
                        {{ item.data.personalDetails.lastName }}
                    </span>
                </p>
            </li>

            <li class="item">
                <b class="item__title">誕生日</b>
                <p class="item__content">
                    {{ item.data.personalDetails.dobYear }}/{{ getMonthNumber(item.data.personalDetails.dobMonth) }}/{{
                        item.data.personalDetails.dobDay
                    }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">性別</b>
                <p class="item__content">
                    <span v-if="item.data.personalDetails.gender === '0'"> 女性 </span>
                    <span v-else-if="item.data.personalDetails.gender === '1'"> 男性 </span>
                    <span v-else-if="item.data.personalDetails.gender === '2'"> その他の性別 </span>
                </p>
            </li>

            <li class="item">
                <b class="item__title">出生地</b>
                <p class="item__content">
                    <!-- {{ item.data.personalDetails.countryOfBirth }} -->
                    <span>Japan</span>
                    {{ item.data.personalDetails.cityTownOfBirth }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">発行日</b>
                <p class="item__content">
                    {{ item.data.personalDetails.issueDateYear }}/{{
                        getMonthNumber(item.data.personalDetails.issueDateMonth)
                    }}/{{ item.data.personalDetails.issueDateDay }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">有効期限日</b>
                <p class="item__content">
                    {{ item.data.personalDetails.expiryDateYear }}/{{
                        getMonthNumber(item.data.personalDetails.expiryDateMonth)
                    }}/{{ item.data.personalDetails.expiryDateDay }}
                </p>
            </li>
        </ul>
    </div>
</template>
