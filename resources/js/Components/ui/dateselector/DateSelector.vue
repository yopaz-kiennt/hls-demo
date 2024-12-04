<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse();

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

const year = defineModel('year');
const month = defineModel('month');
const day = defineModel('day');
</script>

<template>
    <div class="flex w-[100%] justify-between">
        <div class="md:w-[32%]">
            <Select v-model="year">
                <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="yearOption in years" :key="yearOption" :value="`'${yearOption}'`">
                            {{ yearOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <div class="md:w-[32%]">
            <Select v-model="month">
                <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="monthOption in months" :key="monthOption" :value="`'${monthOption}'`">
                            {{ monthOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <div class="md:w-[32%]">
            <Select v-model="day">
                <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="dayOption in days" :key="dayOption" :value="`'${dayOption}'`">
                            {{ dayOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
