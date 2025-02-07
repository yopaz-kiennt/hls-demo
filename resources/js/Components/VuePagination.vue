<script setup>
import {
    Pagination,
    PaginationEllipsis,
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
        class="pagination my-4"
    >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
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
                        class="h-10 w-10 rounded-none p-0"
                        :class="
                            item.value === page
                                ? 'active bg-[#3b82f6] text-white'
                                : 'item border border-input bg-white text-black hover:text-accent-foreground'
                        "
                    >
                        {{ item.value }}
                    </button>
                </PaginationListItem>

                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="loadPage(currentPage + 1)" />
        </PaginationList>
    </Pagination>
</template>

<style lang="scss">
.pagination {
    display: flex;
    justify-content: center;

    button {
        border: 0;
        border-radius: 5px;
        outline: none;
        box-shadow: none;

        &:hover {
            background-color: #fafafa;
        }

        &.active {
            background-color: transparent;
            color: #02b9fa;
        }
    }
}
</style>
