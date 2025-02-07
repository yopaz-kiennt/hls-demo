<script setup>
import { ref } from 'vue';

defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});

const doYouHaveOneOfTheseConditionsMapping = ref({
    0: '未治療の梅毒',
    1: '未治療の薬物・アルコール中毒',
    2: '未治療の精神病（妄想・幻覚を伴う精神障害)',
    3: '上記のいずれにも該当しない',
});
</script>

<template>
    <div>
        <h2 class="title">申請者の背景に関する情報</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title top-0">カナダまたは他国で入国拒否歴がありますか？</b>
                <p class="item__content">
                    <span v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada == '0'">
                        はい
                    </span>
                    <span v-else> いいえ </span>
                </p>
            </li>

            <li v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails" class="item">
                <b class="item__title top-0">各拒否について、ビザや入国を拒否された国の名前と理由</b>
                <p class="item__content">
                    {{ item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails }}
                </p>
            </li>

            <li class="item">
                <b class="item__title">犯罪歴がありますか</b>
                <p class="item__content">
                    <span
                        v-if="
                            item.data.backgroundQuestions
                                .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere == '0'
                        "
                    >
                        はい
                    </span>
                    <span v-else> いいえ </span>
                </p>
            </li>

            <li
                v-if="
                    item.data.backgroundQuestions
                        .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                "
                class="item"
            >
                <b class="item__title top-0"> 各逮捕、起訴、有罪判決について、場所、時期、犯罪内容、判決内容 </b>
                <p class="item__content">
                    {{
                        item.data.backgroundQuestions
                            .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                    }}
                </p>
            </li>

            <li class="item">
                <b class="item__title top-0"> 過去2年間に、結核と診断されたり、結核患者と接触したことがありますか </b>
                <p class="item__content">
                    <span
                        v-if="
                            item.data.backgroundQuestions
                                .inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis == '0'
                        "
                    >
                        はい
                    </span>
                    <span v-else> いいえ </span>
                </p>
            </li>

            <li
                v-if="item.data.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker"
                class="item"
            >
                <b class="item__title top-0">結核に接した理由は、医療従事者として働いていたからですか</b>
                <p class="item__content">
                    <span
                        v-if="
                            item.data.backgroundQuestions
                                .isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker == '0'
                        "
                    >
                        はい
                    </span>
                    <span v-else> いいえ </span>
                </p>
            </li>

            <li class="item">
                <b class="item__title">他の健康問題</b>
                <p class="item__content">
                    {{
                        doYouHaveOneOfTheseConditionsMapping[
                            item.data.backgroundQuestions.doYouHaveOneOfTheseConditions
                        ]
                    }}
                </p>
            </li>

            <li
                v-if="item.data.backgroundQuestions.haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails"
                class="item"
            >
                <b class="item__title top-0">申請に関する追加の詳細</b>
                <p class="item__content">
                    {{ item.data.backgroundQuestions.haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails }}
                </p>
            </li>
        </ul>
    </div>
</template>
