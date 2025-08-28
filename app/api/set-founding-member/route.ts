// app/api/set-founding-member/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Update the user's public metadata in Clerk
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        role: 'Founding Member',
        joinedBeta: new Date().toISOString(),
        isFoundingMember: true
      }
    });

    return NextResponse.json(
      { success: true, message: 'Founding member status added' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error setting founding member status:', error);
    return NextResponse.json(
      { error: 'Failed to set founding member status' },
      { status: 500 }
    );
  }
}