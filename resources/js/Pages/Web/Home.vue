<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <AuthenticatedLayout>
        <Head title="CANADA eTA" />

        <div class="mv">
            <p class="mv_bg is-desktop"><img src="images/main.png" alt="" /></p>
            <p class="mv_bg is-mobile"><img src="images/main_sp.png" alt="" /></p>
            <div class="mv_textWrap">
                <div class="mv_textArea">
                    <div class="mv_attention">
                        <p class="mv_attentionTtl">至急の方<br class="is-mobile" />必見</p>
                        <ul class="mv_attentionList">
                            <li class="mv_attentionItem mv_attentionItem--left">観光</li>
                            <li class="mv_attentionItem mv_attentionItem--right">ビジネス向け</li>
                            <li class="mv_attentionItem mv_attentionItem--left">ご親族訪問</li>
                            <li class="mv_attentionItem mv_attentionItem--right">フライト乗り継ぎ</li>
                        </ul>
                    </div>
                    <p class="mv_subCopy">eTA application facilitator　／　Facilitateur de demande d’eTA</p>
                    <h1 class="mv_copy">
                        <span class="mv_copy--lg"><span class="red">カナダ</span>eTA 渡航認証</span
                        ><span class="red"><br />オンライン申請サポート</span>
                    </h1>
                    <p class="mv_auxiliary red">※Electronic Travel Authorization (eTA)：カナダの電子渡航認証制度</p>
                    <ul class="mv_feature">
                        <li class="mv_featureItem">完全<br />日本語対応</li>
                        <li class="mv_featureItem">オンライン<br />決済対応</li>
                    </ul>
                    <p class="mv_price"><img src="images/icon.png" alt="" /></p>
                </div>
            </div>
        </div>
        <section class="info">
            <p class="info_bg"><img src="images/service.png" alt="" /></p>
            <div class="info_cont">
                <h2 class="info_ttl red">
                    当サイトの申請システムは<br class="is-mobile" />完全日本語化！<br />わかりやすいので<br
                        class="is-mobile"
                    />スムーズな入力が可能です。
                </h2>
                <div class="info_recommend">
                    <h3 class="info_recommendTtl green">こんな方におすすめ</h3>
                    <ul class="info_recommendList">
                        <li class="info_recommendItem">
                            公式サイトが<span class="underLine">日本語化していなくて難しい</span>
                        </li>
                        <li class="info_recommendItem">
                            急いでいるから<span class="underLine">申請に手間取りたくない</span>
                        </li>
                        <li class="info_recommendItem">
                            <span class="underLine">理解不足のまま英語で申請して、不受理になりたくない</span>
                        </li>
                    </ul>
                </div>
                <div class="info_flow">
                    <h3 class="info_flowTtl green">申請の流れ</h3>
                    <ul class="info_flowList">
                        <li class="info_flowItem info_flowItem--first green">
                            ①必要情報を<br class="is-desktop" />ご入力ください
                        </li>
                        <li class="info_flowItem info_flowItem--second green">
                            ②請求代金を<br class="is-desktop" />お支払いください
                        </li>
                        <li class="info_flowItem info_flowItem--three green">
                            ③申請代行<br class="is-desktop" />いたします
                        </li>
                        <li class="info_flowItem info_flowItem--four green">
                            ④審査後、結果が通知されます<br /><span class="info_flowItem--sm">
                                書類不備などあれば再審査
                            </span>
                        </li>
                        <li class="info_flowItem info_flowItem--five green">
                            ⑤申請完了後、登録証が<br class="is-desktop" />メールで届きます。
                        </li>
                        <li class="info_flowItem info_flowItem--six info_flowItem--green">カナダへ出発</li>
                    </ul>
                    <p class="info_flowAttention red">
                        当サイトは申請時に申請費カナダ政府への公式申請料（CAN$7.00、2024年12月現在）以外に<span
                            class="underLine"
                        >
                            代行サポート料をお支払いいただきます。
                        </span>
                    </p>
                </div>
                <p class="info_message blue is-mobile mb8">Have a pleasant stay in Canada!</p>
                <p class="info_message blue is-mobile">Bon séjour au Canada !</p>
                <p class="info_message blue is-desktop">Have a pleasant stay in Canada! / Bon séjour au Canada !</p>
            </div>
        </section>

        <section class="faq">
            <p class="faq_bg"><img src="images/QA.png" alt="" /></p>
            <ul class="faq_list">
                <li class="faq_item faq_item--first">
                    <h3 class="faq_ttl">カナダeTAとは</h3>
                    <p class="faq_text">
                        カナダeTA（Electronic Travel
                        Authorization、電子渡航認証）は、カナダに空路で渡航する際に必要な電子的な渡航許可システムです。2016年3月15日に導入され、日本を含むビザ免除国の市民がカナダに短期滞在（通常6か月以下）する場合に利用します。
                    </p>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">いつまでに取得すればいい？</h3>
                    <p class="faq_text">
                        渡航直前の申請も可能ですが、カナダ政府からは、渡航計画を立て始めた早い段階での申請を勧めています。出発前にオンライン申請をしてeTA認証を受けましょう。
                    </p>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">カナダeTAが必要な人は？</h3>
                    <ul class="faq_subList">
                        <li class="faq_text">・観光、ビジネス、家族訪問など短期滞在の目的で空路でカナダに入国する人</li>
                        <li class="faq_text">
                            ・カナダの空港で乗り継ぎされる方（日本と米国／メキシコ／中南米等との間の移動で）
                        </li>
                        <li class="faq_text">・日本を含むビザ免除国の市民が対象</li>
                    </ul>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">カナダeTAが不要な人は？</h3>
                    <ul class="faq_subList">
                        <li class="faq_text">・陸路または海路でカナダに入国する人</li>
                        <li class="faq_text">・カナダのビザを所持している人</li>
                        <li class="faq_text">・カナダ市民、アメリカの市民権、または永住権を保有している人</li>
                    </ul>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">承認期間は何日かかる？</h3>
                    <p class="faq_text">
                        通常は数分から数時間以内に承認されますが、場合によっては追加書類が必要で、数日かかることもあります。余裕を持って申請しましょう。
                    </p>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">eTA申請に必要なものは？</h3>
                    <p class="faq_text">
                        パスポート、クレジットカードとEメールアドレスが必要です。<br />※パスポートの旅券必要残存期間は現地出国予定日＋１日以上となります。
                    </p>
                </li>
                <li class="faq_item">
                    <h3 class="faq_ttl">申請費用はいくら？</h3>
                    <ul class="faq_subList">
                        <li class="faq_text">・カナダ政府への公式申請料CAN$7.00（2024年12月現在）</li>
                    </ul>
                    <p class="faq_text">
                        <span class="red">※申請サポート料として別途3,400円の手数料を頂いております</span>
                    </p>
                </li>
            </ul>
        </section>

        <section class="cta">
            <p class="cta_bg"><img src="images/form.png" alt="" /></p>
            <div class="cta_cont">
                <h2 class="cta_ttl"><span class="red">カナダ</span>eTA<br class="is-mobile" />渡航認証</h2>
                <p class="cta_text red">
                    空路でのカナダ入国には<br class="is-mobile" />事前にeTA認証を申請をしてください
                </p>
                <a :href="route('eta_application.index')" class="cta_btn">eTA登録申請はこちら</a>
                <p class="cta_attention red">
                    ※eTA公式申請料金、及び、申請サポート料の支払後のキャンセル、返金はありません。
                </p>
                <p class="cta_attention red">
                    ※eTA発給の可否は、あくまでも申請者の個人情報とカナダ入国当局の判断によります。
                </p>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
