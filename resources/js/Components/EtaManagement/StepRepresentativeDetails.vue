<script setup>
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});

const { messages } = usePage().props;

const representativeRelationshipMapping = ref({
    0: messages.a_family_member_or_friend,
    1: messages.a_member_of_a_non_governmental_or_religious_organization,
    2: messages.a_member_of_the_college_of_immigration_and_citizenship_consultants,
    3: messages.a_member_of_a_canadian_provincial_or_territorial_law_society,
    4: messages.a_member_of_the_chambre_des_notaires_du_quebec,
    5: messages.a_travel_agent,
});
</script>

<template>
    <div>
        <h2 class="title">代理人の詳細</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">代理人との関係</b>
                <p class="item__content">
                    {{ representativeRelationshipMapping[item.data.representative?.representativeRelationship] }}
                </p>
            </li>

            <li class="item">
                <b class="item__title top-0">報酬を受け取っているか</b>
                <p class="item__content">
                    <span v-if="item.data.representative.representativeCompensated == '1'">はい</span>
                    <span v-else>いいえ</span>
                </p>
            </li>

            <li v-if="item.data.representative.membershipIdNumber" class="item">
                <b class="item__title top-0">会員識別番号</b>
                <p class="item__content">{{ item.data.representative.membershipIdNumber }}</p>
            </li>

            <li v-if="item.data.representative.province" class="item">
                <b class="item__title top-0">州または地域</b>
                <p class="item__content">{{ item.data.representative.province }}</p>
            </li>

            <li class="item">
                <b class="item__title top-0">名前</b>
                <p class="item__content">
                    {{ item.data.representative.firstName }}
                    {{ item.data.representative.lastName }}
                </p>
            </li>

            <li v-if="item.data.representative.organizationName" class="item">
                <b class="item__title top-0">企業・組織の名称</b>
                <p class="item__content">{{ item.data.representative.organizationName }}</p>
            </li>

            <li class="item">
                <b class="item__title top-0">郵便用住所</b>
                <span class="item__content">{{ item.data.representative.mailingAddress }}</span>
            </li>

            <li v-if="item.data.representative.postalCodeZip" class="item">
                <b class="item__title top-0">郵便番号</b>
                <span class="item__content">{{ item.data.representative.postalCodeZip }}</span>
            </li>

            <li class="item">
                <b class="item__title top-0">電話番号</b>
                <span class="item__content">{{ item.data.representative.phoneNumber }}</span>
            </li>

            <li class="item">
                <b class="item__title top-0">ファクス番号</b>
                <span class="item__content">{{ item.data.representative.faxNumber || '-' }}</span>
            </li>

            <li class="item">
                <b class="item__title top-0">郵便番号</b>
                <span class="item__content">{{ item.data.representative.emailAddress || '-' }}</span>
            </li>
        </ul>
    </div>
</template>
