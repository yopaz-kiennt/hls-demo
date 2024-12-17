<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';

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
                <DialogTitle class="text-[20px]">
                    Help - Select the code that matches the one on your passport.
                </DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 overflow-y-auto px-6 py-2">
                <img
                    src="/images/Nationality_EN.jpg"
                    alt="Image of the nationality field on the passport information page."
                />
            </div>
        </DialogContent>
    </Dialog>
</template>
