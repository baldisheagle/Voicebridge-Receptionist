// Retell API


// Import phone number using Retell's Import Phone Number API
export const importRetellPhoneNumber = async (phoneNumber, terminationUri, nickname) => {
    console.log('Importing Phone Number');
    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/importRetellPhoneNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            phoneNumber: phoneNumber, 
            terminationUri: terminationUri, 
            nickname: nickname 
        })
    }).catch(err => {
        console.error('Error importing phone number', err);
        return false;
    });

    if (res.status !== 200) {
        return false;
    } else {
        return true;
    }
}

// Delete phone number using Retell's Delete Phone Number API
export const deleteRetellPhoneNumber = async (number) => {
    console.log('Deleting Phone Number');
    try {
        
        let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/deleteRetellPhoneNumber', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                phoneNumber: number
            })
        })

        if (res.status !== 200) {
            return false;
        } else {
            return true;
        }
        
    } catch (error) {
        console.error('Error deleting phone number', error);
        return false;
    }
}

// Buy phone number using Retell's Create Phone Number API
export const buyRetellPhoneNumber = async (areaCode, nickname) => {
    console.log('Buying Phone Number', areaCode, nickname);
    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/buyRetellPhoneNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            areaCode: areaCode,
            nickname: nickname
        })
    }).catch(err => {
        console.error('Error buying phone number', err);
        return false;
    });

    if (res.status !== 200) {
        console.log('buy phone number error', res);
        return false;
    } else {
        let data = await res.json();
        console.log('buy phone number', data);
        return data;
    }
}

// Create Business Info from businessInfo object
const createBusinessInfo = (businessInfo) => {
    let knowledge = '';
    if (businessInfo.name && businessInfo.name !== '') {
        knowledge += `Business Name: ${businessInfo.name}\n`;
    }
    if (businessInfo.location && businessInfo.location !== '') {
        knowledge += `Business Location: ${businessInfo.location}\n`;
    }
    if (businessInfo.phoneNumber && businessInfo.phoneNumber !== '') {
        knowledge += `Business Phone Number: ${businessInfo.phoneNumber}\n`;
    }
    if (businessInfo.email && businessInfo.email !== '') {
        knowledge += `Business Email: ${businessInfo.email}\n`;
    }
    if (businessInfo.businessHours && businessInfo.businessHours !== '') {
        const hours = businessInfo.businessHours;
        let hoursText = 'Business Hours:\n';
        Object.values(hours).forEach(day => {
            if (day.isOpen) {
                // Convert 24h times to 12h format
                const openTime = new Date(`2000-01-01T${day.open}`).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                });
                const closeTime = new Date(`2000-01-01T${day.close}`).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                });
                hoursText += `Open on ${day.label}s between ${openTime} and ${closeTime}\n`;
            } else {
                hoursText += `Closed on ${day.label}s\n`;
            }
        });
        knowledge += hoursText;
    }
    if (businessInfo.description && businessInfo.description !== '') {
        knowledge += `About the business: ${businessInfo.description}\n`;
    }
    if (businessInfo.website && businessInfo.website !== '') {
        knowledge += `Business Website: ${businessInfo.website}\n`;
    }
    if (businessInfo.services && businessInfo.services !== '') {
        knowledge += `Services offered: ${businessInfo.services}\n`;
    }
    if (businessInfo.email && businessInfo.email !== '') {
        knowledge += `Business Email: ${businessInfo.email}\n`;
    }
    if (businessInfo.insuranceAccepted && businessInfo.insuranceAccepted !== '') {
        knowledge += `Insurance accepted: ${businessInfo.insuranceAccepted}\n`;
    }
    if (knowledge === '') {
        return null;
    } else {
        return knowledge;
    }
}

// Create Retell Agent
export const createRetellAgent = async (agent) => {
    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/createRetellAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            retellAgentCode: agent.retellAgentCode,
            template: agent.template,
            agentId: agent.id,
            agentName: agent.agentName,
            businessName: agent.businessInfo.name,
            businessInfo: createBusinessInfo(agent.businessInfo),
            model: agent.model,
            voiceId: agent.voiceId,
            language: agent.language,
            includeDisclaimer: agent.includeDisclaimer
        })
    }).catch(err => {
        console.error('Error creating Retell Agent', err);
        return false;
    });

    if (res.status !== 200) {
        return false;
    } else {
        return true;
    }
}


// Delete Retell Agent
export const deleteRetellAgent = async (retellLlmId, retellAgentId) => {

    // Call function to delete agent on Retell
    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/deleteRetellAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            retellLlmId: retellLlmId, 
            retellAgentId: retellAgentId 
        })
    }).catch(err => {
        console.error('Error deleting Retell Agent', err);
        return false;
    });

    if (res.status !== 200) {
        return false;
    } else {
        return true;
    }
}

// Update Retell LLM and Agent
export const updateRetellLlmAndAgent = async (agent) => {
    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/updateRetellLlmAndAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            retellAgentId: agent.retellAgentId,
            retellLlmId: agent.retellLlmId,
            retellAgentCode: agent.retellAgentCode,
            template: agent.template,
            agentId: agent.id,
            agentName: agent.agentName,
            businessName: agent.businessInfo.name,
            businessInfo: createBusinessInfo(agent.businessInfo),
            model: agent.model,
            voiceId: agent.voiceId,
            language: agent.language,
            includeDisclaimer: agent.includeDisclaimer
        })
    }).catch(err => {
        console.error('Error updating Retell LLM and Agent', err);
        return false;
    });

    if (res.status !== 200) {
        return false;
    } else {
        return true;
    }
}

// Connect Phone Number to Retell Agent
export const connectRetellPhoneNumberToAgent = async (retellAgentId, phoneNumber) => {

    let res = await fetch('http://127.0.0.1:5001/voicebridge-app/us-central1/connectRetellPhoneNumberToAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            retellAgentId: retellAgentId, 
            phoneNumber: phoneNumber 
        })
    }).catch(err => {
        console.error('Error connecting phone number to Retell Agent', err);
        return false;
    });

    if (res.status !== 200) {
        return false;
    } else {
        return true;
    }
    
}