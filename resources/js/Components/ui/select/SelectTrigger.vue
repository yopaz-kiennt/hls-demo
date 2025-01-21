<script setup>
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { SelectIcon, SelectTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
    disabled: { type: Boolean, required: false },
    asChild: { type: Boolean, required: false },
    as: { type: null, required: false },
    class: { type: null, required: false },
});

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'flex h-10 w-full min-w-[72px] items-center justify-between border border-[#707070] bg-background px-3 py-2 text-start text-[13.3333px] ring-offset-background focus:border-[#4a90e2] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:truncate',
                props.class
            )
        "
    >
        <slot />
        <SelectIcon as-child>
            <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
        </SelectIcon>
    </SelectTrigger>
</template>
