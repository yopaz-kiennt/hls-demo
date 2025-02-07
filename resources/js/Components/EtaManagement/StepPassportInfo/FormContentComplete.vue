<script setup>
import { getTravelDocuments } from '@/helper';
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const { lang } = usePage().props;

defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});

const travelDocuments = ref(getTravelDocuments(lang));

const prerequisiteCountryOfCitizenshipMapping = ref({
    97: 'JPN (Japan)',
});

const prerequisitePassportNotedNationalityMapping = ref({
    87: 'JPN (Japan)',
});
</script>

<template>
    <div>
        <ul class="list-items has-border">
            <li v-if="item.data.prerequisite.travelDocumentType" class="item">
                <b class="item__title">旅行書類情報</b>

                <div class="item__content">
                    <p v-for="document in travelDocuments" :key="document.value">
                        <span v-if="item.data.prerequisite.travelDocumentType === document.value">
                            {{ document.title }}
                        </span>
                    </p>
                </div>
            </li>

            <li v-if="item.data.prerequisite.countryOfCitizenship" class="item">
                <b class="item__title top-0">パスポートに記載さ<br />れているコード</b>

                <p class="item__content">
                    {{ prerequisiteCountryOfCitizenshipMapping[item.data.prerequisite.countryOfCitizenship] }}
                </p>
            </li>

            <li v-if="item.data.prerequisite.passportNotedNationality" class="item">
                <b class="item__title">申請者パスポート情報</b>

                <p class="item__content">
                    {{ prerequisitePassportNotedNationalityMapping[item.data.prerequisite.passportNotedNationality] }}
                </p>
            </li>
        </ul>
    </div>
</template>
