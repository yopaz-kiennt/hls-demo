import { representativeRelationship } from '@/helper';
import { router } from '@inertiajs/vue3';
import { AxiosError, HttpStatusCode } from 'axios';
import { isAfter, parse } from 'date-fns';
import { acceptHMRUpdate, defineStore } from 'pinia';
import * as yup from 'yup';

export const useEtaApplicationStore = defineStore('eta_application', {
    state: () => ({
        messages: {},
        currentStep: 2,
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
                additionalCountriesOfCitizenship: [
                    {
                        value: 105,
                        label: 'Japan',
                    },
                ],
                maritalStatus: '',
                hasPreviouslyAppliedToCanada: '',
                uci: '',
                uciReEnter: '',
            },
            employmentDetails: {
                // checkAgeOfPersonalDetails (birthday) >= 18
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
                // checkAgeOfPersonalDetails (birthday) >= 18
                refusedVisaOrPermitOrDeniedEntryToCanada: '',
                refusedVisaOrPermitOrDeniedEntryToCanadaDetails: '',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere: '',
                committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails: '',
                inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis: '',
                isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker: '',
                haveYouEverBeenDiagnosedWithTuberculosis: '',
                doYouHaveOneOfTheseConditions: '',
                haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails: '',
            },
            consentAndDeclaration: {
                inAggreance: false,
                fullName: '',
            },
        },
        citizenshipOptions: [],
        loading: false,
        errors: {},
        occupations: {},
        jobTitles: {},
        selectedItem: null,
        isOpenModalDetails: false,
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
                'personalDetails.lastNameOfPassport': this.messages.surname_last_name,
                'personalDetails.firstNameOfPassport': this.messages.given_first_name,
                'personalDetails.lastName': this.messages.surname_last_name,
                'personalDetails.firstName': this.messages.given_first_name,
                'personalDetails.dobYear': this.messages.year_of_birth,
                'personalDetails.dobMonth': this.messages.month_of_birth,
                'personalDetails.dobDay': this.messages.day_of_birth,
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
                'contactDetails.streetAddressAlt': this.messages.street_address_or_name_line_2,
                'contactDetails.cityOfContactDetails': this.messages.city_or_town,
                'contactDetails.countryOfContactDetails': this.messages.country_or_territory,
                'contactDetails.city': this.messages.city_or_town,
                'contactDetails.country': this.messages.country_or_territory,
                'contactDetails.district': this.messages.district_or_region,
                'contactDetails.emailAddressOfContactDetails': this.messages.email_address,
                'contactDetails.emailAddressReEnterOfContactDetails': this.messages.email_address_re_enter,

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

                'consentAndDeclaration.inAggreance': this.messages.i_agree,
                'consentAndDeclaration.fullNameOfConsent': this.messages.signature_of_applicant,
            };
        },
        formSchema(state) {
            const conditionalPassportNotedNationality = (passportNotedNationality, schemaCallback) =>
                yup.string().when([], {
                    is: () => true,
                    then: (schema) => {
                        if (passportNotedNationality === '87') {
                            return schemaCallback();
                        }
                        return schema;
                    },
                });

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
                            then: () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    ),
                        }),
                        province: yup // 107
                            .string()
                            .when('representativeRelationship', {
                                is: (value) => {
                                    return [
                                        representativeRelationship.memberOfCollege,
                                        representativeRelationship.memberOfCanadian,
                                    ].includes(value);
                                },
                                then: () =>
                                    yup
                                        .string()
                                        .max(50, this.messages.max_length_50_characters)
                                        .required(this.messages.please_be_sure_to_enter_this_item)
                                        .matches(
                                            /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                            this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                        ),
                            }),
                        lastName: yup // 108
                            .string()
                            .max(50, this.messages.max_length_50_characters)
                            .test(
                                'no-hyphen-apostrophe-space-start',
                                this.messages.cannot_start_with_a_hyphen,
                                (value) => {
                                    return value ? !/^[\s'-]/.test(value) : true;
                                }
                            )
                            .test('english-french-characters', this.messages.english_french_characters, (value) =>
                                /^[A-Za-zÀ-ÿ]*$/.test(value || '')
                            )
                            .required(this.messages.please_be_sure_to_enter_this_item),
                        firstName: yup // 109
                            .string()
                            .max(50, this.messages.max_length_50_characters)
                            .test(
                                'no-hyphen-apostrophe-space-start',
                                this.messages.cannot_start_with_a_hyphen,
                                (value) => {
                                    return value ? !/^[\s'-]/.test(value) : true;
                                }
                            )
                            .test('english-french-characters', this.messages.english_french_characters, (value) =>
                                /^[A-Za-zÀ-ÿ]*$/.test(value || '')
                            )
                            .required(this.messages.please_be_sure_to_enter_this_item),
                        organizationName: yup // 110
                            .string()
                            .max(75, this.messages.max_length_75_characters)
                            .when('representativeRelationship', {
                                is: (value) => {
                                    return [
                                        representativeRelationship.memberOfNonGovernmental,
                                        representativeRelationship.memberOfCollege,
                                        representativeRelationship.memberOfCanadian,
                                        representativeRelationship.memberOfChampre,
                                        representativeRelationship.travelAgent,
                                    ].includes(value);
                                },
                                then: () =>
                                    yup
                                        .string()
                                        .required(this.messages.please_be_sure_to_enter_this_item)
                                        .matches(
                                            /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                            this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                        ),
                            }),
                        mailingAddress: yup
                            .string()
                            .max(200, this.messages.max_length_200_characters)
                            .required(this.messages.please_be_sure_to_enter_this_item)
                            .matches(
                                /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                            ),
                        postalCodeZip: yup // 112 (maxlength 30)
                            .string()
                            .max(30, this.messages.max_length_30_characters)
                            .when('representativeRelationship', {
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
                        phoneNumber: yup
                            .string()
                            .max(20, this.messages.max_length_20_characters)
                            .required(this.messages.please_be_sure_to_enter_this_item)
                            .matches(/^[0-9 ]*$/, this.messages.must_only_contain_numbers_and_spaces),
                        faxNumber: yup
                            .string()
                            .max(20, this.messages.max_length_20_characters)
                            .matches(/^[0-9 ]*$/, this.messages.must_only_contain_numbers_and_spaces),
                        emailAddress: yup
                            .string()
                            .max(100, this.messages.max_length_100_characters)
                            .email(this.messages.email_valid), // 115
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
                        passportNumber: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(12, this.messages.max_length_12_characters)
                                    .matches(/^[a-zA-Z0-9]*$/, this.messages.only_number_or_alphanumeric_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        passportNumberReEnter: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(12, this.messages.max_length_12_characters)
                                    .oneOf([yup.ref('passportNumber')], this.messages.the_passport_number_do_not_match)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        lastNameOfPassport: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .test(
                                        'no-hyphen-apostrophe-space-start',
                                        this.messages.cannot_start_with_a_hyphen,
                                        (value) => {
                                            return value ? !/^[\s'-]/.test(value) : true;
                                        }
                                    )
                                    .test(
                                        'english-french-characters',
                                        this.messages.english_french_characters,
                                        (value) => /^[A-Za-zÀ-ÿ]*$/.test(value || '')
                                    )
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        firstNameOfPassport: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .test(
                                        'no-hyphen-apostrophe-space-start',
                                        this.messages.cannot_start_with_a_hyphen,
                                        (value) => {
                                            return value ? !/^[\s'-]/.test(value) : true;
                                        }
                                    )
                                    .test(
                                        'english-french-characters',
                                        this.messages.english_french_characters,
                                        (value) => /^[A-Za-zÀ-ÿ]*$/.test(value || '')
                                    )
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        gender: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.this_item_must_be_selected)
                        ),
                        countryOfBirth: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.this_item_must_be_selected)
                        ),
                        // Date of birth
                        dobYear: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        dobMonth: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        dobDay: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        cityTownOfBirth: conditionalPassportNotedNationality(
                            // (maxlength 50)
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    )
                        ),
                        // Date of issue of passport
                        issueDateYear: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        issueDateMonth: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        issueDateDay: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        // Date of expiry of passport
                        expiryDateYear: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        expiryDateMonth: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        expiryDateDay: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.number().required(this.messages.this_item_must_be_selected)
                        ),
                        // ===============================

                        // =============================== Personal details of applicant ===============================
                        maritalStatus: conditionalPassportNotedNationality(
                            // 284
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        hasPreviouslyAppliedToCanada: conditionalPassportNotedNationality(
                            // 285
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                        uci: yup.string().max(20, this.messages.max_length_20_characters),
                        uciReEnter: yup
                            .string()
                            .max(20, this.messages.max_length_20_characters)
                            .oneOf([yup.ref('uci')], this.messages.values_must_match),
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
                            is: () => {
                                return state.jobTitles.length;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        companyEmployerSchoolFacilityName: yup.string().when('occupation', {
                            // 362
                            is: () => {
                                return state.jobTitles.length;
                            },
                            then: () =>
                                yup
                                    .string()
                                    .max(75, this.messages.max_length_75_characters)
                                    .required(this.messages.this_item_must_be_selected)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    ),
                            otherwise: () => yup.string().optional(),
                        }),
                        countryOfEmployment: yup.string().when('occupation', {
                            is: () => {
                                return state.jobTitles.length;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                        cityOfEmployment: yup.string().when('occupation', {
                            is: () => {
                                return state.jobTitles.length;
                            },
                            then: () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    ),
                            otherwise: () => yup.string().optional(),
                        }),
                        fromDateYear: yup.string().when('occupation', {
                            is: () => {
                                return state.jobTitles.length;
                            },
                            then: () => yup.string().required(this.messages.this_item_must_be_selected),
                            otherwise: () => yup.string().optional(),
                        }),
                    }),
                    // ===============================

                    // =============================== Contact information ===============================
                    contactDetails: yup.object().shape({
                        emailAddressOfContactDetails: conditionalPassportNotedNationality(
                            // 388
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(100, this.messages.max_length_100_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .email(this.messages.email_valid)
                        ),
                        emailAddressReEnterOfContactDetails: conditionalPassportNotedNationality(
                            // 389
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(100, this.messages.max_length_100_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .email(this.messages.email_valid)
                                    .oneOf([yup.ref('emailAddressOfContactDetails')], this.messages.values_must_match)
                        ),
                        // =============================== Residential address ===============================
                        aptUnit: yup
                            .string()
                            .max(10, this.messages.max_length_10_characters)
                            .matches(
                                /^[a-zA-Z0-9 ]*$/,
                                this.messages.must_only_contain_alphanumeric_characters_or_a_space
                            ),
                        streetNo: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(30, this.messages.max_length_30_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    )
                        ),
                        streetAddress: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(100, this.messages.max_length_100_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    )
                        ),
                        streetAddressAlt: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(100, this.messages.max_length_100_characters)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    )
                        ),
                        cityOfContactDetails: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(50, this.messages.max_length_50_characters)
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                                    .matches(
                                        /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                        this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                    )
                        ),
                        countryOfContactDetails: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.this_item_must_be_selected)
                        ),
                        district: yup
                            .string()
                            .max(50, this.messages.max_length_50_characters)
                            .matches(
                                /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                            ),
                    }),
                    // ===============================

                    // =============================== Travel information ===============================
                    travelDetails: yup.object().shape({
                        isTravelDateKnown: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () => yup.string().required(this.messages.this_item_must_be_selected)
                        ),
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
                                then: () =>
                                    yup
                                        .string()
                                        .required(this.messages.please_be_sure_to_enter_this_item)
                                        .matches(
                                            /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                            this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                        ),
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
                                then: () =>
                                    yup
                                        .string()
                                        .required(this.messages.please_be_sure_to_enter_this_item)
                                        .matches(
                                            /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                            this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                                        ),
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
                        haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails: yup
                            .string()
                            .matches(
                                /^[a-zA-Z0-9.,!?'"()\-:; ]*$/,
                                this.messages.must_only_contain_alphanumeric_characters_or_punctuation_marks
                            ),
                    }),
                    // ===============================

                    // =============================== Privacy notice ===============================
                    consentAndDeclaration: yup.object().shape({
                        inAggreance: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .boolean()
                                    .oneOf([true], this.messages.this_item_must_be_selected)
                                    .required(this.messages.this_item_must_be_selected)
                        ),
                        fullNameOfConsent: conditionalPassportNotedNationality(
                            state.formData.prerequisite.passportNotedNationality,
                            () =>
                                yup
                                    .string()
                                    .max(160, this.messages.max_length_160_characters)
                                    .test(
                                        'no-hyphen-apostrophe-space-start',
                                        this.messages.cannot_start_with_a_hyphen,
                                        (value) => {
                                            return value ? !/^[\s'-]/.test(value) : true;
                                        }
                                    )
                                    .test(
                                        'english-french-characters',
                                        this.messages.english_french_characters,
                                        (value) => /^[A-Za-zÀ-ÿ]*$/.test(value || '')
                                    )
                                    .required(this.messages.please_be_sure_to_enter_this_item)
                        ),
                    }),
                    // ===============================
                }),
            ];
            return schemas;
        },
        checkAgeOfPersonalDetails(state) {
            const { dobYear, dobMonth, dobDay } = state.formData.personalDetails;

            if (!dobYear || !dobMonth || !dobDay) return 0;

            const today = new Date();
            const dob = new Date(dobYear, dobMonth - 1, dobDay);
            let age = today.getFullYear() - dob.getFullYear();

            if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) {
                age--;
            }

            return age;
        },
        minAgeRequired() {
            return 18;
        },
        validateDatesOfPassport(state) {
            const { issueDateYear, issueDateMonth, issueDateDay, expiryDateYear, expiryDateMonth, expiryDateDay } =
                state.formData.personalDetails;
            const issue = parse(`${issueDateYear}-${issueDateMonth}-${issueDateDay}`, 'yyyy-MM-dd', new Date());
            const expiry = parse(`${expiryDateYear}-${expiryDateMonth}-${expiryDateDay}`, 'yyyy-MM-dd', new Date());

            if (isAfter(issue, expiry)) {
                return '発行日が有効期限前の日付である必要があります。';
            }

            return null;
        },
    },
    actions: {
        setMessages(messages) {
            this.messages = messages;
        },
        setOccupations(occupations) {
            this.occupations = occupations;
        },
        addCountriesOfCitizen(item) {
            this.formData.personalDetails.additionalCountriesOfCitizenship.push(item);
        },
        setOpenModalDetails(value) {
            this.isOpenModalDetails = value;
        },
        setSelectedItem(item) {
            this.selectedItem = item;
        },
        setLoading(value) {
            this.loading = value;
        },
        deleteCountryOfCitizen(value) {
            const index = this.formData.personalDetails.additionalCountriesOfCitizenship.findIndex(
                (item) => item.value === value
            );

            if (index !== -1) {
                this.formData.personalDetails.additionalCountriesOfCitizenship.splice(index, 1);
            }
        },
        getJobTitles() {
            const occupationId = this.occupations[this.formData.employmentDetails.occupation].id;
            const selectedOccupation = this.occupations.find((occupation) => occupation.id === occupationId);
            if (selectedOccupation) {
                this.jobTitles = selectedOccupation.job_titles;
            } else {
                this.jobTitles = [];
            }
        },
        nextStep() {
            if (this.formData.isRepresentative == 1 && this.currentStep == 0) {
                // Are you applying on behalf of someone? ==> no
                this.currentStep = 2;
                return;
            }

            if (this.currentStep === 2) {
                this.submitForm();

                return;
            }
            this.currentStep++;
        },
        prevStep() {
            if (this.formData.isRepresentative == 1 && this.currentStep == 2) {
                // Are you applying on behalf of someone? ==> no
                this.currentStep = 0;
                return;
            }

            if (this.currentStep <= 0) {
                return;
            }
            this.currentStep--;
        },
        async submitForm() {
            try {
                this.loading = true;
                const { data } = await axios.post(this.$route('eta_application.register'), this.formData);

                setTimeout(() => {
                    window.$toast({
                        type: 'success',
                        title: data.message,
                    });
                }, 400);

                setTimeout(() => {
                    router.visit(this.$route('eta_application.index'));
                }, 5100);
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
        async submitFormFake() {
            let fakeData = {
                isRepresentative: '0',
                isApplyingOnBehalfOfMinorChild: '0',
                representative: {
                    representativeRelationship: '0',
                    representativeCompensated: '0',
                    membershipIdNumber: '',
                    province: '',
                    lastName: 'abc',
                    firstName: 'abca',
                    organizationName: '',
                    mailingAddress: 'abca',
                    phoneNumber: '09012345678',
                    faxNumber: '',
                    emailAddress: '',
                    postalCodeZip: '',
                    declareContactAndInformationIsTruthy: true,
                    understandAndAccept: true,
                },
                prerequisite: {
                    travelDocumentType: '0',
                    countryOfCitizenship: '97',
                    passportNotedNationality: '87',
                },
                personalDetails: {
                    passportNumber: '1111',
                    passportNumberReEnter: '1111',
                    lastName: '1111',
                    firstName: '1111',
                    dobYear: 1997,
                    dobMonth: '09',
                    dobDay: '10',
                    gender: '0',
                    countryOfBirth: '107',
                    cityTownOfBirth: '1111',
                    issueDateYear: 2015,
                    issueDateMonth: '09',
                    issueDateDay: '08',
                    expiryDateYear: 2028,
                    expiryDateMonth: '03',
                    expiryDateDay: '03',
                    additionalCountriesOfCitizenship: [
                        {
                            value: 105,
                            label: 'Japan',
                        },
                    ],
                    maritalStatus: '0',
                    hasPreviouslyAppliedToCanada: '0',
                    uci: '2222',
                    uciReEnter: '2222',
                },
                employmentDetails: {
                    occupation: 0,
                    title: 0,
                    companyEmployerSchoolFacilityName: '1111',
                    country: '105',
                    city: '1111',
                    fromDateYear: 2016,
                },
                contactDetails: {
                    languageOfPreference: '0',
                    emailAddress: 'contact@gmail.com',
                    emailAddressReEnter: 'contact@gmail.com',
                    aptUnit: '',
                    streetNo: '1111',
                    streetAddress: '1111',
                    streetAddressAlt: '',
                    city: '1111',
                    country: '105',
                    district: '',
                },
                travelDetails: {
                    isTravelDateKnown: '1',
                    travelDateYear: '',
                    travelDateMonth: '',
                    travelDateDay: '',
                    travelDateTimeHour: '',
                    travelDateTimeMinute: '',
                    travelDateTimeTimezone: '79',
                },
                backgroundQuestions: {
                    refusedVisaOrPermitOrDeniedEntryToCanada: '1',
                    refusedVisaOrPermitOrDeniedEntryToCanadaDetails: '',
                    committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere: '1',
                    committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails: '',
                    inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis: '1',
                    isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker: '',
                    haveYouEverBeenDiagnosedWithTuberculosis: '',
                    doYouHaveOneOfTheseConditions: '0',
                    haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails: '',
                },
                consentAndDeclaration: {
                    inAggreance: true,
                    fullName: '1111',
                },
            };

            try {
                this.loading = true;
                const { data } = await axios.post(this.$route('eta_application.register'), fakeData);

                setTimeout(() => {
                    window.$toast({
                        type: 'success',
                        title: data.message,
                    });
                }, 400);

                setTimeout(() => {
                    router.visit(this.$route('eta_application.index'));
                }, 5100);
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
        async updateStatus(item, newStatus) {
            try {
                this.loading = true;

                await axios.post(this.$route('admin.eta_management.update_status', item.id), {
                    status: newStatus,
                });

                item.status = newStatus;

                window.$toast({
                    type: 'success',
                    title: this.messages.update_successful,
                });
            } catch (error) {
                window.$toast({
                    type: 'error',
                    title: this.messages.update_failed,
                    description: this.messages.an_error_occured_while_updating_your_status,
                });
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 200);
            }
        },
        async resendEmail(id) {
            try {
                this.loading = true;
                const { data } = await axios.post(this.$route('admin.eta_management.resend_email', id));

                setTimeout(() => {
                    window.$toast({
                        type: 'success',
                        title: data.message,
                    });
                }, 400);
            } catch (error) {
                window.$toast({
                    type: 'error',
                    title: this.messages.failed_to_send_mail,
                });
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
