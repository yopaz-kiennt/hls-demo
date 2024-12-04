<script setup>
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import DialogDescription from '../ui/dialog/DialogDescription.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['close']);
</script>

<template>
    <Dialog :open="props.isOpen" as-child>
        <DialogContent
            class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[625px]"
            @close="$emit('close')"
        >
            <DialogHeader class="p-6 pb-0">
                <DialogTitle class="text-[20px]"> Help - Are you applying on behalf of someone? </DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 overflow-y-auto px-6 py-2">
                <div class="block">
                    <p>
                        Help - Are you applying on behalf of someone? A person who has the permission of someone wanting
                        to travel or immigrate to Canada to conduct business with IRCC on their behalf. The
                        representative can be paid or unpaid. When someone appoints a representative, they may also
                        authorize IRCC to share information from their case file with this person. Canada's immigration
                        law covers representatives and defines the terms of their services.
                    </p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
