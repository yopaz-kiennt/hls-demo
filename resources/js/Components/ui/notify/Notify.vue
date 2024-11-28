<script setup>
import { CircleCheck, TriangleAlert, X } from 'lucide-vue-next';
import { ref, watch } from 'vue';

defineProps({
    message: String,
    type: String,
});
const progress = ref(100);
const notificationDuration = 4000;
const showNotify = defineModel();

const closeNotification = () => {
    showNotify.value = false;
};

watch(showNotify, (newVal) => {
    if (newVal) {
        progress.value = 100;

        const interval = setInterval(() => {
            progress.value -= (100 / notificationDuration) * 100;
            if (progress.value <= 0) {
                clearInterval(interval);
            }
        }, 100);

        setTimeout(() => closeNotification(), notificationDuration + 200);
    }
});
</script>

<template>
    <div v-if="showNotify" class="notify" :class="type">
        <div class="content">
            <div v-if="type === 'error'" class="icon">
                <TriangleAlert class="w-[18px]" />
            </div>
            <div v-if="type === 'success'" class="icon">
                <CircleCheck class="w-[22px]" />
            </div>

            <span>{{ message }}</span>

            <button class="close-btn" @click="closeNotification">
                <X class="w-[16px]" />
            </button>
        </div>

        <div
            :class="`progress-bar ${type}`"
            :style="{ width: progress + '%', opacity: 0.6 }"
        ></div>
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
        height: 3px;
        position: absolute;
        bottom: 0px;
        left: 0;
        border-radius: 8px;
        transition: width 0.3s ease-out;

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
