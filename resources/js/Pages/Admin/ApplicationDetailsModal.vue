<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { getTravelDocuments } from '@/helper';
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const { lang, messages } = usePage().props;

defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const travelDocuments = ref(getTravelDocuments(lang));

const prerequisiteCountryOfCitizenshipMapping = ref({
    97: 'JPN (Japan)',
});

const prerequisitePassportNotedNationalityMapping = ref({
    87: 'JPN (Japan)',
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

const doYouHaveOneOfTheseConditionsMapping = ref({
    0: '未治療の梅毒',
    1: '未治療の薬物・アルコール中毒',
    2: '未治療の精神病（妄想・幻覚を伴う精神障害)',
    3: '上記のいずれにも該当しない',
});

const representativeRelationshipMapping = ref({
    0: messages.a_family_member_or_friend,
    1: messages.a_member_of_a_non_governmental_or_religious_organization,
    2: messages.a_member_of_the_college_of_immigration_and_citizenship_consultants,
    3: messages.a_member_of_a_canadian_provincial_or_territorial_law_society,
    4: messages.a_member_of_the_chambre_des_notaires_du_quebec,
    5: messages.a_travel_agent,
});

const employmentDetailsOccupationMapping = ref({
    0: '芸術、文化、レクリエーション、スポーツ',
    1: '金融、管理',
    2: '教育、法律、社会福祉、地域・行政サービス',
    3: '保健医療',
    4: '主婦/主夫',
    5: '経営管理',
    6: '製造、公益事業（電気・ガス等）',
    7: '軍事、防衛',
    8: '自然、応用科学関連',
    9: '天然資源、農業および関連生産業',
    10: '引退後',
    11: '営業・販売、サービス',
    12: '学生',
    13: '技能（例：電気技師、配管工、大工）、交通、機械機器操作関連',
    14: '無職',
});
</script>

<template>
    <Dialog>
        <DialogTrigger
            class="mb-2 me-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
            詳細
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>eTA申請詳細</DialogTitle>
                <DialogDescription>
                    <div class="border-b py-2 text-black">
                        <b> 代理人情報 </b>

                        <p>
                            代理人か:
                            <span v-if="item.data.isRepresentative == 1"> はい </span>
                            <span v-else> いいえ </span>
                        </p>

                        <p v-if="item.data.isApplyingOnBehalfOfMinorChild">
                            未成年者の代理申請か:
                            <span v-if="item.data.isApplyingOnBehalfOfMinorChild == 1"> はい </span>
                        </p>
                    </div>

                    <div v-if="item.data.isRepresentative == 1" class="border-b py-2 text-black">
                        <b> 代理人の詳細 </b>
                        <p>
                            代理人との関係:
                            <span>
                                {{
                                    representativeRelationshipMapping[
                                        item.data.representative?.representativeRelationship
                                    ]
                                }}
                            </span>
                        </p>
                        <p>
                            報酬を受け取っているか:
                            <span v-if="item.data.representative.representativeCompensated == '1'"> はい </span>
                            <span v-else> いいえ </span>
                        </p>
                        <p v-if="item.data.representative.membershipIdNumber">
                            会員識別番号:
                            {{ item.data.representative.membershipIdNumber }}
                        </p>
                        <p v-if="item.data.representative.province">
                            州または地域:
                            {{ item.data.representative.province }}
                        </p>
                        <p>
                            名前:
                            {{ item.data.representative.firstName }}
                            {{ item.data.representative.lastName }}
                        </p>
                        <p v-if="item.data.representative.organizationName">
                            企業・組織の名称:
                            {{ item.data.representative.organizationName }}
                        </p>
                        <p>
                            郵便用住所:
                            {{ item.data.representative.mailingAddress }}
                        </p>
                        <p v-if="item.data.representative.postalCodeZip">
                            郵便番号:
                            {{ item.data.representative.postalCodeZip }}
                        </p>
                        <p>
                            電話番号:
                            {{ item.data.representative.phoneNumber }}
                        </p>
                        <p v-if="item.data.representative.faxNumber">
                            ファクス番号:
                            {{ item.data.representative.faxNumber }}
                        </p>
                        <p v-if="item.data.representative.emailAddress">
                            郵便番号:
                            {{ item.data.representative.emailAddress }}
                        </p>
                    </div>

                    <div class="border-b py-2 text-black">
                        <b> 旅行書類情報 </b>
                        <div class="flex">
                            <span class="mr-2">旅行書類情報:</span>
                            <p v-for="document in travelDocuments" :key="document.value">
                                <span v-if="item.data.prerequisite.travelDocumentType === document.value">
                                    {{ document.title }}
                                </span>
                            </p>
                        </div>
                        <p>
                            パスポートに記載されているコード:
                            <span>
                                {{
                                    prerequisiteCountryOfCitizenshipMapping[item.data.prerequisite.countryOfCitizenship]
                                }}
                            </span>
                        </p>
                        <p>
                            申請者パスポート情報:
                            <span>
                                {{
                                    prerequisitePassportNotedNationalityMapping[
                                        item.data.prerequisite.passportNotedNationality
                                    ]
                                }}
                            </span>
                        </p>
                    </div>

                    <div class="border-b py-2 text-black">
                        <b> 個人情報 </b>
                        <p>
                            パスポート番号:
                            <span>
                                {{ item.data.personalDetails.passportNumber }}
                            </span>
                        </p>
                        <p>
                            名前:
                            {{ item.data.personalDetails.firstName }}
                            <span v-if="item.data.personalDetails.lastName">
                                {{ item.data.personalDetails.lastName }}
                            </span>
                        </p>
                        <p>
                            <span>
                                誕生日: {{ item.data.personalDetails.dobYear }}-{{
                                    item.data.personalDetails.dobMonth
                                }}-{{ item.data.personalDetails.dobDay }}
                            </span>
                            <span class="px-4">
                                性別:
                                <span v-if="item.data.personalDetails.gender === '0'"> 女性 </span>
                                <span v-else-if="item.data.personalDetails.gender === '1'"> 男性 </span>
                                <span v-else-if="item.data.personalDetails.gender === '2'"> その他の性別 </span>
                            </span>
                        </p>
                        <p>
                            出生地: {{ item.data.personalDetails.countryOfBirth }}
                            {{ item.data.personalDetails.cityTownOfBirth }}
                        </p>
                        <p>
                            <span>
                                発行日: {{ item.data.personalDetails.issueDateYear }}-{{
                                    item.data.personalDetails.issueDateMonth
                                }}-{{ item.data.personalDetails.issueDateDay }}
                            </span>
                            <span class="px-4">
                                有効期限日: {{ item.data.personalDetails.expiryDateYear }}-{{
                                    item.data.personalDetails.expiryDateMonth
                                }}-{{ item.data.personalDetails.expiryDateDay }}
                            </span>
                        </p>
                        <p v-if="item.data.personalDetails.additionalCitizenship">
                            追加の市民権:
                            {{
                                personalDetailsAdditionalCitizenshipMapping[
                                    item.data.personalDetails.additionalCitizenship
                                ]
                            }}
                        </p>
                        <p v-if="item.data.personalDetails.maritalStatus">
                            婚姻状況:
                            {{ personalDetailsMaritalStatusMapping[item.data.personalDetails.maritalStatus] }}
                        </p>
                        <p>
                            以前にカナダへの申請歴があるか:
                            <span v-if="item.data.personalDetails.hasPreviouslyAppliedToCanada == '1'"> はい </span>
                            <span v-else> いいえ </span>
                        </p>
                        <p v-if="item.data.personalDetails.uci">UCI番号: {{ item.data.personalDetails.uci }}</p>
                    </div>

                    <div v-if="item.data.employmentDetails.occupation" class="border-b py-2 text-black">
                        <b> 職業に関する情報 </b>
                        <p>
                            職業:
                            {{ employmentDetailsOccupationMapping[item.data.employmentDetails.occupation] }}
                        </p>
                        <p v-if="item.data.employmentDetails.title">職責名:</p>
                        <p v-if="item.data.employmentDetails.companyEmployerSchoolFacilityName">
                            所属名:
                            {{ item.data.employmentDetails.companyEmployerSchoolFacilityNam }}
                        </p>
                        <p v-if="item.data.employmentDetails.country">
                            所在地: {{ item.data.employmentDetails.country }}
                            {{ item.data.employmentDetails.city }}
                        </p>
                        <p v-if="item.data.employmentDetails.fromDateYear">
                            就業・就学開始年: {{ item.data.employmentDetails.fromDateYear }}
                        </p>
                    </div>

                    <div class="border-b py-2 text-black">
                        <b> 連絡先情報 </b>
                        <p>メールアドレス: {{ item.data.contactDetails.emailAddress }}</p>
                        <p>
                            住所:
                            <span v-if="item.data.contactDetails.aptUnit">
                                {{ item.data.contactDetails.aptUnit }},
                            </span>
                            <span>
                                {{ item.data.contactDetails.streetNo }}
                            </span>
                            <span> , {{ item.data.contactDetails.streetAddress }} </span>
                            <span v-if="item.data.contactDetails.streetAddressAlt">
                                , {{ item.data.contactDetails.streetAddressAlt }}
                            </span>
                            <span>
                                {{ item.data.contactDetails.city }}
                            </span>
                            <span> , {{ item.data.contactDetails.country }} </span>
                            <span v-if="item.data.contactDetails.district">
                                , {{ item.data.contactDetails.district }}
                            </span>
                        </p>
                    </div>

                    <div v-if="item.data.travelDetails.isTravelDateKnown == '1'" class="border-b py-2 text-black">
                        <b> 旅行詳細 </b>
                        <p>
                            旅行日: {{ item.data.travelDetails.travelDateYear }}-{{
                                item.data.travelDetails.travelDateMonth
                            }}-{{ item.data.travelDetails.travelDateDay }}
                        </p>
                        <p>
                            旅行時刻: {{ item.data.travelDetails.travelDateTimeHour }}-{{
                                item.data.travelDetails.travelDateTimeMinute
                            }}-{{ item.data.travelDetails.travelDateTimeTimezone }}
                        </p>
                    </div>

                    <div
                        v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada"
                        class="py-2 text-black"
                    >
                        <b> 申請者の背景に関する情報 </b>
                        <p>
                            カナダまたは他国で入国拒否歴がありますか？:
                            <span v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada == '0'">
                                はい
                            </span>
                            <span v-else> いいえ </span>
                        </p>
                        <p v-if="item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails">
                            各拒否について、ビザや入国を拒否された国の名前と理由:
                            {{ item.data.backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails }}
                        </p>
                        <p>
                            犯罪歴がありますか:
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
                        <p
                            v-if="
                                item.data.backgroundQuestions
                                    .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                            "
                        >
                            各逮捕、起訴、有罪判決について、場所、時期、犯罪内容、判決内容:
                            {{
                                item.data.backgroundQuestions
                                    .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails
                            }}
                        </p>
                        <p>
                            過去2年間に、結核と診断されたり、結核患者と接触したことがありますか:
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
                        <p
                            v-if="
                                item.data.backgroundQuestions
                                    .isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker
                            "
                        >
                            結核に接した理由は、医療従事者として働いていたからですか:
                            {{
                                item.data.backgroundQuestions
                                    .isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker
                            }}
                        </p>
                        <p>
                            他の健康問題:
                            {{
                                doYouHaveOneOfTheseConditionsMapping[
                                    item.data.backgroundQuestions.doYouHaveOneOfTheseConditions
                                ]
                            }}
                        </p>
                        <p
                            v-if="
                                item.data.backgroundQuestions
                                    .haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails
                            "
                        >
                            申請に関する追加の詳細:
                            {{
                                item.data.backgroundQuestions
                                    .haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails
                            }}
                        </p>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
