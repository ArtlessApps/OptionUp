/**
 * Vercel Serverless Function: Signup with Welcome Email
 * Handles user signup and sends welcome email
 */

import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '../../src/lib/email/send-email.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: Request) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/auth/callback`,
        data: {
          name: name || email.split('@')[0],
        },
      },
    });

    if (error) {
      console.error('Signup error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (data.user) {
      // Send welcome email
      try {
        await sendWelcomeEmail({
          to: data.user.email!,
          userName: data.user.user_metadata?.name || data.user.email!.split('@')[0],
          dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL}/dashboard`,
        });
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        // Log email error but don't fail the signup
        console.error('Failed to send welcome email:', emailError);
        // Continue with successful signup response
      }

      return new Response(JSON.stringify({
        success: true,
        user: data.user,
        session: data.session,
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

