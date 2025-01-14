<script setup>
import { usePage } from '@inertiajs/vue3';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

const { url } = usePage().props;

defineProps({
    screenshots: {
        type: Array,
        default: () => [],
    },
});

const showModal = ref(false);
const currentImage = ref('');

const openModal = (image) => {
    currentImage.value = `${url}/${image}`;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    currentImage.value = '';
};
</script>

<template>
    <div class="screenshots">
        <div v-for="(image, index) in screenshots" :key="index" class="preview-image" @click="openModal(image)">
            <img :src="`${url}/${image}`" alt="Thumbnail" class="h-[150px] w-40" />
        </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <button class="close-btn" @click="closeModal">
                    <X class="w-[20px]" />
                </button>
            </div>

            <div class="modal-body scrollbar-custom">
                <img :src="currentImage" alt="Original Image" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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

        img {
            cursor: pointer;
        }
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.modal-content {
    position: relative;
    background: #fff;
    border-radius: 8px;
    height: 95%;
    padding: 10px;

    .modal-header {
        .close-btn {
            position: absolute;
            top: 5px;
            right: 2px;
            background: none;
            border: none;
            color: #333;
            cursor: pointer;
            font-weight: bold;
            padding: 3px 5px;

            &:hover {
                background-color: rgb(230, 228, 228);
                border-radius: 50%;
            }
        }
    }

    .modal-body {
        overflow: auto;
        max-height: 95%;
        margin-top: 35px;

        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
    }
}

.modal-overlay {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.scrollbar-custom {
    width: 100%;
    overflow: auto;
    scrollbar-width: thin;
    -ms-overflow-style: auto;
    position: relative;
}

.scrollbar-custom::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
}

.scrollbar-custom::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
