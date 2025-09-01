import { corsHeaders } from '../_shared/cors.ts';

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { to, subject, message, senderName, senderEmail, senderPhone }: EmailRequest = await req.json();

    // In a real implementation, you would use a service like SendGrid, Mailgun, or AWS SES
    // For now, we'll simulate email sending and log the details
    console.log('Email would be sent with the following details:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('From:', senderName, '<' + senderEmail + '>');
    console.log('Phone:', senderPhone);
    console.log('Message:', message);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send email' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});