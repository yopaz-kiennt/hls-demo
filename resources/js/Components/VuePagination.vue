<script setup>
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

defineProps({
    totalPage: {
        type: Number,
        default: 0,
        required: true,
    },
    currentPage: {
        type: Number,
        default: 1,
        required: true,
    },
    lastPage: {
        type: Number,
        default: 1,
        required: true,
    },
});

const emit = defineEmits(['click']);

const loadPage = (page) => {
    emit('click', page);
};
</script>

<template>
    <Pagination
        v-slot="{ page }"
        :total="totalPage"
        :sibling-count="1"
        show-edges
        :default-page="currentPage"
        class="my-4"
    >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst @click="loadPage(1)" />
            <PaginationPrev @click="loadPage(currentPage - 1)" />

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
                                ? 'bg-[#3b82f6] text-white'
                                : 'border border-input bg-white text-black hover:bg-accent hover:text-accent-foreground'
                        "
                    >
                        {{ item.value }}
                    </button>
                </PaginationListItem>

                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="loadPage(currentPage + 1)" />
            <PaginationLast @click="loadPage(lastPage)" />
        </PaginationList>
    </Pagination>
</template>
