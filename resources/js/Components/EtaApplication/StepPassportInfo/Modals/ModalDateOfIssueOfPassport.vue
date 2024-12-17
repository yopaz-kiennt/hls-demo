<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { ScrollArea } from '@/Components/ui/scroll-area';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['close']);
</script>

<template>
    <Dialog :open="props.isOpen">
        <DialogContent
            class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[625px]"
            @close="$emit('close')"
        >
            <DialogHeader>
                <DialogTitle class="text-[20px]">Help - Date of issue of passport</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <ScrollArea class="grid gap-4 overflow-y-auto px-6 py-2">
                <div class="block">
                    <p class="mb-2">
                        You can find this information on the page in your passport that shows your photo and date of
                        birth (also known as the biodata page).
                    </p>

                    <img
                        src="images/Dates_EN.jpg"
                        alt="Image of the passport issue and expiry date fields on the passport information page."
                    />
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
</template>
