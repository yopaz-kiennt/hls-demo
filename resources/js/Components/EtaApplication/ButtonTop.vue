<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
</script>

<template>
    <Link :href="route('home')" class="pageLink pageLink--black">TOP</Link>
</template>
