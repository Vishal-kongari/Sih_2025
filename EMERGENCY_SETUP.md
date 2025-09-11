# Emergency Contact System Setup Guide

## Overview
This guide explains how to set up real phone calling and SMS functionality for the emergency contact system in the mental health platform.

## Required Services

### 1. Twilio (Recommended)
- **Voice API**: For making emergency phone calls
- **SMS API**: For sending emergency text messages
- **Webhooks**: For tracking call/SMS status

### 2. Email Service
- **SendGrid**: For sending emergency email notifications
- **AWS SES**: Alternative email service
- **Nodemailer**: For custom SMTP setup

## Setup Instructions

### Step 1: Twilio Account Setup
1. Create a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the console
3. Purchase a phone number for making calls
4. Set up webhooks for call/SMS status updates

### Step 2: Environment Variables
Create a `.env` file in your project root:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
EMERGENCY_EMAIL=emergency@yourdomain.com

# Emergency Settings
EMERGENCY_RETRY_ATTEMPTS=3
EMERGENCY_CALL_TIMEOUT=30
```

### Step 3: Backend API Implementation

#### Emergency Call Endpoint (`/api/emergency-call`)
```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/emergency-call', async (req, res) => {
  try {
    const { to, studentName, contactType } = req.body;
    
    const call = await client.calls.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: `
        <Response>
          <Say voice="alice">
            URGENT: ${studentName} may be in distress and needs immediate attention. 
            This is an automated emergency alert from the mental health platform. 
            Please check on ${studentName} immediately.
          </Say>
          <Pause length="2"/>
          <Say voice="alice">
            If you cannot reach ${studentName}, please contact emergency services immediately.
          </Say>
        </Response>
      `
    });
    
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### Emergency SMS Endpoint (`/api/emergency-sms`)
```javascript
app.post('/api/emergency-sms', async (req, res) => {
  try {
    const { to, message } = req.body;
    
    const sms = await client.messages.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });
    
    res.json({ success: true, messageSid: sms.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### Emergency Email Endpoint (`/api/emergency-email`)
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/emergency-email', async (req, res) => {
  try {
    const { studentName, studentPhone, guardianPhone } = req.body;
    
    const msg = {
      to: process.env.EMERGENCY_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `URGENT: Mental Health Alert - ${studentName}`,
      html: `
        <h2>🚨 URGENT MENTAL HEALTH ALERT</h2>
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Student Phone:</strong> ${studentPhone || 'Not available'}</p>
        <p><strong>Guardian Phone:</strong> ${guardianPhone || 'Not available'}</p>
        <p>The system has detected concerning language that may indicate distress or crisis. Immediate attention is required.</p>
        <p>Please contact the student immediately and ensure their safety.</p>
        <p><em>This is an automated alert from the mental health platform.</em></p>
      `
    };
    
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Step 4: Webhook Handlers

#### Call Status Webhook
```javascript
app.post('/webhook/call-status', (req, res) => {
  const { CallSid, CallStatus } = req.body;
  console.log(`Call ${CallSid} status: ${CallStatus}`);
  
  // Update database with call status
  // Send notifications if call failed
  
  res.status(200).send('OK');
});
```

#### SMS Status Webhook
```javascript
app.post('/webhook/sms-status', (req, res) => {
  const { MessageSid, MessageStatus } = req.body;
  console.log(`SMS ${MessageSid} status: ${MessageStatus}`);
  
  // Update database with SMS status
  // Retry if SMS failed
  
  res.status(200).send('OK');
});
```

## Emergency Contact Priority

1. **Guardian Phone** (Highest Priority)
2. **Counselor Phone** (Secondary)
3. **Emergency Services** (Fallback)

## Testing

### Test Emergency Call
```javascript
// Test the emergency call system
const testEmergency = async () => {
  const response = await fetch('/api/emergency-call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: '+1234567890',
      studentName: 'Test Student',
      contactType: 'Guardian'
    })
  });
  
  const result = await response.json();
  console.log('Emergency call result:', result);
};
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on emergency endpoints
2. **Authentication**: Secure emergency endpoints with proper authentication
3. **Logging**: Log all emergency actions for audit purposes
4. **Data Privacy**: Ensure phone numbers are encrypted in storage
5. **Compliance**: Follow HIPAA and other relevant regulations

## Monitoring and Alerts

1. **Call Success Rate**: Monitor successful vs failed calls
2. **Response Time**: Track time from distress detection to contact
3. **System Health**: Monitor API availability and performance
4. **Emergency Logs**: Maintain detailed logs of all emergency actions

## Cost Considerations

- **Twilio Voice**: ~$0.02 per minute for calls
- **Twilio SMS**: ~$0.0075 per SMS
- **SendGrid**: Free tier includes 100 emails/day
- **Server Costs**: Minimal for API endpoints

## Fallback Options

1. **Multiple Providers**: Use backup SMS/voice providers
2. **Retry Logic**: Implement automatic retry for failed calls
3. **Escalation**: Escalate to emergency services if all contacts fail
4. **Manual Override**: Allow manual emergency contact triggering

## Legal and Compliance

1. **Consent**: Ensure users consent to emergency contact procedures
2. **Data Retention**: Follow data retention policies for emergency logs
3. **Privacy**: Implement proper data anonymization
4. **Reporting**: Maintain compliance reporting capabilities
