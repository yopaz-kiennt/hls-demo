<script setup lang="ts">
import ButtonEtaApplication from '@/Components/EtaApplication/ButtonEtaApplication.vue';
import ButtonTop from '@/Components/EtaApplication/ButtonTop.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <AuthenticatedLayout>
        <Head title="CANADA eTA" />

        <section class="fv">
            <h1 class="fv_ttl">プライバシーポリシー</h1>
            <p class="fv_img"><img src="images/fv_policy.jpg" alt="" /></p>
        </section>

        <section class="policy">
            <ul class="policy_list">
                <li class="policy_item">
                    <h2 class="policy_ttlArea">
                        <span class="policy_ttl">個人情報保護方針</span>
                    </h2>
                    <p class="policy_text mb24">
                        株式会社はじまりビジネスパートナーズ（以下、「当社」という。）は、経営戦略の立案からその実践、研修・セミナーなど経営コンサルティング事業を行っており、事業者様の従業者様情報・お預かりするお客様情報、お取引先関係者、および当社の従業者・家族の個人情報保護が重大な責務であると認識しております。そこで個人情報保護理念と自ら定めた行動規範に基づき、社会的使命を十分に認識し、本人の権利の保護、個人情報に関する法規制等を遵守致します。<br /><span
                            class="mb24"
                        ></span
                        >また、以下に示す方針を具現化するための個人情報保護マネジメントシステムを構築し、最新のＩＴ技術の動向、社会的要請の変化、経営環境の変動等を常に認識しながら、その継続的改善に、全社を挙げて取り組むことをここに宣言致します。<br /><span
                            class="mb24"
                        ></span
                        >当社は、適切な個人情報の取得・利用及び提供を行い、特定された利用目的の達成に必要な範囲を超えた個人情報の取扱いを行ないません。また、そのための措置を講じます。<br />当社は個人情報の取扱いに関する法令、国が定める指針その他の規範を遵守致します。<br />当社は個人情報の漏えい、滅失、き損などのリスクに対しては、合理的な安全対策を講じて防止すべく、事業の実情に合致した経営資源を注入し、個人情報のセキュリティ体制を継続的に向上させていきます。また、万一の際には速やかに是正措置を講じます。<br />当社は個人情報取扱いに関する苦情及び相談に対しては、迅速かつ誠実に対応致します。<br />個人情報保護マネジメントシステムは、当社を取り巻く環境の変化と実情を踏まえ、適時・適切に見直して継続的に改善をはかります。
                    </p>
                    <p class="policy_text">制定日　2021年1月1日</p>
                    <p class="policy_text">最終改正日　2021年1月1日</p>
                    <p class="policy_text">株式会社はじまりビジネスパートナーズ</p>
                    <p class="policy_text">株式会社はじまりビジネスパートナーズ</p>
                    <p class="policy_text">代表取締役 白川 淳一</p>
                    <div class="policy_box">
                        <p class="policy_text policy_boxText mb8">
                            【個人情報保護方針に関するお問い合わせ先 兼 個人情報に関する苦情・相談窓口】
                        </p>
                        <p class="policy_text policy_boxText mb8">〒338-0001　埼玉県さいたま市中央区上落合2-3-2</p>
                        <p class="policy_text policy_boxText mb8">Mio新都心 個人情報保護管理者：代表取締役 白川 淳一</p>
                        <p class="policy_text policy_boxText">TEL：048-711-9292 (代)</p>
                    </div>
                </li>
                <li class="policy_item">
                    <h2 class="policy_ttlArea">
                        <span class="policy_ttl">個人情報の利用目的の公表</span>
                    </h2>
                    <p class="policy_text mb24">
                        株式会社はじまりビジネスパートナーズ（以下、「当社」という。）は、個人情報を次の利用目的の範囲内で利用することを、個人情報の保護に関する法律（個人情報保護法）第18条第１項に基づき公表します。
                    </p>
                    <p class="policy_text mb8">個人情報の利用目的</p>
                    <ul>
                        <li class="policy_text mb24">
                            （１）ご本人より直接書面等（ホームページや電子メール等によるものを含む。以下「書面」という）に記載された個人情報を取得する場合の利用目的。<br />お客様の個人情報は、経営コンサルティング業務における資料の送付、業務連絡、セミナーの受講者管理、関連するアフターサービス、新商品や新たなサービスのご案内（同意をいただいた抱いた場合は電子メールを含む）ため<br />当社の各事業に関するお問い合わせの方の個人情報は、お問い合わせにお答えするため<br />当社の株主さまへの個人情報は、連絡、各種情報等の提供および株主管理及び関連・付帯する業務のため<br />当社従業者の個人情報は、人事労務管理、業務管理、健康管理、セキュリティ管理等のため<br />当社従業者およびその扶養配偶者の個人番号は、法律で特定された利用目的のため<br />当社への直接応募者情報は、採用業務のため
                        </li>
                        <li class="policy_text">
                            （２）ご本人より直接書面以外の方法で個人情報を取得する際の利用目的<br />当社が受託するマーケティング分析業務およびその他調査業務を実施のため<br />協力会社の要員情報は、スキルの確認のため、委託元に提供するため<br />ハローワークや民間就職斡旋サイトからの応募者情報は、採用業務のため
                        </li>
                    </ul>
                </li>
            </ul>
        </section>

        <div class="mark">
            <p class="mark_img"><img src="images/privacy-mark.png" alt="" /></p>
            <p class="mark_text">
                「このマークは、（財）日本情報経済社会推進協会が運用する「プライバシーマーク制度」に基づいて、当社の個人情報の取扱いがJIS
                Q
                15001：2006「個人情報保護に関するコンプライアンス・プログラムの要求事項」に準拠して、適正に行われていることを認定した証として、その使用を許可されたものです。認定番号：第
                17004189(01) 号」
            </p>
        </div>

        <div class="pageNav">
            <ButtonTop />
            <ButtonEtaApplication />
        </div>
    </AuthenticatedLayout>
</template>
