<script setup>
import IconReset from '@/Components/ui/icons/IconReset.vue';
import IconSearch from '@/Components/ui/icons/IconSearch.vue';
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
import { Toaster } from '@/Components/ui/toast';
import { useToast } from '@/Components/ui/toast/use-toast';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ApplicationDetailsModal from '@/Pages/Admin/ApplicationDetailsModal.vue';
import { Head, router } from '@inertiajs/vue3';
import { format } from 'date-fns';
import { ref } from 'vue';

const { toast } = useToast();
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd');
};

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

const selectedItem = ref(null);
const isModalOpen = ref(false);

const openDetailsModal = (item) => {
    selectedItem.value = item;
    isModalOpen.value = true;
};

const closeDetailsModal = () => {
    isModalOpen.value = false;
    selectedItem.value = null;
};

const email = ref(props.filters.email || '');
const date = ref(props.filters.date || '');
const paymentStatus = ref(props.filters.payment_status || '');
const status = ref(props.filters.status || '');

const searchApplications = () => {
    const params = new URLSearchParams();

    if (email.value) params.append('email', email.value);
    if (date.value) params.append('date', date.value);
    if (status.value) params.append('status', status.value);
    router.get(`/admin/eta-management?${params.toString()}`);
};

const resetFilters = () => {
    email.value = '';
    date.value = '';
    paymentStatus.value = '';
    status.value = '';

    router.get('/admin/eta-management');
};

const loadPage = (page) => {
    const params = new URLSearchParams({
        email: email.value,
        date: date.value,
        payment_status: paymentStatus.value,
        status: status.value,
        page,
    });

    router.get(`/admin/eta-management?${params.toString()}`);
};

const updateStatus = async (item, newStatus) => {
    try {
        const response = await axios.put(`/admin/eta-management/${item.id}/status`, {
            status: newStatus,
        });

        item.status = response.data.status;

        toast({
            title: '更新成功しました！',
        });

        console.log(`Status updated successfully for item ID: ${item.id}`);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        toast({
            title: '更新に失敗しました！',
            description: 'ステータスの更新中にエラーが発生しました。もう一度お試しください。',
            variant: 'destructive',
        });
    }
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
                                v-model="email"
                                type="text"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="メールアドレスを入力"
                                @keyup.enter="searchApplications"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <input
                                id="search-date"
                                v-model="date"
                                type="date"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <select
                                id="payment-status"
                                v-model="paymentStatus"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="" disabled selected>状態を選択</option>
                                <option value="0">支払い済み</option>
                                <option value="1">未払い</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            <select
                                id="registration-status"
                                v-model="status"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="" disabled selected>状態を選択</option>
                                <option value="pending">登録待ち</option>
                                <option value="active">登録完了</option>
                                <option value="inactive">失敗</option>
                            </select>
                        </td>
                        <td class="py-4">
                            <div class="flex h-full items-center justify-center gap-5">
                                <button @click="searchApplications">
                                    <IconSearch />
                                </button>

                                <button @click="resetFilters">
                                    <IconReset />
                                </button>
                            </div>
                        </td>
                        <td class="py-4"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="applications.data.length === 0">
                        <td colspan="7" class="py-4 text-center">データがありません。</td>
                    </tr>

                    <tr v-for="item in applications.data" v-else :key="item.id" class="border-b">
                        <td class="px-6 py-4">
                            {{ item.id }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.data.contactDetails.emailAddress }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="px-6 py-4">支払い状況</td>
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

                            <Toaster />
                        </td>
                        <td class="flex justify-center py-4">
                            <button
                                class="mb-2 me-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                                @click="openDetailsModal(item)"
                            >
                                詳細
                            </button>
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
                    <ApplicationDetailsModal
                        v-if="selectedItem"
                        :item="selectedItem"
                        :isOpen="isModalOpen"
                        :occupations="occupations"
                        @close="closeDetailsModal"
                    />
                </tbody>
            </table>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Pagination
            v-if="applications.data.length > 0"
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
                            :class="
                                item.value === page
                                    ? 'bg-black text-white'
                                    : 'border border-input bg-white text-black hover:bg-accent hover:text-accent-foreground'
                            "
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
