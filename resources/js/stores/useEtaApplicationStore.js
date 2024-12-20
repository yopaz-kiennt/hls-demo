import { representativeRelationship } from '@/helper';
import { router } from '@inertiajs/vue3';
import { AxiosError, HttpStatusCode } from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import * as yup from 'yup';
import { useNotificationStore } from './useNotificationStore';

export const useEtaApplicationStore = defineStore('eta_application', {
    state: () => ({
        messages: {},
        currentStep: 0,
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
                representativeRelationship: '',
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
                languageOfPreference: '0', // en: English
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
                travelDateTimeTimezone: '79', // Japan Time
            },
            backgroundQuestions: {
                // checkAgeOfPersonalDetails (birthday) > 18
                refusedVisaOrPermitOrDeniedEntryToCanada: '',
                refusedVisaOrPermitOrDeniedEntryToCanadaDetails: '',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere: '',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails: '',
                inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis: '',
                isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker: '',
                haveYouEverBeenDiagnosedWithTuberculosis: '1',
                doYouHaveOneOfTheseConditions: '',
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
        fieldNames() {
            return {
                isRepresentative: this.messages.are_you_applying_for_someone,
                isApplyingOnBehalfOfMinorChild: this.messages.are_you_applying_on_behalf_of_minor,
                'representative.representativeRelationship': this.messages.i_am,
                'representative.representativeCompensated': this.messages.are_you_being_paid_to_represent,
                'representative.membershipIdNumber': this.messages.membership_id_number,
                'representative.province': this.messages.which_province_or_territory,
                'representative.lastName': this.messages.surname_last_name,
                'representative.firstName': this.messages.given_first_name,
                'representative.organizationName': this.messages.name_of_firm_organization,
                'representative.mailingAddress': this.messages.mailing_address,
                'representative.phoneNumber': this.messages.telephone_number,
                'representative.faxNumber': this.messages.fax_number,
                'representative.emailAddress': this.messages.email_address,
                'representative.postalCodeZip': this.messages.postal_code,
                'representative.declareContactAndInformationIsTruthy': this.messages.representative_declaration,
                'representative.understandAndAccept': this.messages.representative_authorization,

                'prerequisite.travelDocumentType': this.messages.travel_document_question,
                'prerequisite.countryOfCitizenship': this.messages.passport_code_selection,
                'prerequisite.passportNotedNationality': this.messages.passport_nationality,

                'personalDetails.passportNumber': this.messages.passport_number,
                'personalDetails.passportNumberReEnter': this.messages.passport_number_re_enter,
                'personalDetails.lastName': this.messages.surname_last_name,
                'personalDetails.firstName': this.messages.given_first_name,
                'personalDetails.dobYear': this.messages.date_of_birth,
                'personalDetails.dobMonth': this.messages.date_of_birth,
                'personalDetails.dobDay': this.messages.date_of_birth,
                'personalDetails.gender': this.messages.gender,
                'personalDetails.countryOfBirth': this.messages.country_of_birth,
                'personalDetails.cityTownOfBirth': this.messages.city_of_birth,
                'personalDetails.issueDateYear': this.messages.date_of_issue_of_passport,
                'personalDetails.issueDateMonth': this.messages.date_of_issue_of_passport,
                'personalDetails.issueDateDay': this.messages.date_of_issue_of_passport,
                'personalDetails.expiryDateYear': this.messages.date_of_expiry_of_passport,
                'personalDetails.expiryDateMonth': this.messages.date_of_expiry_of_passport,
                'personalDetails.expiryDateDay': this.messages.date_of_expiry_of_passport,
                'personalDetails.maritalStatus': this.messages.marital_status,
                'personalDetails.hasPreviouslyAppliedToCanada': this.messages.visa_eta_permit_applied_obtained,
                'personalDetails.uciReEnter': this.messages.uci_previous_visa_eta_permit_number_reenter,

                'employmentDetails.occupation': this.messages.occupation,
                'employmentDetails.title': this.messages.job_title,
                'employmentDetails.companyEmployerSchoolFacilityName': this.messages.name_of_employer_or_school,
                'employmentDetails.country': this.messages.country_or_territory,
                'employmentDetails.city': this.messages.city_or_town,
                'employmentDetails.fromDateYear': this.messages.since_what_year,

                'contactDetails.emailAddress': this.messages.email_address,
                'contactDetails.emailAddressReEnter': this.messages.email_address_re_enter,
                'contactDetails.aptUnit': this.messages.apartment_unit_number,
                'contactDetails.streetNo': this.messages.street_civic_number_or_house_name,
                'contactDetails.streetAddress': this.messages.street_address_or_name,
                'contactDetails.city': this.messages.city_or_town,
                'contactDetails.country': this.messages.country_or_territory,
                'contactDetails.district': this.messages.district_or_region,

                'travelDetails.isTravelDateKnown': this.messages.travel_date_question,
                'travelDetails.travelDateYear': this.messages.travel_plan_question,
                'travelDetails.travelDateMonth': this.messages.travel_plan_question,
                'travelDetails.travelDateDay': this.messages.travel_plan_question,
                'travelDetails.travelDateTimeHour': this.messages.flight_departure_time_question,
                'travelDetails.travelDateTimeMinute': this.messages.flight_departure_time_question,
                'travelDetails.travelDateTimeTimezone': this.messages.flight_departure_time_question,

                'backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanada':
                    this.messages.visa_refused_or_denied_entry,
                'backgroundQuestions.refusedVisaOrPermitOrDeniedEntryToCanadaDetails': this.messages.refusal_details,
                'backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere':
                    this.messages.criminal_offence,
                'backgroundQuestions.committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails':
                    this.messages.arrest_charge_conviction_details,
                'backgroundQuestions.inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis':
                    this.messages.tuberculosis_diagnosis_contact,
                'backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker':
                    this.messages.tuberculosis_contact_health_worker,
                'backgroundQuestions.haveYouEverBeenDiagnosedWithTuberculosis': this.messages.tuberculosis_diagnosed,
                'backgroundQuestions.doYouHaveOneOfTheseConditions': this.messages.health_condition_check,

                'consentAndDeclaration.doYouHaveOneOfTheseConditions': this.messages.i_agree,
                'consentAndDeclaration.fullName': this.messages.signature_of_applicant,
            };
        },
        formSchema(state) {
            const schemas = [
                // Step 01
                yup.object({
                    isRepresentative: yup.string().required(this.messages.this_item_must_be_selected),
                    isApplyingOnBehalfOfMinorChild: yup.string().when('isRepresentative', {
                        is: (value) => {
                            return value == '0';
                        },
                        then: () => yup.string().required(this.messages.this_item_must_be_selected),
                    }),
                }),

                // Step 02
                yup.object().shape({
                    representative: yup.object().shape({
                        representativeRelationship: yup.string().required(this.messages.this_item_must_be_selected),
                        representativeCompensated: yup.string().required(this.messages.this_item_must_be_selected),
                        membershipIdNumber: yup.string().when('representativeRelationship', {
                            is: (value) => {
                                return [
                                    representativeRelationship.memberOfCollege,
                                    representativeRelationship.memberOfCanadian,
                                    representativeRelationship.memberOfChampre,
                                ].includes(value);
                            },
                            then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        }),
                        province: yup.string().when('representativeRelationship', {
                            // 107 (maxlength 50)
                            is: (value) => {
                                return [
                                    representativeRelationship.memberOfCollege,
                                    representativeRelationship.memberOfCanadian,
                                ].includes(value);
                            },
                            then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        }),
                        lastName: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 108 (maxlength 50, regex)
                        firstName: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 109 (maxlength 50, regex)
                        organizationName: yup.string().when('representativeRelationship', {
                            // 110 (maxlength 75)
                            is: (value) => {
                                return [
                                    representativeRelationship.memberOfNonGovernmental,
                                    representativeRelationship.memberOfCollege,
                                    representativeRelationship.memberOfCanadian,
                                    representativeRelationship.memberOfChampre,
                                    representativeRelationship.travelAgent,
                                ].includes(value);
                            },
                            then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        }),

                        mailingAddress: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 112 (maxlength 30)
                        postalCodeZip: yup.string().when('representativeRelationship', {
                            // 112 (maxlength 30)
                            is: (value) => {
                                return [
                                    representativeRelationship.memberOfCollege,
                                    representativeRelationship.memberOfCanadian,
                                ].includes(value);
                            },
                            then: () =>
                                yup
                                    .string()
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(/^[0-9]+$/, 'Must be numeric'),
                        }),
                        phoneNumber: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 113 (maxlength 20, regex)
                        // faxNumber: yup.string(), // 114 (maxlength 20, regex)
                        emailAddress: yup.string().email(this.messages.email_valid), // 115
                        declareContactAndInformationIsTruthy: yup // 116
                            .boolean()
                            .oneOf([true], this.messages.this_item_must_be_selected)
                            .required(this.messages.this_item_must_be_selected),
                        understandAndAccept: yup
                            .boolean()
                            .oneOf([true], this.messages.this_item_must_be_selected)
                            .required(this.messages.this_item_must_be_selected),
                    }),
                }),

                // Step 03
                yup.object().shape({
                    prerequisite: yup.object().shape({
                        travelDocumentType: yup.string().required(this.messages.this_item_must_be_selected), // 148 (regex)
                        countryOfCitizenship: yup.string().when('travelDocumentType', {
                            is: (value) => value >= 0,
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                        }),
                        passportNotedNationality: yup.string().when('countryOfCitizenship', {
                            is: (value) => {
                                return value == '97';
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                        }),
                    }),
                    // =============================== Passport details of applicant ===============================
                    personalDetails: yup.object().shape({
                        passportNumber: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 246 (maxlength 12)
                        passportNumberReEnter: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 247 (maxlength 12, regex)
                        lastNameOfPassport: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 248 (maxlength 50, regex)
                        firstNameOfPassport: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 249 (maxlength 50, regex)
                        gender: yup.string().required(this.messages.this_item_must_be_selected),
                        countryOfBirth: yup.string().required(this.messages.this_item_must_be_selected),
                        // Date of birth
                        dobYear: yup.number().required(this.messages.this_item_must_be_selected),
                        dobMonth: yup.number().required(this.messages.this_item_must_be_selected),
                        dobDay: yup.number().required(this.messages.this_item_must_be_selected),
                        cityTownOfBirth: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // (maxlength 50)
                        // Date of issue of passport
                        issueDateYear: yup.number().required(this.messages.this_item_must_be_selected),
                        issueDateMonth: yup.number().required(this.messages.this_item_must_be_selected),
                        issueDateDay: yup.number().required(this.messages.this_item_must_be_selected),
                        // Date of expiry of passport
                        expiryDateYear: yup.number().required(this.messages.this_item_must_be_selected),
                        expiryDateMonth: yup.number().required(this.messages.this_item_must_be_selected),
                        expiryDateDay: yup.number().required(this.messages.this_item_must_be_selected),
                        // ===============================

                        // =============================== Personal details of applicant ===============================
                        maritalStatus: yup.string().required(this.messages.please_be_sure_to_enter_this_item), // 284
                        hasPreviouslyAppliedToCanada: yup // 285
                            .string()
                            .required(this.messages.please_be_sure_to_enter_this_item),
                        uci: yup.string(),
                        uciReEnter: yup.string().oneOf([yup.ref('uci')], '値が一致する必要があります'),
                    }),
                    // ===============================

                    // =============================== Employment information ===============================
                    employmentDetails: yup.object().shape({
                        occupation: yup.string().when([], {
                            // 327
                            is: () => {
                                return state.checkAgeOfPersonalDetails > state.minAgeRequired;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        title: yup.string().when('occupation', {
                            // 361
                            is: (value) => {
                                return value && value != 10;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        companyEmployerSchoolFacilityName: yup.string().when('occupation', {
                            // 362
                            is: (value) => {
                                return value && value != 10;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        countryOfEmployment: yup.string().when('occupation', {
                            is: (value) => {
                                return value && value != 10;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        cityOfEmployment: yup.string().when('occupation', {
                            is: (value) => {
                                return value && value != 10;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        fromDateYear: yup.string().when('occupation', {
                            is: (value) => {
                                return value && value != 10;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                    }),
                    // ===============================

                    // =============================== Contact information ===============================
                    contactDetails: yup.object().shape({
                        emailAddressOfContactDetails: yup // 388 (regex)
                            .string()
                            .required(this.messages.please_be_sure_to_enter_this_item)
                            .email(this.messages.email_valid),
                        emailAddressReEnterOfContactDetails: yup // 389 (regex)
                            .string()
                            .required(this.messages.please_be_sure_to_enter_this_item)
                            .email(this.messages.email_valid)
                            .oneOf([yup.ref('emailAddressOfContactDetails')], '値が一致する必要があります'),
                        // =============================== Residential address ===============================
                        streetNo: yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        streetAddress: yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        cityOfContactDetails: yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                        countryOfContactDetails: yup.string().required(this.messages.this_item_must_be_selected),
                    }),
                    // ===============================

                    // =============================== Travel information ===============================
                    travelDetails: yup.object().shape({
                        isTravelDateKnown: yup.string().required(this.messages.this_item_must_be_selected),
                        // When do you plan to travel to Canada? // 465
                        travelDateYear: yup.string().when('isTravelDateKnown', {
                            is: (value) => {
                                return value && value == 0;
                            },
                            then: () => yup.number().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.number().optional(),
                        }),
                        travelDateMonth: yup.string().when('isTravelDateKnown', {
                            is: (value) => {
                                return value && value == 0;
                            },
                            then: () => yup.number().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.number().optional(),
                        }),
                        travelDateDay: yup.string().when('isTravelDateKnown', {
                            is: (value) => {
                                return value && value == 0;
                            },
                            then: () => yup.number().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.number().optional(),
                        }),

                        // 467
                        travelDateTimeHour: yup.string().when('isTravelDateKnown', {
                            is: (value) => {
                                return value && value == 0;
                            },
                            then: () => yup.number().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.number().optional(),
                        }),
                        travelDateTimeMinute: yup.string().when('isTravelDateKnown', {
                            is: (value) => {
                                return value && value == 0;
                            },
                            then: () => yup.number().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.number().optional(),
                        }),
                        travelDateTimeTimezone: yup
                            .string()
                            .default('79')
                            .when('isTravelDateKnown', {
                                is: (value) => {
                                    return value && value == 0;
                                },
                                then: () =>
                                    yup.string().default('79').required(this.messages.this_item_must_be_selected),
                                otherwise: () => yup.string().optional(),
                            }),
                    }),
                    // ===============================

                    // =============================== Background questions ===============================
                    backgroundQuestions: yup.object().shape({
                        refusedVisaOrPermitOrDeniedEntryToCanada: yup.string().when([], {
                            is: () => {
                                return state.checkAgeOfPersonalDetails > state.minAgeRequired;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        refusedVisaOrPermitOrDeniedEntryToCanadaDetails: yup
                            .string()
                            .when('refusedVisaOrPermitOrDeniedEntryToCanada', {
                                is: (value) => {
                                    return value && value == 0;
                                },
                                then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                                otherwise: () => yup.string().optional(),
                            }),
                        committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere: yup.string().when([], {
                            is: () => {
                                return state.checkAgeOfPersonalDetails > state.minAgeRequired;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails: yup
                            .string()
                            .when('committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere', {
                                is: (value) => {
                                    return value && value == 0;
                                },
                                then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                                otherwise: () => yup.string().optional(),
                            }),
                        inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis: yup.string().when([], {
                            is: () => {
                                return state.checkAgeOfPersonalDetails > state.minAgeRequired;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker: yup
                            .string()
                            .when('inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis', {
                                is: (value) => {
                                    return value && value == 0;
                                },
                                then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                                otherwise: () => yup.string().optional(),
                            }),
                        haveYouEverBeenDiagnosedWithTuberculosis: yup
                            .string()
                            .when('isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker', {
                                is: (value) => {
                                    return value && value == 0;
                                },
                                then: () => yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                                otherwise: () => yup.string().optional(),
                            }),
                        doYouHaveOneOfTheseConditions: yup.string().when([], {
                            is: () => {
                                return state.checkAgeOfPersonalDetails > state.minAgeRequired;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                    }),
                    // ===============================

                    // =============================== Privacy notice ===============================
                    consentAndDeclaration: yup.object().shape({
                        inAggreance: yup
                            .boolean()
                            .oneOf([true], this.messages.this_item_must_be_selected)
                            .required(this.messages.this_item_must_be_selected),
                        fullNameOfConsent: yup.string().required(this.messages.please_be_sure_to_enter_this_item),
                    }),
                    // ===============================
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
        minAgeRequired() {
            return 18;
        },
    },
    actions: {
        setMessages(messages) {
            this.messages = messages;
        },
        nextStep() {
            if (this.currentStep === 2) {
                this.submitForm();

                return;
            }
            this.currentStep++;
        },
        prevStep() {
            if (this.currentStep <= 0) {
                return;
            }
            this.currentStep--;
        },
        async submitForm() {
            const notificationStore = useNotificationStore();

            try {
                this.loading = true;
                const { data } = await axios.post(this.$route('eta_application.register'), this.formData);

                setTimeout(() => {
                    this.loading = false;
                }, 300);

                setTimeout(() => {
                    notificationStore.triggerNotify({
                        type: 'success',
                        message: data.message,
                    });
                }, 400);

                setTimeout(() => {
                    router.visit(this.$route('eta_application.index'));
                }, 6000);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === HttpStatusCode.UnprocessableEntity) {
                        this.errors = error.response.data.errors;
                    } else {
                        console.error(error);
                    }
                }
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 400);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEtaApplicationStore, import.meta.hot));
}
