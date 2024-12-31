<script setup>
import { CircleCheck, CircleX, Info, X } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
});

const progress = ref(100);
const notificationDuration = 4000;
const remainingTime = ref(notificationDuration);
const showNotify = defineModel();
let interval = null;
let timeout = null;
const isHovered = ref(false);

const closeNotification = () => {
    showNotify.value = false;
};

watch(showNotify, (newVal) => {
    if (newVal) {
        remainingTime.value = notificationDuration;
        progress.value = 100;

        timeout = setTimeout(() => {
            if (!isHovered.value) {
                closeNotification();
            }
        }, notificationDuration);
    }
});

const handleMouseEnter = () => {
    isHovered.value = true;
    clearTimeout(timeout);
};

const handleMouseLeave = () => {
    isHovered.value = false;

    timeout = setTimeout(() => {
        if (!isHovered.value) {
            closeNotification();
        }
    }, remainingTime.value);
};

const icon = computed(() => {
    switch (props.type) {
        case 'error':
            return CircleX;
        case 'success':
            return CircleCheck;
        case 'info':
            return Info;
        default:
            return Info;
    }
});
</script>

<template>
    <div v-if="showNotify" class="notify" :class="type" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="card">
            <div v-if="icon" class="icon">
                <component :is="icon" class="w-[22px]" />
            </div>

            <div class="content">
                <p class="content__title">{{ title }}</p>
                <p v-if="description" class="content__description mt-1 text-[12px]">{{ description }}</p>
            </div>

            <button class="close-btn" @click="closeNotification">
                <X class="w-[16px]" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.notify {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 12px;
    border-radius: 6px;
    background-color: #333;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;
    min-width: 280px;
    max-width: 330px;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    opacity: 0;
    transform: translateX(100%);
    animation: slideIn 0.5s forwards;
    transition: transform 0.3s ease-out;

    .card {
        .content {
            width: 85%;
            color: #000000c9;

            &__title {
                font-size: 14px;
            }

            &__description {
                font-size: 11px;
            }
        }

        .close-btn {
            background: none;
            border: none;
            color: #f9f9f9;
            font-weight: bold;
            border-radius: 50%;
            max-height: 18px;
            cursor: pointer;
            transition:
                color 0.3s ease,
                transform 0.3s ease;

            &:hover {
                color: #fff;
                transform: scale(1.1);
            }
        }
    }

    &.success {
        background-color: #f0fbf2;

        .card {
            .content,
            .close-btn,
            .icon {
                color: #0db50d;

                &__description {
                    color: #000000c9;
                }
            }
        }
    }

    &.error {
        background-color: #ffe3e1;

        .card {
            .content,
            .close-btn,
            .icon {
                color: #ff3f31;

                &__description {
                    color: #000000c9;
                }
            }
        }
    }

    &.info {
        background-color: #2196f3;
    }

    .card {
        display: flex;
        justify-content: space-between;

        .icon {
            margin-right: 5px;
        }
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(120%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
