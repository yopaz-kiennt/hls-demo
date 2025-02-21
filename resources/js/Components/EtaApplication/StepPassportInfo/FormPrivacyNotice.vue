<script setup>
import FormInputCheckbox from '@/Components/ui/checkbox/FormInputCheckbox.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import LabelRequired from '@/Components/ui/label/LabelRequired.vue';
import ScrollArea from '@/Components/ui/scroll-area/ScrollArea.vue';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';

const etaApplicationStore = useEtaApplicationStore();

const { formData } = storeToRefs(etaApplicationStore);

const { messages } = usePage().props;
</script>

<template>
    <h2 class="leading-form">
        <div class="dot"></div>
        <span>{{ messages.privacy_notice }}</span>
    </h2>
    <!-- Privacy notice -->

    <h3 class="mb-[10px] text-[1.17em] font-bold">{{ messages.privacy_policy }}</h3>

    <ScrollArea class="policy mb-[30px] max-h-[200px] overflow-auto border border-[#ccc] p-3">
        <ul class="policy_list">
            <li class="policy_item">
                <p class="policy_text mb-[24px] text-[14px]">
                    株式会社はじまりビジネスパートナーズ（以下、「当社」という。）は、経営戦略の立案からその実践、研修・セミナーなど経営コンサルティング事業を行っており、事業者様の従業者様情報・お預かりするお客様情報、お取引先関係者、および当社の従業者・家族の個人情報保護が重大な責務であると認識しております。そこで個人情報保護理念と自ら定めた行動規範に基づき、社会的使命を十分に認識し、本人の権利の保護、個人情報に関する法規制等を遵守致します。<br /><span
                        class="mb-[24px]"
                    ></span
                    >また、以下に示す方針を具現化するための個人情報保護マネジメントシステムを構築し、最新のＩＴ技術の動向、社会的要請の変化、経営環境の変動等を常に認識しながら、その継続的改善に、全社を挙げて取り組むことをここに宣言致します。<br /><span
                        class="mb-[24px]"
                    ></span
                    >当社は、適切な個人情報の取得・利用及び提供を行い、特定された利用目的の達成に必要な範囲を超えた個人情報の取扱いを行ないません。また、そのための措置を講じます。<br />当社は個人情報の取扱いに関する法令、国が定める指針その他の規範を遵守致します。<br />当社は個人情報の漏えい、滅失、き損などのリスクに対しては、合理的な安全対策を講じて防止すべく、事業の実情に合致した経営資源を注入し、個人情報のセキュリティ体制を継続的に向上させていきます。また、万一の際には速やかに是正措置を講じます。<br />当社は個人情報取扱いに関する苦情及び相談に対しては、迅速かつ誠実に対応致します。<br />個人情報保護マネジメントシステムは、当社を取り巻く環境の変化と実情を踏まえ、適時・適切に見直して継続的に改善をはかります。
                </p>
            </li>
            <li class="policy_item">
                <h2 class="policy_ttlArea">
                    <span class="policy_ttl font-bold">個人情報の利用目的の公表</span>
                </h2>
                <p class="policy_text mb-[24px] text-[14px]">
                    株式会社はじまりビジネスパートナーズ（以下、「当社」という。）は、個人情報を次の利用目的の範囲内で利用することを、個人情報の保護に関する法律（個人情報保護法）第18条第１項に基づき公表します。
                </p>
                <p class="policy_text mb-[8px] font-bold">個人情報の利用目的</p>
                <ul>
                    <li class="policy_text mb-[24px] text-[14px]">
                        （１）ご本人より直接書面等（ホームページや電子メール等によるものを含む。以下「書面」という）に記載された個人情報を取得する場合の利用目的。<br />お客様の個人情報は、経営コンサルティング業務における資料の送付、業務連絡、セミナーの受講者管理、関連するアフターサービス、新商品や新たなサービスのご案内（同意をいただいた抱いた場合は電子メールを含む）ため<br />当社の各事業に関するお問い合わせの方の個人情報は、お問い合わせにお答えするため<br />当社の株主さまへの個人情報は、連絡、各種情報等の提供および株主管理及び関連・付帯する業務のため<br />当社従業者の個人情報は、人事労務管理、業務管理、健康管理、セキュリティ管理等のため<br />当社従業者およびその扶養配偶者の個人番号は、法律で特定された利用目的のため<br />当社への直接応募者情報は、採用業務のため
                    </li>
                    <li class="policy_text text-[14px]">
                        （２）ご本人より直接書面以外の方法で個人情報を取得する際の利用目的<br />当社が受託するマーケティング分析業務およびその他調査業務を実施のため<br />協力会社の要員情報は、スキルの確認のため、委託元に提供するため<br />ハローワークや民間就職斡旋サイトからの応募者情報は、採用業務のため
                    </li>
                </ul>
            </li>
        </ul>
    </ScrollArea>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.inAggreance">
        <FormItem class="form-group" style="margin-top: 50px">
            <div>
                <FormControl>
                    <FormInputCheckbox
                        id="consentAndDeclaration.inAggreance"
                        v-model="formData.consentAndDeclaration.inAggreance"
                        value="true"
                        :label="messages.i_agree"
                        v-bind="componentField"
                        :class="{ 'checkbox-invalid': errors.length > 0 }"
                        :labelClasses="'hissu'"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="consentAndDeclaration.fullNameOfConsent">
        <FormItem class="form-group" style="margin-top: 50px">
            <LabelRequired :title="messages.signature_of_applicant" inputId="consentAndDeclaration.fullNameOfConsent" />
            <!-- Signature of applicant -->
            <div>
                <FormControl :class="{ 'input-invalid': errors.length > 0 }">
                    <Input
                        v-bind="componentField"
                        id="consentAndDeclaration.fullNameOfConsent"
                        v-model="formData.consentAndDeclaration.fullName"
                        type="text"
                        maxlength="160"
                    />
                </FormControl>
            </div>

            <FormMessage />
        </FormItem>
    </FormField>
</template>
