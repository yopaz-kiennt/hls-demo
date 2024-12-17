<script setup>
import { CircleCheck, Info, TriangleAlert, X } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    message: {
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

const startProgress = () => {
    interval = setInterval(() => {
        if (!isHovered.value) {
            remainingTime.value -= 100;
            progress.value = (remainingTime.value / notificationDuration) * 100;
            if (remainingTime.value <= 0) {
                clearInterval(interval);
                closeNotification();
            }
        }
    }, 100);
};

watch(showNotify, (newVal) => {
    if (newVal) {
        remainingTime.value = notificationDuration;
        progress.value = 100;
        startProgress();

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
            return TriangleAlert;
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
        <div class="content">
            <div v-if="icon" class="icon">
                <component :is="icon" class="w-[22px]" />
            </div>

            <span>{{ message }}</span>

            <button class="close-btn" @click="closeNotification">
                <X class="w-[16px]" />
            </button>
        </div>

        <div :class="`progress-bar ${type}`" :style="{ width: progress + '%', opacity: 0.6 }"></div>
    </div>
</template>

<style scoped lang="scss">
.notify {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 12px;
    border-radius: 6px;
    color: #ffffff;
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

    &.success {
        background-color: #62c066;
    }

    &.error {
        background-color: #f44336;
    }

    &.info {
        background-color: #2196f3;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            margin-right: 5px;
        }
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        position: absolute;
        bottom: 0px;
        left: 0;
        transition: width 0.4s ease-out;

        &.success {
            background-color: #4b6c4d;
        }

        &.error {
            background-color: #482422;
        }
    }
}

.close-btn {
    background: none;
    border: none;
    color: #f9f9f9;
    font-weight: bold;
    border-radius: 50%;
    cursor: pointer;
    transition:
        color 0.3s ease,
        transform 0.3s ease;

    &:hover {
        color: #fff;
        transform: scale(1.1);
    }
}

.notify span {
    flex: 1;
    padding-right: 12px;
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
