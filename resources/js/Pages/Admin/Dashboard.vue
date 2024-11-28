<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
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
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head>
        <title>Trang Dashboard</title>
        <meta name="description" content="Your page description" />
    </Head>

    <AdminLayout>
        <AlertDialog>
            <AlertDialogTrigger as-child>
                <Button variant="outline"> Show Dialog </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <h3 class="mb-6 mt-4">Shadcn Pagination</h3>

        <Pagination
            v-slot="{ page }"
            class="mb-10"
            :total="100"
            :sibling-count="1"
            show-edges
            :default-page="2"
        >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                    <PaginationListItem
                        v-if="item.type === 'page'"
                        :key="index"
                        :value="item.value"
                        as-child
                    >
                        <Button
                            class="h-10 w-10 p-0"
                            :variant="
                                item.value === page ? 'default' : 'outline'
                            "
                        >
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis
                        v-else
                        :key="item.type"
                        :index="index"
                    />
                </template>

                <PaginationNext />
                <PaginationLast />
            </PaginationList>
        </Pagination>
    </AdminLayout>
</template>
