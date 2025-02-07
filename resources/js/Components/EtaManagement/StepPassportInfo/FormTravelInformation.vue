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
        <h2 class="title">渡航に関する情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">旅行日</b>
                <p class="item__content">
                    {{ item.data.travelDetails.travelDateYear }}/{{
                        getMonthNumber(item.data.travelDetails.travelDateMonth)
                    }}/{{ item.data.travelDetails.travelDateDay }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">旅行時刻</b>
                <p class="item__content">
                    {{ item.data.travelDetails.travelDateTimeHour }}:{{ item.data.travelDetails.travelDateTimeMinute }}
                    <span>Japan Time</span>
                </p>
            </li>
        </ul>
    </div>
</template>
