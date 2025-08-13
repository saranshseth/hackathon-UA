import { NextRequest, NextResponse } from 'next/server';
import { mockTrips } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trip = mockTrips.find(t => t.id === params.id);
    
    if (!trip) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ trip });
    
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // In a real application, this would update the trip in a database
    console.log('Updating trip:', params.id, body);
    
    return NextResponse.json(
      { message: 'Trip updated successfully' }
    );
    
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, this would delete the trip from a database
    console.log('Deleting trip:', params.id);
    
    return NextResponse.json(
      { message: 'Trip deleted successfully' }
    );
    
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}