import dotenv from 'dotenv';
dotenv.config();

export const config = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER
  },
  port: process.env.PORT || 3000
}; 