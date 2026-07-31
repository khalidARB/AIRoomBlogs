import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Optional integration with WordPress REST API or newsletter service
    // e.g., send subscriber email to WP / Mailchimp / Resend / ConvertKit
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to AiRooms!',
      email,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
