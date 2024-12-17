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
                <DialogTitle class="text-[20px]">
                    Help - What travel document do you plan to use to travel to Canada?
                </DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <ScrollArea class="grid gap-4 overflow-y-auto px-6 py-2">
                <div class="block">
                    <p class="mb-4">
                        <strong>Passport - ordinary/regular</strong><br />A passport issued to citizens for occasional
                        travel, such as vacations and business trips.&nbsp;
                    </p>
                    <p class="mb-4">
                        <strong>Passport - diplomatic</strong><br />A passport issued to citizens who are high-ranking
                        government officials, diplomats, and representatives and delegates of a government.
                    </p>
                    <p class="mb-4">
                        <strong>Passport - official</strong><br />A passport normally issued to citizens, such as
                        non-diplomatic government officials, traveling on official government business.<br />Use if the
                        front cover of your passport says 'official'.
                    </p>
                    <p class="mb-4">
                        <strong>Passport - service</strong><br />A passport normally issued to citizens, such as
                        non-diplomatic government officials, traveling on official government business.<br />Use if the
                        front cover of your passport says 'service'.
                    </p>
                    <p class="mb-4">
                        <strong>Emergency/temporary travel document</strong><br />A travel document or passport issued
                        to citizens in urgent cases where the issuance of a temporary passport is not possible. These
                        documents are often valid for a short period of time.
                    </p>
                    <p class="mb-4">
                        <strong>Refugee travel document</strong><br />A travel document issued to non-citizens with
                        protected-person status, including Convention refugees and persons in need of protection.
                    </p>
                    <p class="mb-4">
                        <strong>Alien passport/travel document issued to non-citizens</strong><br />A passport or travel
                        document issued to non-citizens who live either permanently or temporarily in the country that
                        issued the document, but are not citizens of that country.
                    </p>
                    <p class="mb-4">
                        <strong>Permit to re-enter the United States (I-327)</strong><br />A travel document issued by
                        United States (U.S.) Citizenship and Immigration Services to U.S. lawful permanent residents to
                        allow them to travel abroad and return to the U.S. without having to get a returning resident
                        visa.
                    </p>
                    <p class="mb-4">
                        <strong>United States refugee travel document (I-571)</strong><br />A travel document issued by
                        United States (U.S.) Citizenship and Immigration Services to non-citizens who have been
                        recognized as refugees or granted asylum.
                    </p>
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
</template>
