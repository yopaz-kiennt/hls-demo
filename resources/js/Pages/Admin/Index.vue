<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/Components/ui/pagination';
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { format } from 'date-fns';
import { computed } from 'vue';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd');
};

const props = defineProps({
    applications: {
        type: Object,
        required: true,
    },
});

const loadPage = (page) => {
    const url = props.applications.path + '?page=' + page;
    router.get(url);
};

// const updateStatus = (item, newStatus) => {
//   Inertia.put(`/applications/${item.id}`, {
//     status: newStatus,
//   });
// };

const representativeRelationshipMapping = computed(() => ({
    0: '家族または友人です',
    1: '非政府団体または宗教団体に属する者です',
    2: '移民コンサルタント規制評議会（ICCRC）の会員です',
    3: 'カナダの州または準州の弁護士協会会員です',
    4: 'ケベック州公証人協会会員です',
    5: '旅行代理業者です',
}));

const prerequisiteTravelDocumentTypeMapping = computed(() => ({
    0: 'パスポート－一般/通常',
    1: 'パスポート－外交用',
    2: 'パスポート－公務用',
    3: 'パスポート－サービス',
    4: '緊急/臨時渡航文書',
    5: '難民渡航文書',
    6: '国民以外の個人に発給された外国人パスポート/渡航文書',
    7: '米国再入国許可証(I-327)',
    8: '米国難民渡航文書(I-571)',
}));

const prerequisiteCountryOfCitizenshipMapping = computed(() => ({
    97: 'JPN (Japan)',
}));

const prerequisitePassportNotedNationalityMapping = computed(() => ({
    87: 'JPN (Japan)',
}));

const personalDetailsAdditionalCitizenshipMapping = computed(() => ({
    105: 'JPN (Japan)',
}));

const personalDetailsMaritalStatusMapping = computed(() => ({
    0: '既婚',
    1: '法的別居',
    2: '離婚',
    3: '婚姻取消',
    4: '寡婦・寡夫',
    5: '事実婚',
    6: '独身／未婚',
}));

const employmentDetailsOccupationMapping = {
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
};

const doYouHaveOneOfTheseConditionsMapping = {
    0: '未治療の梅毒',
    1: '未治療の薬物・アルコール中毒',
    2: '未治療の精神病（妄想・幻覚を伴う精神障害)',
    3: '上記のいずれにも該当しない',
};
console.log(props.applications);
</script>

