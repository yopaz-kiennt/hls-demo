<script setup>
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

// Giờ: từ 00 đến 23
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

// Phút: từ 00 đến 59
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

// Timezones (ví dụ)
const timezones = [
    'UTC-12:00',
    'UTC-11:00',
    'UTC-10:00',
    'UTC-09:00',
    'UTC-08:00',
    'UTC-07:00',
    'UTC-06:00',
    'UTC-05:00',
    'UTC-04:00',
    'UTC-03:00',
    'UTC-02:00',
    'UTC-01:00',
    'UTC+00:00',
    'UTC+01:00',
    'UTC+02:00',
    'UTC+03:00',
    'UTC+04:00',
    'UTC+05:00',
    'UTC+06:00',
    'UTC+07:00',
    'UTC+08:00',
    'UTC+09:00',
    'UTC+10:00',
    'UTC+11:00',
    'UTC+12:00',
];

// Model binding cho giá trị chọn
const hour = defineModel('hour');
const minute = defineModel('minute');
const timezone = defineModel('timezone');
</script>

<template>
    <div class="flex w-[100%] justify-between">
        <!-- Select Giờ -->
        <div class="md:w-[32%]">
            <Select v-model="hour">
                <SelectTrigger>
                    <SelectValue placeholder="Select hour" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="hourOption in hours" :key="hourOption" :value="hourOption">
                            {{ hourOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <!-- Select Phút -->
        <div class="md:w-[32%]">
            <Select v-model="minute">
                <SelectTrigger>
                    <SelectValue placeholder="Select minute" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="minuteOption in minutes" :key="minuteOption" :value="minuteOption">
                            {{ minuteOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <!-- Select Timezone -->
        <div class="md:w-[32%]">
            <Select v-model="timezone">
                <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="timezoneOption in timezones" :key="timezoneOption" :value="timezoneOption">
                            {{ timezoneOption }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
