<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { ScrollArea } from '@/Components/ui/scroll-area';
import StepApplicationType from './StepApplicationType.vue';
import StepPassportInfoDetails from './StepPassportInfo/StepPassportInfoDetails.vue';
import StepRepresentativeDetails from './StepRepresentativeDetails.vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
    occupations: {
        type: Object,
        default: () => {},
    },
});

defineEmits(['close']);
</script>

<template>
    <Dialog :open="props.isOpen">
        <DialogContent
            class="modal-eta-detail max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] px-[10px] py-[28px] sm:max-w-[625px] sm:px-[30px]"
            :hideClose="true"
            @close="$emit('close')"
        >
            <DialogHeader>
                <div class="header flex items-center justify-between border-b border-b-black pb-[17px]">
                    <span class="text-[26px] font-bold">ID:{{ String(item.id).padStart(5, '0') }}</span>
                    <span class="text-[20px] font-bold">eTA申請詳細</span>
                    <button type="button" class="btn-close" @click="$emit('close')">閉じる</button>
                </div>

                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <ScrollArea class="content grid gap-4 overflow-y-auto px-[15px] py-2">
                <div class="block">
                    <StepApplicationType :item="item" />

                    <StepRepresentativeDetails v-if="item.data.isRepresentative == '0'" :item="item" />

                    <StepPassportInfoDetails :occupations="occupations" :item="item" />
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
</template>

<style lang="scss">
.btn-close {
    @apply rounded-[20px] border border-black px-5 py-1 text-[15px] font-bold hover:border-red-600 hover:bg-red-600 hover:text-white;
}

.modal-eta-detail {
    .content {
        .title {
            background-color: #d9d9d9;
            padding: 9px 10px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
            margin-top: 15px;
        }

        ul.list-items {
            list-style-type: disc;

            &.has-border {
                .item {
                    &:first-child {
                        border-top: 1px dashed #000000;
                    }
                }
            }

            .item {
                list-style-type: disc !important;
                border-bottom: 1px dashed #000000;
                padding: 10px 17px;
                font-size: 13px;
                display: flex;
                align-items: start;
                width: 100%;

                &:last-child {
                    border-bottom: 0;
                }

                &__title {
                    width: 45%;
                    position: relative;
                    margin-right: 10px;

                    &::before {
                        content: '';
                        position: absolute;
                        z-index: 1;
                        width: 4px;
                        height: 4px;
                        background: #000;
                        border-radius: 50%;
                        top: 50%;
                        transform: translateY(-50%);
                        left: -8px;
                    }

                    &.top-0 {
                        &::before {
                            top: 10px;
                        }
                    }
                }

                &__content {
                    width: 50%;
                }
            }
        }
    }
}
</style>
