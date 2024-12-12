import axios, { AxiosError, HttpStatusCode } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import * as yup from 'yup';

export const useEtaApplicationStore = defineStore('eta_application', {
    state: () => ({
        stepIndex: 3,
        steps: [
            {
                step: 1,
                title: 'Applicant Type',
                description: 'Choose the type of applicant you are and provide basic details',
            },
            {
                step: 2,
                title: 'Representative Details',
                description: 'Provide information about the representative (if applicable)',
            },
            {
                step: 3,
                title: 'Passport Info',
                description: 'Enter your passport details',
            },
        ],
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
            personalDetails: {
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
                maritalStatus: '',
                hasPreviouslyAppliedToCanada: '',
                uci: '',
                uciReEnter: '',
            },
            employmentDetails: {
                occupation: '',
                title: '',
                companyEmployerSchoolFacilityName: '',
                country: '',
                city: '',
                fromDateYear: '',
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
    getters: {
        formSchema() {
            const schemas = [
                yup.object({
                    isRepresentative: yup.string().required('This field is required.'),
                    isApplyingOnBehalfOfMinorChild: yup.string().when('isRepresentative', {
                        is: (value) => value == 'yes',
                        then: () => yup.string().required('This field is required.'),
                    }),
                }),
                yup.object().shape({
                    representativeRelationship: yup.string().required('This field is required.'),
                    representativeCompensated: yup.string().required('This field is required.'),
                }),
            ];
            return schemas;
        },
        checkAgeOfPersonalDetails(state) {
            const dobYear = parseInt(state.formData.personalDetails.dobYear.replace(/'/g, ''), 10);
            const dobMonth = parseInt(state.formData.personalDetails.dobMonth.replace(/'/g, ''), 10);
            const dobDay = parseInt(state.formData.personalDetails.dobDay.replace(/'/g, ''), 10);

            if (!dobYear || !dobMonth || !dobDay) return 0;

            const today = new Date();
            let age = today.getFullYear() - dobYear;

            if (today.getMonth() + 1 < dobMonth || (today.getMonth() + 1 === dobMonth && today.getDate() < dobDay)) {
                age--;
            }

            return age;
        },
    },
    actions: {
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
