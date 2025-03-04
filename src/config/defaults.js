// VAPI Agent Defaults

// export const VAPI_DEFAULTS = [
//     {
//         id: "phone-agent-appointment-scheduling",
//         name: "Sally",
//         voiceId: "56AoDkrOh6qfVPDXZ7Pt",
//         language: "en",
//         model: "gpt-4o",
//         includeDisclaimer: true,
//     },
//     {
//         id: "phone-agent-message-taking",
//         name: "John",
//         voiceId: "56AoDkrOh6qfVPDXZ7Pt",
//         language: "en",
//         model: "gpt-4o",
//         includeDisclaimer: true,
//     }
// ]


export const VAPI_AGENT_DEFAULTS = {
    name: "Sally",
    voiceId: "56AoDkrOh6qfVPDXZ7Pt",
    language: "en",
    model: "gpt-4o",
    includeDisclaimer: true,
    calendar: "cal.com",
    ambientSound: "off",
    boostedKeywords: "",
    eventTerm: "appointment",
    greeting: "Hello, this is [[AGENT_NAME]]. How can I help you today?",
    endCallOnSilence: 10,
    maxDuration: 10,
    calCom: {
        apiKey: "cal_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        eventId: 1234567,
    },
    businessInfo: {
        name: "Acme",
        timezone: -8,
        businessHours: {
            monday: { id: 'monday', value: 'monday', label: 'Monday', isOpen: true, open: '09:00', close: '17:00' },
            tuesday: { id: 'tuesday', value: 'tuesday', label: 'Tuesday', isOpen: true, open: '09:00', close: '17:00' },
            wednesday: { id: 'wednesday', value: 'wednesday', label: 'Wednesday', isOpen: true, open: '09:00', close: '17:00' },
            thursday: { id: 'thursday', value: 'thursday', label: 'Thursday', isOpen: true, open: '09:00', close: '17:00' },
            friday: { id: 'friday', value: 'friday', label: 'Friday', isOpen: true, open: '09:00', close: '17:00' },
            saturday: { id: 'saturday', value: 'saturday', label: 'Saturday', isOpen: false, open: '09:00', close: '17:00' },
            sunday: { id: 'sunday', value: 'sunday', label: 'Sunday', isOpen: false, open: '09:00', close: '17:00' },
        },
        description: "",
        website: "",
        location: "",
        phoneNumber: "",
        services: "",
        insuranceAccepted: "",
    },
};