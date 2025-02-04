<script setup lang="ts">
import ButtonEtaApplication from '@/Components/EtaApplication/ButtonEtaApplication.vue';
import ButtonTop from '@/Components/EtaApplication/ButtonTop.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <AuthenticatedLayout>
        <Head title="CANADA eTA - Service" />

        <section class="fv">
            <h1 class="fv_ttl">弊社と本ホームページサービスについて</h1>
            <p class="fv_img"><img src="images/fv_service.png" alt="" /></p>
        </section>

        <section class="service">
            <ul class="service_list">
                <li class="service_item">
                    <h2 class="service_ttlArea">
                        <span class="service_num">1</span>
                        <span class="service_ttl">弊社について</span>
                    </h2>
                    <p class="service_text">
                        株式会社はじまりビジネスパートナーズは、埼玉県を本拠地とし、経営コンサルティング事業、リテール・ホールセール事業、クリエイティブ事業、ソリューション事業ならびにアグリカルチャー事業などを擁する企業です。詳しくは、弊社ホームページ(https://hajimari.co.jp/company)
                        を御覧ください。本ホームページにおける入国申請サポートサービスは、クリエイティブ事業に属します。
                    </p>
                </li>
                <li class="service_item">
                    <h2 class="service_ttlArea">
                        <span class="service_num">2</span>
                        <span class="service_ttl">本ホームページによるサービス提供の想い</span>
                    </h2>
                    <p class="service_text">
                        弊社は、日本の中小企業や、地方の経済の活性化には、様々な場面におけるインバウンド・アウトバウンドの増加が有益と考えています。インバウンド客は、日本の中小企業のサービス・商品との新たな出会いを創出します。弊社は、顧客企業に対する支援や、弊社による小売などで、これに応えます。<br /><span
                            class="mb24"
                        ></span
                        >他方、アウトバウンドは、訪問者に、国外での新たな気づきを与え、これが先々、日本でのサービス・商品開発に好影響をもたらします。ぜひ、英語・仏語を不得手とする方でも、気軽にカナダで観光あるいはビジネスをして頂き、カナダの魅力をエンジョイされ、そこで得た新たな感性で、日本の将来のマーケットを活性化するきっかけになっていただきたいと考えています。
                    </p>
                </li>
                <li class="service_item">
                    <h2 class="service_ttlArea">
                        <span class="service_num">3</span>
                        <span class="service_ttl">本ホームページサービスについて</span>
                    </h2>
                    <p class="service_text">
                        当サービスは、複雑かつリスクが伴う入国申請へのソリューションです。英語や仏語が不得手な方が頼らざるをえない申請サポートサービスは、一部、他社からも提供されていますが、処理日数を要したり、提供者の素性や料金が不透明であったりといった問題があります。<br />一方で、中途半端な理解で、英語や仏語で申請すると、自分の意に反した申請内容になりかねず、最悪の場合、不受理だけでなくブラックリストに載る可能性もあります。<br />このため当ホームページでは、（１）サービス提供者である弊社の素性や料金が明瞭であること、（２）日本語での説明の下で、申請者のデータを正確に入力して申請できること、を目指しました。
                    </p>
                </li>
            </ul>
        </section>

        <div class="pageNav">
            <ButtonTop />
            <ButtonEtaApplication />
        </div>
    </AuthenticatedLayout>
</template>
