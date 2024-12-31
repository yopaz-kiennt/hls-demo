import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd');
};

export const buildUrlParams = (params) => {
    return new URLSearchParams(
        Object.entries(params).reduce((item, [key, value]) => {
            if (value) item[key] = value;
            return item;
        }, {})
    ).toString();
};
