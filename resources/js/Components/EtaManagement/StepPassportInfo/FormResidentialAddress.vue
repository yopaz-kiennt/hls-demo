<script setup>
defineProps({
    item: {
        type: Object,
        default: () => {},
    },
});
</script>

<template>
    <div>
        <h2 class="title">居住地の住所</h2>

        <ul class="list-items">
            <li class="item">
                <b class="item__title">住所</b>
                <p class="item__content">
                    <span v-if="item.data.contactDetails.aptUnit">{{ item.data.contactDetails.aptUnit }}, </span>

                    <span>{{ item.data.contactDetails.streetNo }}</span>

                    <span>, {{ item.data.contactDetails.streetAddress }} </span>

                    <span v-if="item.data.contactDetails.streetAddressAlt">
                        , {{ item.data.contactDetails.streetAddressAlt }}
                    </span>

                    <span>{{ item.data.contactDetails.city }}</span>

                    <span>, {{ item.data.contactDetails.country }} </span>

                    <span v-if="item.data.contactDetails.district">, {{ item.data.contactDetails.district }} </span>
                </p>
            </li>
        </ul>
    </div>
</template>
