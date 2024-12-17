<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { ScrollArea } from '@/Components/ui/scroll-area';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['close']);
</script>

<template>
    <Dialog :open="props.isOpen">
        <DialogContent
            class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[625px]"
            @close="$emit('close')"
        >
            <DialogHeader>
                <DialogTitle class="text-[20px]">Help - Surname(s) / last name(s)</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <ScrollArea class="grid gap-4 overflow-y-auto px-6 py-2">
                <div class="block">
                    <p class="mb-2">Last name is also known as family name.</p>
                    <p class="mb-2">First name is also known as given name.</p>
                    <p class="mb-2">Enter ALL name(s) as they appear on your passport.</p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Amended name</h4>
                    <p class="mb-4">
                        If your passport includes an amendment to your name(s) in the observations section, enter your
                        name(s) as it appears in that section.
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Apostrophes</h4>
                    <p class="mb-4">If your name has an apostrophe, enter it on the form. Example: D'Orsay, O'Neil.</p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Order of names</h4>
                    <p class="mb-4">
                        Refer to the machine-readable zone on your passport (the portion below your photo and biographic
                        information, sometimes called a "barcode") to confirm in what order you should enter your names
                        on the application.
                    </p>
                    <p class="mb-4">
                        On the first line of that portion of your passport, you will most likely see a letter, a chevron
                        (&lt;), an abbreviation of your nationality, your family name, two chevrons (&lt;&lt;) and your
                        given name(s).
                    </p>

                    <p class="mb-4">Enter your last name (family name) as it appears in this part of your passport.</p>
                    <p class="mb-4">
                        The name(s) listed after the double chevrons (&lt;&lt;) after your family name is/are your given
                        name(s).
                    </p>
                    <p class="mb-4">
                        If your name(s) is/are shortened or cut off in this portion of your passport, but the full
                        name(s) is spelled out in the upper portion of your passport, enter your name(s) as it/they
                        appear(s) in the top portion.&nbsp; But always rely on the bottom portion to determine the order
                        of your name(s).
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Filial relationships</h4>
                    <p class="mb-4">
                        If your passport includes "son of" or "daughter of," or "bin" or "bint" and your father's name
                        in the top or bottom portions of your passport,
                        <strong>do not enter this text or your father's name in either of the name fields </strong>of
                        the application form.
                    </p>
                    <p class="mb-4">
                        For example, if your passport indicates Ahmad bin Husain bin Muhammad in one field, please enter
                        the Family Name as Husain and the Given Name as Ahmad.
                    </p>
                    <p class="mb-4">
                        If your passport indicates a filial relationship with "ibn," "ben" or "ould wuld," and your
                        father's name in the upper or lower portions of the page, please do not enter this or your
                        father's name in either name field when you are completing the application form.
                    </p>
                    <p class="mb-4">
                        For example, if your passport indicates Husain Ould Ahmad Ould Muhammad in one field, please
                        enter the Family Name as Ahmad and the Given Name as Husain.
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Hyphens</h4>
                    <p class="mb-4">
                        If your name has a hyphen, enter it on the form. Example:&nbsp;Mary‑Anne, Smith-Hansen.
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Only one name on passport</h4>
                    <p class="mb-4">
                        If there is only one name line on the passport, put the whole name in this answer field.
                    </p>
                    <p class="mb-4">Also known as "surname" or "family name".</p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Use of mother's, father's or ancestor's name</h4>
                    <p class="mb-4">
                        If the name on your passport includes the name of your mother, father, grandfather or earlier
                        male ancestor in the machine-readable zone on your passport (the portion below your photo and
                        biographic information, sometimes called a "barcode"), enter that spelling of your name on the
                        application form.
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Spousal relationships</h4>
                    <p class="mb-4">
                        If your passport shows "épouse de", "epse" or "ep." ("spouse of"), "wife of" or "husband of" in
                        the top or bottom portions of your passport, <strong>do not enter</strong>
                        this or the name of your spouse in either the last name or first name fields of the application
                        form.
                    </p>
                    <p class="mb-4">
                        Example: if your passport shows Smith EP. Paul Sajan in the family name field, and John William
                        in the given name field, enter Smith in the last name field and John William in the first name
                        field.
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Titles, prefixes, degrees, decorations</h4>
                    <p class="mb-4">
                        If your passport shows "épouse de", "epse" or "ep." ("spouse of"), "wife of" or "husband of" in
                        the top or bottom portions of your passport, <strong>do not enter</strong>
                        this or the name of your spouse in either the last name or first name fields of the application
                        form.
                    </p>
                    <p class="mb-4">
                        If your passport shows a title, prefix, suffix, professional or academic qualification,
                        decoration, honour, award, or hereditary status,
                        <strong>do not enter this on the application form</strong>, unless it is in the machine-readable
                        zone of your passport (the portion below your photo and biographic information, sometimes called
                        a "barcode").
                    </p>

                    <h4 class="mb-1 mt-4 text-[17px] font-medium">Characters of non-Roman alphabets</h4>
                    <p class="mb-4">
                        Only characters from the Roman script/alphabet can be entered on your application form. Example:
                        Aa, Bb, Cc and French accents such as é, è, ê, ë, û.
                    </p>
                    <p class="mb-4">
                        Your country of nationality is responsible for making your name appear in Roman script on your
                        passport.
                    </p>
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
</template>
