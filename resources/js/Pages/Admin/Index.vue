<script setup>
import { Button } from '@/Components/ui/button';
import IconReset from '@/Components/ui/icons/IconReset.vue';
import IconSearch from '@/Components/ui/icons/IconSearch.vue';
import { Input } from '@/Components/ui/input';
import { ScrollArea, ScrollBar } from '@/Components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Toaster } from '@/Components/ui/toast';
import { useToast } from '@/Components/ui/toast/use-toast';
import VuePagination from '@/Components/VuePagination.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import ApplicationDetailsModal from '@/Pages/Admin/ApplicationDetailsModal.vue';
import { Head, router, usePage } from '@inertiajs/vue3';
import { format } from 'date-fns';
import { Info, Send } from 'lucide-vue-next';
import { ref } from 'vue';

const { lang, messages } = usePage().props;

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

const search = () => {
    const params = new URLSearchParams();

    if (email.value) params.append('email', email.value);
    if (date.value) params.append('date', date.value);
    if (status.value) params.append('status', status.value);
    router.get(`/admin/eta-management?${params.toString()}`);
};

const reset = () => {
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
                        <th>{{ messages.registered_email }}</th>
                        <th>{{ messages.register_date }}</th>
                        <th class="min-w-[140px]">{{ messages.payment_status }}</th>
                        <th class="min-w-[140px]">{{ messages.register_status }}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="px-6 py-4"></td>
                        <td class="px-6 py-4">
                            <Input
                                v-model="email"
                                type="email"
                                placeholder="メールアドレスを入力"
                                @keyup.enter="search"
                            />
                        </td>
                        <td class="px-3 py-4">
                            <Input id="search-date" v-model="date" type="date" class="block w-full" />
                            <!-- <Datepicker v-model="date" /> -->
                        </td>
                        <td class="px-6 py-4">
                            <Select v-model="paymentStatus">
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
                        <td class="px-6 py-4">
                            <Select v-model="status">
                                <SelectTrigger>
                                    <SelectValue :placeholder="messages.please_select" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">
                                            {{ lang == 'en' ? 'Pending' : '登録待ち' }}
                                        </SelectItem>
                                        <SelectItem value="active">
                                            {{ lang == 'en' ? 'Active' : '登録完了' }}
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            {{ lang == 'en' ? 'Inactive' : '失敗' }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td class="py-4">
                            <div class="flex h-full items-center justify-center gap-5">
                                <button @click="search">
                                    <IconSearch />
                                </button>

                                <button @click="reset">
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
                            <Select v-model="item.status" @update:modelValue="updateStatus(item, item.status)">
                                <SelectTrigger>
                                    <SelectValue :placeholder="messages.please_select" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">
                                            {{ lang == 'en' ? 'Pending' : '登録待ち' }}
                                        </SelectItem>
                                        <SelectItem value="active">
                                            {{ lang == 'en' ? 'Active' : '登録完了' }}
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            {{ lang == 'en' ? 'Inactive' : '失敗' }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Toaster />
                        </td>
                        <td class="flex justify-center py-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                class="bg-blue-500 font-normal text-white hover:bg-blue-700 hover:text-white"
                                @click="openDetailsModal(item)"
                            >
                                <Info />
                                <span>{{ messages.detail }}</span>
                            </Button>
                        </td>
                        <td class="py-4">
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
                @click="loadPage"
            />
        </template>

        <ApplicationDetailsModal
            v-if="selectedItem"
            :item="selectedItem"
            :isOpen="isModalOpen"
            :occupations="occupations"
            @close="closeDetailsModal"
        />
    </AdminLayout>
</template>
