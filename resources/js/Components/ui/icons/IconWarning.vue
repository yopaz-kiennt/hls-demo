<template>
    <div class="icon">
        <svg
            fill="#cf0707"
            class="w-[30px]"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#cf0707"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm-9.838 1342.685c-84.47 0-153.19 68.721-153.19 153.19 0 84.47 68.72 153.192 153.19 153.192s153.19-68.721 153.19-153.191-68.72-153.19-153.19-153.19ZM1153.658 320H746.667l99.118 898.623h208.755L1153.658 320Z"
                    fill-rule="evenodd"
                ></path>
            </g>
        </svg>
    </div>
</template>

<style scoped lang="scss">
.icon {
    position: relative;
    width: 30px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        z-index: 1;
        height: 22px;
        width: 6px;
        left: 50%;
        background-color: #cf0707;
        transform: translateX(-50%);
    }

    &::before {
        top: -25px;
    }

    &::after {
        bottom: -25px;
    }
}
</style>
