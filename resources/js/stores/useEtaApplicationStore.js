import axios, { AxiosError, HttpStatusCode } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useEtaApplicationStore = defineStore('eta_application', {
    state: () => ({
        stepIndex: 3,
        formData: {
            // Step 01
            isRepresentative: '',
            isApplyingOnBehalfOfMinorChild: '',
            // Step 02
            representative: {
                representativeRelationship: '0',
                representativeCompensated: '',
                membershipIdNumber: '',
                province: '',
                lastName: '',
                firstName: '',
                organizationName: '',
                mailingAddress: '',
                phoneNumber: '',
                faxNumber: '',
                emailAddress: '',
                postalCodeZip: '',
                declareContactAndInformationIsTruthy: '',
                understandAndAccept: '',
            },
            // Step 03
            travelDocumentType: '',
            personDetails: {
                passportNumber: '',
                passportNumberReEnter: '',
                lastName: '',
                firstName: '',
                dobYear: '',
                dobMonth: '',
                dobDay: '',
                gender: '',
                countryOfBirth: '',
                cityTownOfBirth: '',
                issueDateYear: '',
                issueDateMonth: '',
                issueDateDay: '',
                expiryDateYear: '',
                expiryDateMonth: '',
                expiryDateDay: '',
                additionalCitizenship: '',
                hasPreviouslyAppliedToCanada: '',
                uci: '',
                uciReEnter: '',
            },
            contactDetails: {
                languageOfPreference: '',
                emailAddress: '',
                emailAddressReEnter: '',
                aptUnit: '',
                streetNo: '',
                streetAddress: '',
                streetAddressAlt: '',
                city: '',
                country: '',
                district: '',
            },
            travelDetails: {
                isTravelDateKnown: '',
                travelDateYear: '',
                travelDateMonth: '',
                travelDateDay: '',
                travelDateTimeHour: '',
                travelDateTimeMinute: '',
                travelDateTimeTimezone: '',
            },
            consentAndDeclaration: {
                inAggreance: '',
                fullName: '',
            },
        },
        loading: false,
        errors: {},
    }),
    actions: {
        updateStepIndex(index) {
            this.stepIndex = index;
        },
        async submitForm() {
            try {
                this.loading = true;

                await axios.post(this.$route('eta_application.register'), this.formData);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === HttpStatusCode.UnprocessableEntity) {
                        this.errors = error.response.data.errors;
                    } else {
                        console.error(error);
                    }
                }
            } finally {
                this.loading = false;
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEtaApplicationStore, import.meta.hot));
}
