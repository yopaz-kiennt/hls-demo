import { AxiosError, HttpStatusCode } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import * as yup from 'yup';
import { useNotificationStore } from './useNotificationStore';

export const useEtaApplicationStore = defineStore('eta_application', {
    state: () => ({
        stepIndex: 1,
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
                declareContactAndInformationIsTruthy: false,
                understandAndAccept: false,
            },
            // Step 03
            prerequisite: {
                travelDocumentType: '',
                countryOfCitizenship: '',
                passportNotedNationality: '',
            },
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
                // checkAgeOfPersonalDetails (birthday) > 18
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
            backgroundQuestions: {
                // checkAgeOfPersonalDetails (birthday) > 18
                refusedVisaOrPermitOrDeniedEntryToCanada: '1',
                refusedVisaOrPermitOrDeniedEntryToCanadaDetails: '',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere: '1',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails: '',
                inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis: '1',
                isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker: '1',
                haveYouEverBeenDiagnosedWithTuberculosis: '1',
                doYouHaveOneOfTheseConditions: '1',
                haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails: '',
            },
            consentAndDeclaration: {
                inAggreance: false,
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
                    isRepresentative: yup.string().required('この項目は必ず選択してください'),
                    isApplyingOnBehalfOfMinorChild: yup.string().when('isRepresentative', {
                        is: (value) => value == '0',
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
            const dobYear = state.formData.personalDetails.dobYear;
            const dobMonth = state.formData.personalDetails.dobMonth;
            const dobDay = state.formData.personalDetails.dobDay;

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
            const notificationStore = useNotificationStore();

            try {
                this.loading = true;
                const { data } = await axios.post(this.$route('eta_application.register'), this.formData);

                notificationStore.triggerNotify({
                    type: 'success',
                    message: data.message,
                });
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
