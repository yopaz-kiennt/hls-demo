<script setup>
import ModalDetails from '@/Components/EtaManagement/ModalDetails.vue';
import Screenshots from '@/Components/EtaManagement/Screenshots.vue';
import { Button } from '@/Components/ui/button';
import Datepicker from '@/Components/ui/datepicker/Datepicker.vue';
import IconReset from '@/Components/ui/icons/IconReset.vue';
import IconSearch from '@/Components/ui/icons/IconSearch.vue';
import { Input } from '@/Components/ui/input';
import Loading from '@/Components/ui/loading/Loading.vue';
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import VuePagination from '@/Components/VuePagination.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { buildUrlParams, formatDate } from '@/lib/utils';
import { useEtaApplicationStore } from '@/stores/useEtaApplicationStore';
import { Head, router, usePage } from '@inertiajs/vue3';
import { Info, Send } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { lang, messages } = usePage().props;

const etaApplicationStore = useEtaApplicationStore();
const { isOpenModalDetails, selectedItem } = storeToRefs(etaApplicationStore);
const loading = ref(false);

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
    paymentStatus: props.filters.payment_status || '',
    status: props.filters.status || '',
});

const search = () => {
    loading.value = true;
    router.get(`/admin/eta-management?${buildUrlParams({ ...formSearch.value })}`);
};

const reset = () => {
    formSearch.value = {
        email: '',
        date: '',
        paymentStatus: '',
        status: '',
    };

    loading.value = true;
    router.get('/admin/eta-management');
};

const loadPage = (page) => {
    router.get(`/admin/eta-management?${buildUrlParams({ ...formSearch.value, page })}`);
};
</script>

<template>
    <Head title="eTA申請一覧" />

    <AdminLayout>
        <ScrollArea class="table-container mb-[30px]">
            <table class="table-hover table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th class="w-[250px]">{{ messages.registered_email }}</th>
                        <th class="w-[200px]">{{ messages.register_date }}</th>
                        <th class="min-w-[140px]">{{ messages.payment_status }}</th>
                        <th class="min-w-[140px]">{{ messages.register_status }}</th>
                        <th class="min-w-[140px]">{{ messages.screenshots }}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <Input
                                v-model="formSearch.email"
                                type="email"
                                :placeholder="messages.enter_your_email_address"
                                @keyup.enter="search"
                            />
                        </td>
                        <td class="max-w-[120px]">
                            <Datepicker v-model="formSearch.date" classes="w-[160px]" />
                        </td>
                        <td>
                            <Select v-model="formSearch.paymentStatus">
                                <SelectTrigger>
                                    <SelectValue :placeholder="messages.please_select" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">支払い済み</SelectItem>
                                        <SelectItem value="1">未払い</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="formSearch.status">
                                <SelectTrigger>
                                    <SelectValue :placeholder="messages.please_select" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">
                                            {{ lang == 'en' ? 'Pending' : '登録待ち' }}
                                        </SelectItem>
                                        <SelectItem value="success">
                                            {{ lang == 'en' ? 'Success' : '登録完了' }}
                                        </SelectItem>
                                        <SelectItem value="error">
                                            {{ lang == 'en' ? 'Error' : '失敗' }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td></td>
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
                        <td></td>
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
                        <td>支払い状況</td>
                        <td>
                            <Select
                                v-model="item.status"
                                @update:modelValue="etaApplicationStore.updateStatus(item, item.status)"
                            >
                                <SelectTrigger>
                                    <SelectValue :placeholder="messages.please_select" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">
                                            {{ lang == 'en' ? 'Pending' : '登録待ち' }}
                                        </SelectItem>
                                        <SelectItem value="success">
                                            {{ lang == 'en' ? 'Success' : '登録完了' }}
                                        </SelectItem>
                                        <SelectItem value="error">
                                            {{ lang == 'en' ? 'Error' : '失敗' }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td>
                            <Screenshots v-if="item.screenshots" :screenshots="item.screenshots" />
                        </td>
                        <td class="text-center">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="bg-blue-500 font-normal text-white hover:bg-blue-700 hover:text-white"
                                @click="openModalDetails(item)"
                            >
                                <Info />
                                <span>{{ messages.detail }}</span>
                            </Button>
                        </td>
                        <td>
                            <Button type="button" variant="outline" size="lg" class="font-normal hover:text-blue-500">
                                <Send />
                                <span>{{ messages.resend_email }}</span>
                            </Button>
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
    </AdminLayout>
</template>
