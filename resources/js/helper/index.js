export const representativeRelationship = {
    familyOrMember: '0',
    memberOfNonGovernmental: '1',
    memberOfCollege: '2',
    memberOfCanadian: '3',
    memberOfChampre: '4',
    travelAgent: '5',
};

export const getTravelDocuments = (lang) => [
    {
        title: lang === 'en' ? 'Passport - ordinary/regular' : 'パスポート－一般/通常',
        value: '0',
    },
    {
        title: lang === 'en' ? 'Passport - diplomatic' : 'パスポート－外交用',
        value: '1',
    },
    {
        title: lang === 'en' ? 'Passport - official' : 'パスポート－公務用',
        value: '2',
    },
    {
        title: lang === 'en' ? 'Passport - service' : 'パスポート－サービス',
        value: '3',
    },
    {
        title: lang === 'en' ? 'Emergency/temporary travel document' : '緊急/臨時渡航文書',
        value: '4',
    },
    {
        title: lang === 'en' ? 'Refugee travel document' : '難民渡航文書',
        value: '5',
    },
    {
        title:
            lang === 'en'
                ? 'Alien passport/travel document issued for non-citizens'
                : '国民以外の個人に発給された外国人パスポート/渡航文書',
        value: '6',
    },
    {
        title: lang === 'en' ? 'Permit to re-enter the United States (I-327)' : '米国再入国許可証(I-327)',
        value: '7',
    },
    {
        title: lang === 'en' ? 'U.S. Refugee travel document (I-571)' : '米国難民渡航文書(I-571)',
        value: '8',
    },
];

export const scrollToField = (field) => {
    const targetElement = document.getElementById(field);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.focus();
    }
};
