<template>
    <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
    </svg>
</template>

<style scoped>
svg {
    width: 23px !important;
    height: 23px !important;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
}

circle {
    fill: none;
    stroke: #fff;
    stroke-width: 4;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}
</style>
