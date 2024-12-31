<script setup>
import { defineZoomOptions, ZoomImage } from '@bryce-loskie/mz';
import { usePage } from '@inertiajs/vue3';

const { url } = usePage().props;

defineProps({
    screenshots: {
        type: Array,
        default: () => [],
    },
});

const options = defineZoomOptions({
    background: '#fff',
    margin: 24,
});
</script>

<template>
    <div class="screenshots">
        <div v-for="(image, index) in screenshots" :key="index" class="preview-image">
            <ZoomImage alt="foo" :src="`${url}/${image}`" :zoom-options="options" class="h-auto w-40" />
        </div>
    </div>
</template>

<style lang="scss">
.medium-zoom-overlay {
    z-index: 40;
}

.medium-zoom-image {
    z-index: 41;
}

.screenshots {
    display: flex;
    flex-wrap: wrap;
    max-width: 215px;

    .preview-image {
        max-width: 100px;
        margin-right: 5px;
        margin-bottom: 5px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        overflow: hidden;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