<template>
    <Head title="eTA申請一覧" />

    <AdminLayout>
        <ScrollArea class="table-container mb-[30px]">
            <table class="table-hover table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>登録メールアドレス</th>
                        <th>申請日</th>
                        <th>支払い状況</th>
                        <th>登録状況</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="px-6 py-4"></td>
                        <td class="px-6 py-4">
                            <input
                                id="search-mail"
                                type="text"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="メールアドレスを入力"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <input
                                id="search-date"
                                type="date"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <select
                                id="countries"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option selected>状態を選択</option>
                                <option value="0">支払い済み</option>
                                <option value="1">未払い</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            <select
                                id="countries"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option selected>状態を選択</option>
                                <option value="0">登録待ち</option>
                                <option value="1">登録完了</option>
                                <option value="2">失敗</option>
                                <option value="3">却下</option>
                            </select>
                        </td>
                        <td class="py-4">
                            <div class="flex h-full items-center justify-center gap-5">
                                <svg
                                    class="h-4 w-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    class="h-4 w-4"
                                    viewBox="0 0 256 256"
                                    xml:space="preserve"
                                >
                                    <defs></defs>
                                    <g
                                        style="
                                            stroke: none;
                                            stroke-width: 0;
                                            stroke-dasharray: none;
                                            stroke-linecap: butt;
                                            stroke-linejoin: miter;
                                            stroke-miterlimit: 10;
                                            fill: none;
                                            fill-rule: nonzero;
                                            opacity: 1;
                                        "
                                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                                    >
                                        <path
                                            d="M 81.521 31.109 c -0.86 -1.73 -2.959 -2.438 -4.692 -1.575 c -1.73 0.86 -2.436 2.961 -1.575 4.692 c 2.329 4.685 3.51 9.734 3.51 15.01 C 78.764 67.854 63.617 83 45 83 S 11.236 67.854 11.236 49.236 c 0 -16.222 11.501 -29.805 26.776 -33.033 l -3.129 4.739 c -1.065 1.613 -0.62 3.784 0.992 4.85 c 0.594 0.392 1.264 0.579 1.926 0.579 c 1.136 0 2.251 -0.553 2.924 -1.571 l 7.176 -10.87 c 0.001 -0.001 0.001 -0.002 0.002 -0.003 l 0.018 -0.027 c 0.063 -0.096 0.106 -0.199 0.159 -0.299 c 0.049 -0.093 0.108 -0.181 0.149 -0.279 c 0.087 -0.207 0.152 -0.419 0.197 -0.634 c 0.009 -0.041 0.008 -0.085 0.015 -0.126 c 0.031 -0.182 0.053 -0.364 0.055 -0.547 c 0 -0.014 0.004 -0.028 0.004 -0.042 c 0 -0.066 -0.016 -0.128 -0.019 -0.193 c -0.008 -0.145 -0.018 -0.288 -0.043 -0.431 c -0.018 -0.097 -0.045 -0.189 -0.071 -0.283 c -0.032 -0.118 -0.065 -0.236 -0.109 -0.35 c -0.037 -0.095 -0.081 -0.185 -0.125 -0.276 c -0.052 -0.107 -0.107 -0.211 -0.17 -0.313 c -0.054 -0.087 -0.114 -0.168 -0.175 -0.25 c -0.07 -0.093 -0.143 -0.183 -0.223 -0.27 c -0.074 -0.08 -0.153 -0.155 -0.234 -0.228 c -0.047 -0.042 -0.085 -0.092 -0.135 -0.132 L 36.679 0.775 c -1.503 -1.213 -3.708 -0.977 -4.921 0.53 c -1.213 1.505 -0.976 3.709 0.53 4.921 l 3.972 3.2 C 17.97 13.438 4.236 29.759 4.236 49.236 C 4.236 71.714 22.522 90 45 90 s 40.764 -18.286 40.764 -40.764 C 85.764 42.87 84.337 36.772 81.521 31.109 z"
                                            style="
                                                stroke: none;
                                                stroke-width: 1;
                                                stroke-dasharray: none;
                                                stroke-linecap: butt;
                                                stroke-linejoin: miter;
                                                stroke-miterlimit: 10;
                                                fill: rgb(0, 0, 0);
                                                fill-rule: nonzero;
                                                opacity: 1;
                                            "
                                            transform="matrix(1 0 0 1 0 0)"
                                            stroke-linecap="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </td>
                        <td class="py-4"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in applications.data" :key="item.id" class="border-b">
                        <td class="px-6 py-4">
                            {{ item.id }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.data.contactDetails.emailAddress }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="px-6 py-4">Trạng thái thanh toán</td>
                        <td class="px-6 py-4">
                            <select
                                v-model="item.status"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                @change="updateStatus(item, item.status)"
                            >
                                <option value="pending" selected>登録待ち</option>
                                <option value="active">登録完了</option>
                                <option value="inactive">失敗</option>
                            </select>
                        </td>
                        <td class="flex justify-center py-4">
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
                                                    <span v-if="item.data.isApplyingOnBehalfOfMinorChild == 1">
                                                        はい
                                                    </span>
                                                </p>
                                            </div>

                                            <div
                                                v-if="item.data.isRepresentative == 1"
                                                class="border-b py-2 text-black"
                                            >
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
                                                    <span
                                                        v-if="item.data.representative.representativeCompensated == '1'"
                                                    >
                                                        はい
                                                    </span>
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
                                                <p>
                                                    旅行書類情報:
                                                    <span>
                                                        {{
                                                            prerequisiteTravelDocumentTypeMapping[
                                                                item.data.prerequisite.travelDocumentType
                                                            ]
                                                        }}
                                                    </span>
                                                </p>
                                                <p>
                                                    パスポートに記載されているコード:
                                                    <span>
                                                        {{
                                                            prerequisiteCountryOfCitizenshipMapping[
                                                                item.data.prerequisite.countryOfCitizenship
                                                            ]
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
                                                        <span v-if="item.data.personalDetails.gender === '0'">
                                                            女性
                                                        </span>
                                                        <span v-else-if="item.data.personalDetails.gender === '1'">
                                                            男性
                                                        </span>
                                                        <span v-else-if="item.data.personalDetails.gender === '2'">
                                                            その他の性別
                                                        </span>
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
                                                    {{
                                                        personalDetailsMaritalStatusMapping[
                                                            item.data.personalDetails.maritalStatus
                                                        ]
                                                    }}
                                                </p>
                                                <p v-if="item.data.personalDetails.maritalStatus">
                                                    婚姻状況:
                                                    {{
                                                        personalDetailsMaritalStatusMapping[
                                                            item.data.personalDetails.maritalStatus
                                                        ]
                                                    }}
                                                </p>
                                                <p>
                                                    以前にカナダへの申請歴があるか:
                                                    <span
                                                        v-if="
                                                            item.data.personalDetails.hasPreviouslyAppliedToCanada ==
                                                            '1'
                                                        "
                                                    >
                                                        はい
                                                    </span>
                                                    <span v-else> いいえ </span>
                                                </p>
                                                <p v-if="item.data.personalDetails.uci">
                                                    UCI番号: {{ item.data.personalDetails.uci }}
                                                </p>
                                            </div>

                                            <div
                                                v-if="item.data.employmentDetails.occupation"
                                                class="border-b py-2 text-black"
                                            >
                                                <b> 職業に関する情報 </b>
                                                <p>
                                                    職業:
                                                    {{
                                                        employmentDetailsOccupationMapping[
                                                            item.data.employmentDetails.occupation
                                                        ]
                                                    }}
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

                                            <div
                                                v-if="item.data.travelDetails.isTravelDateKnown == '1'"
                                                class="border-b py-2 text-black"
                                            >
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
                                                v-if="item.data.travelDetails.isTravelDateKnown == '1'"
                                                class="border-b py-2 text-black"
                                            >
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
                                                v-if="
                                                    item.data.backgroundQuestions
                                                        .refusedVisaOrPermitOrDeniedEntryToCanada
                                                "
                                                class="py-2 text-black"
                                            >
                                                <b> 旅行詳細 </b>
                                                <p>
                                                    カナダまたは他国で入国拒否歴がありますか？:
                                                    <span
                                                        v-if="
                                                            item.data.backgroundQuestions
                                                                .refusedVisaOrPermitOrDeniedEntryToCanada == '0'
                                                        "
                                                    >
                                                        はい
                                                    </span>
                                                    <span v-else> いいえ </span>
                                                </p>
                                                <p
                                                    v-if="
                                                        item.data.backgroundQuestions
                                                            .refusedVisaOrPermitOrDeniedEntryToCanadaDetails
                                                    "
                                                >
                                                    各拒否について、ビザや入国を拒否された国の名前と理由:
                                                    {{
                                                        item.data.backgroundQuestions
                                                            .refusedVisaOrPermitOrDeniedEntryToCanadaDetails
                                                    }}
                                                </p>
                                                <p>
                                                    犯罪歴がありますか:
                                                    <span
                                                        v-if="
                                                            item.data.backgroundQuestions
                                                                .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere ==
                                                            '0'
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
                                                                .inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis ==
                                                            '0'
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
                        </td>
                        <td class="py-4">
                            <button
                                type="button"
                                class="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            >
                                メールを再送する
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Pagination
            v-slot="{ page }"
            :total="applications?.total"
            :sibling-count="1"
            :default-page="applications?.current_page"
            class="my-4"
        >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst @click="loadPage(1)" />
                <PaginationPrev @click="loadPage(applications?.current_page - 1)" />

                <template v-for="(item, index) in items">
                    <PaginationListItem
                        v-if="item.type === 'page'"
                        :key="index"
                        :value="item.value"
                        as-child
                        @click="loadPage(item.value)"
                    >
                        <button
                            class="h-10 w-10 rounded-md p-0"
                            :class="{ 'bg-black text-white': item.value === page }"
                        >
                            {{ item.value }}
                        </button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext @click="loadPage(applications?.current_page + 1)" />
                <PaginationLast @click="loadPage(applications?.total)" />
            </PaginationList>
        </Pagination>
    </AdminLayout>
</template>

<style scoped lang="scss">
.table-container {
    width: 100%;
    overflow: auto;

    table {
        width: 100%;

        &.table-hover {
            tr {
                &:hover {
                    background-color: #fff;
                }
            }
        }

        tr {
            border-bottom: 1px solid gainsboro;

            td,
            th {
                padding: 12px;
            }
        }

        thead {
            tr {
                th {
                    font-size: 13px;
                    text-align: left;
                    color: #71717a;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
