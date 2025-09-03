// app/api/remove-founding-member/route.ts
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

    // Update the user's public metadata in Clerk to remove founding member status
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        // Remove founding member fields
        role: null,
        joinedBeta: null,
        isFoundingMember: false
      }
    });

    return NextResponse.json(
      { success: true, message: 'Founding member status removed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing founding member status:', error);
    return NextResponse.json(
      { error: 'Failed to remove founding member status' },
      { status: 500 }
    );
  }
}