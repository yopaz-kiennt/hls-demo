<script setup>
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const { lang } = usePage().props;

const props = defineProps({
    item: {
        type: Object,
        default: () => {},
    },
    occupations: {
        type: Object,
        default: () => {},
    },
});

const employmentDetailsOccupation = ref(null);
const employmentDetailsJobTitle = ref(null);

if (props.occupations && Array.isArray(props.occupations) && props.item.data.employmentDetails.occupation) {
    const occupation = props.occupations.find((item) => item.id == props.item.data.employmentDetails.occupation);
    employmentDetailsOccupation.value = lang === 'en' ? occupation.title_en : occupation.title_jp;

    if (occupation) {
        const jobTitle = occupation.job_titles.find((item) => item.id == props.item.data.employmentDetails.title);
        employmentDetailsJobTitle.value = jobTitle ? (lang === 'en' ? jobTitle.title_en : jobTitle.title_jp) : '-';
    }
}
</script>

<template>
    <div v-if="item.data.employmentDetails.occupation">
        <h2 class="title">職業に関する情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">職業</b>
                <p class="item__content">{{ employmentDetailsOccupation }}</p>
            </li>

            <li v-if="item.data.employmentDetails.title" class="item">
                <b class="item__title">職責名</b>
                <p class="item__content">{{ employmentDetailsJobTitle }}</p>
            </li>

            <li v-if="item.data.employmentDetails.companyEmployerSchoolFacilityName" class="item">
                <b class="item__title">所属名</b>
                <p class="item__content">{{ item.data.employmentDetails.companyEmployerSchoolFacilityName }}</p>
            </li>

            <li v-if="item.data.employmentDetails.city" class="item">
                <b class="item__title">市町村</b>
                <p class="item__content">{{ item.data.employmentDetails.city }}</p>
            </li>

            <li v-if="item.data.employmentDetails.fromDateYear" class="item">
                <b class="item__title">就業・就学開始年</b>
                <p class="item__content">{{ item.data.employmentDetails.fromDateYear }}</p>
            </li>
        </ul>
    </div>
</template>
