import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request) {
  try {
    console.log('Forgot password API called')
    console.log('Environment check:', {
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      hasSmtpHost: !!process.env.SMTP_HOST,
      hasSmtpUser: !!process.env.SMTP_USER,
      hasSmtpPass: !!process.env.SMTP_PASS,
    })
    
    await connectDB();
    
    const { email } = await request.json();
    console.log('Email received:', email)

    // Validate input
    if (!email) {
      console.log('No email provided')
      return NextResponse.json(
        { error: 'Please provide an email address' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', !!user)
    
    if (!user) {
      console.log('User not found, but returning success for security')
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, a 6-digit reset code has been sent.' },
        { status: 200 }
      );
    }

    // Generate 6-digit reset code (expires in 10 minutes)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 600000); // 10 minutes from now
    console.log('Generated reset code:', resetCode)

    // Save reset code to user
    user.passwordResetToken = resetCode;
    user.passwordResetExpires = resetCodeExpiry;
    await user.save();
    console.log('Reset code saved to user')

    // Send email with 6-digit code
    console.log('Sending email to:', user.email)
    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Password Reset Code - Archik Constructions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0; font-size: 24px;">Password Reset Code</h1>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello ${user.name},</p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">You requested a password reset for your Archik Constructions account.</p>
            
            <div style="text-align: center; margin: 40px 0; padding: 30px; background-color: #f8f9fa; border-radius: 8px; border: 2px dashed #007bff;">
              <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Your Reset Code</p>
              <div style="font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${resetCode}
              </div>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6;">Enter this code on the reset password page to create a new password.</p>
            <p style="color: #e74c3c; font-size: 14px; font-weight: bold;">⚠️ This code will expire in 10 minutes.</p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">If you didn't request this password reset, please ignore this email.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was sent from Archik Constructions website.<br>
              For security reasons, do not share this code with anyone.
            </p>
          </div>
        </div>
      `,
      text: `
Hello ${user.name},

You requested a password reset for your Archik Constructions account.

Your 6-digit reset code is: ${resetCode}

Enter this code on the reset password page to create a new password.

This code will expire in 10 minutes.

If you didn't request this password reset, please ignore this email.
      `
    });

    console.log('Email send result:', emailResult)
    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
      // For development/testing, we'll still save the code and return success
      // but log the code to console
      console.log('DEVELOPMENT: Reset code for', user.email, 'is:', resetCode);
      
      // In development, don't fail the request if email fails
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Allowing reset code despite email failure');
        return NextResponse.json(
          { 
            message: 'If an account with that email exists, a 6-digit reset code has been sent.',
            // Include code in development mode
            ...(process.env.NODE_ENV === 'development' && { resetCode })
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to send reset code. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Reset code sent successfully')
    return NextResponse.json(
      { message: 'If an account with that email exists, a 6-digit reset code has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}