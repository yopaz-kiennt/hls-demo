<script setup>
import ModalDetails from '@/Components/EtaManagement/ModalDetails.vue';
import { Button } from '@/Components/ui/button';
import Datepicker from '@/Components/ui/datepicker/Datepicker.vue';
import IconReset from '@/Components/ui/icons/IconReset.vue';
import IconSearch from '@/Components/ui/icons/IconSearch.vue';
import { Input } from '@/Components/ui/input';
import Loading from '@/Components/ui/loading/Loading.vue';
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import VuePagination from '@/Components/VuePagination.vue';
import { applicationStatus, paymentStatus } from '@/helper';
import AdminLayout2 from '@/Layouts/AdminLayout2.vue';
import { buildUrlParams, formatDate } from '@/lib/utils';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head, router, usePage } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { lang, messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();
etaApplicationStore.setMessages(messages);
const { isOpenModalDetails, selectedItem, loading } = storeToRefs(etaApplicationStore);

const props = defineProps({
    applications: {
        type: Object,
        required: true,
    },
    filters: {
        type: Object,
        required: true,
    },
    occupations: {
        type: Object,
        default: () => {},
    },
    paymentStatusMap: {
        type: Object,
        required: true,
    },
});

const openModalDetails = (item) => {
    etaApplicationStore.setSelectedItem(item);
    etaApplicationStore.setOpenModalDetails(true);
};

const closeModalDetails = () => {
    etaApplicationStore.setSelectedItem(null);
    etaApplicationStore.setOpenModalDetails(false);
};

const formSearch = ref({
    email: props.filters.email || '',
    date: props.filters.date || '',
    paymentStatus: props.filters.paymentStatus || '',
    status: props.filters.status || '',
});

const search = () => {
    loading.value = true;
    etaApplicationStore.setLoading(true);
    router.get(`/admin/eta-management?${buildUrlParams({ ...formSearch.value })}`);

    setTimeout(() => {
        etaApplicationStore.setLoading(false);
    }, 300);
};

const reset = () => {
    formSearch.value = {
        email: '',
        date: '',
        paymentStatus: '',
        status: '',
    };

    etaApplicationStore.setLoading(true);
    router.get('/admin/eta-management');

    setTimeout(() => {
        etaApplicationStore.setLoading(false);
    }, 300);
};

const loadPage = (page) => {
    router.get(`/admin/eta-management?${buildUrlParams({ ...formSearch.value, page })}`);
};

const getStatusText = (status) => {
    const translations = {
        pending: lang === 'en' ? 'Pending' : '登録待ち',
        processing: lang === 'en' ? 'Processing' : '処理中',
        success: lang === 'en' ? 'Success' : '登録完了',
        error: lang === 'en' ? 'Error' : '申請失敗',
    };
    return translations[status] || '-';
};
</script>

<template>
    <Head title="eTA申請一覧" />

    <AdminLayout2>
        <ScrollArea class="table-container mb-[30px]">
            <table class="table-hover table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th class="w-[250px]">{{ messages.registered_email }}</th>
                        <th class="w-[200px]">{{ messages.register_date }}</th>
                        <th class="min-w-[140px]">{{ messages.payment_status }}</th>
                        <th class="min-w-[140px]">{{ messages.register_status }}</th>
                        <th class="min-w-[100px] max-w-[200px]">{{ messages.screenshots }}</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="min-w-[86px] max-w-[86px]">
                            <Input
                                v-model="formSearch.id"
                                type="text"
                                :placeholder="'IDを入力'"
                                @keyup.enter="search"
                            />
                        </td>
                        <td>
                            <Input
                                v-model="formSearch.email"
                                type="email"
                                :placeholder="messages.enter_your_email_address"
                                @keyup.enter="search"
                            />
                        </td>
                        <td>
                            <Datepicker v-model="formSearch.date" classes="w-[100%] min-h-[40px]" />
                        </td>
                        <td>
                            <Select v-model="formSearch.paymentStatus">
                                <SelectTrigger>
                                    <SelectValue :placeholder="'支払い状況'" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="paid">支払い済み</SelectItem>
                                        <SelectItem value="unpaid">支払い待ち</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="formSearch.status">
                                <SelectTrigger>
                                    <SelectValue :placeholder="'登録状況'" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem :value="applicationStatus.success">
                                            {{ lang == 'en' ? 'Success' : '申請成功' }}
                                        </SelectItem>
                                        <SelectItem :value="applicationStatus.pending">
                                            {{ lang == 'en' ? 'Pending' : '通過待ち' }}
                                        </SelectItem>
                                        <SelectItem :value="applicationStatus.error">
                                            {{ lang == 'en' ? 'Error' : '申請失敗' }}
                                        </SelectItem>
                                        <SelectItem :value="applicationStatus.processing">
                                            {{ lang == 'en' ? 'Processing' : '処理中' }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <!-- <td></td> -->
                        <td>
                            <div class="flex h-full justify-center gap-1">
                                <button class="p-2 hover:text-blue-500" @click="search">
                                    <IconSearch />
                                </button>
                                <button class="p-2" @click="reset">
                                    <IconReset />
                                </button>
                            </div>
                        </td>
                    </tr>
                </thead>

                <tbody>
                    <template v-if="!applications.data.length">
                        <tr>
                            <td colspan="8" class="text-center">データがありません。</td>
                        </tr>
                    </template>

                    <tr v-for="item in applications.data" v-else :key="item.id" class="border-b">
                        <td>
                            {{ item.id }}
                        </td>
                        <td>
                            {{ item.data.contactDetails.emailAddress }}
                        </td>
                        <td>
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td>
                            {{ paymentStatusMap[item.payment_status] }}
                        </td>
                        <td>
                            {{ getStatusText(item.status) }}
                        </td>
                        <!-- <td>
                            <Screenshots v-if="item.screenshots" :screenshots="item.screenshots" />
                        </td> -->
                        <td style="padding-right: 0">
                            <!-- <div class="flex justify-end"> -->
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="mr-[9px] rounded-[5px] border border-[#000000]"
                                @click="openModalDetails(item)"
                            >
                                <span>{{ messages.detail }}</span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="rounded-[5px] bg-[#549B2A] px-[28px] py-[15px] font-normal text-white hover:bg-[#4d8f28] hover:text-white"
                                :disabled="loading || item.payment_status !== paymentStatus.paid"
                                @click="etaApplicationStore.resendEmail(item.id)"
                            >
                                <span>{{ messages.resend_email }}</span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="rounded-[5px] bg-[#549B2A] px-[28px] py-[15px] font-normal text-white hover:bg-[#4d8f28] hover:text-white"
                                :disabled="
                                    !(
                                        item.payment_status === paymentStatus.paid &&
                                        item.status !== applicationStatus.success &&
                                        item.status !== applicationStatus.processing
                                    ) || loading
                                "
                                @click="etaApplicationStore.updateStatus(item, applicationStatus.processing)"
                            >
                                <a
                                    :href="'http://localhost:3003/applications/' + item.id + '/apply-to-canada'"
                                    target="_blank"
                                    >Apply to Canada</a
                                >
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="rounded-[5px] bg-[#549B2A] px-[28px] py-[15px] font-normal text-white hover:bg-[#4d8f28] hover:text-white"
                                :disabled="
                                    !(
                                        item.payment_status === paymentStatus.paid &&
                                        item.status === applicationStatus.processing
                                    ) || loading
                                "
                                @click="etaApplicationStore.updateStatus(item, applicationStatus.success)"
                            >
                                <span>Update application status to success</span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="rounded-[5px] bg-[#549B2A] px-[28px] py-[15px] font-normal text-white hover:bg-[#4d8f28] hover:text-white"
                                :disabled="
                                    !(
                                        item.payment_status === paymentStatus.paid &&
                                        item.status === applicationStatus.processing
                                    ) || loading
                                "
                                @click="etaApplicationStore.updateStatus(item, applicationStatus.error)"
                            >
                                <span>Update application status to error</span>
                            </Button>
                            <!-- </div> -->
                        </td>
                    </tr>
                </tbody>
            </table>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <template v-if="applications.data.length > 0">
            <VuePagination
                :total-page="applications?.total"
                :current-page="applications?.current_page"
                :last-page="applications?.last_page"
                @click="loadPage"
            />
        </template>

        <ModalDetails
            v-if="selectedItem"
            :item="selectedItem"
            :isOpen="isOpenModalDetails"
            :occupations="occupations"
            @close="closeModalDetails"
        />

        <div v-if="loading" class="loading-overlay">
            <Loading />
        </div>
    </AdminLayout2>
</template>
