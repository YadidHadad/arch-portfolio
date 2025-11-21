import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ObjectId } from 'mongodb';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // AWAIT params here
    console.log('🔍 GET single project - ID:', id);

    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;

        if (!ObjectId.isValid(id)) {
            console.log('❌ Invalid ObjectId format');
            return NextResponse.json(
                { success: false, error: 'Invalid project ID format' },
                { status: 400 }
            );
        }


        if (!db) {
            throw new Error('Database connection not established');
        }

        // Increment view count
        const project = await db.collection('projects').findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $inc: { views: 1 },
                $set: { lastViewed: new Date() }
            },
            { returnDocument: 'after' }
        );

        if (!project) {
            console.log('❌ Project not found');
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        console.log('✅ Project found:', project.title);
        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        console.error('❌ Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // AWAIT params here
    console.log('✏️ PUT request - ID:', id);

    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;
        const body = await request.json();

        console.log('Update data:', body);

        if (!ObjectId.isValid(id)) {
            console.log('❌ Invalid ObjectId format');
            return NextResponse.json(
                { success: false, error: 'Invalid project ID format' },
                { status: 400 }
            );
        }

        if (!db) {
            throw new Error('Database connection not established');
        }

        const result = await db.collection('projects').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { ...body, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        if (!result) {
            console.log('❌ Project not found');
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        console.log('✅ Project updated');
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('❌ Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // AWAIT params here

    console.log('🗑️ DELETE REQUEST');
    console.log('ID received:', id);
    console.log('ID length:', id.length);

    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;

        if (!ObjectId.isValid(id)) {
            console.log('❌ Invalid ObjectId format');
            return NextResponse.json(
                { success: false, error: 'Invalid project ID format' },
                { status: 400 }
            );
        }

        console.log('Attempting to delete...');

        if (!db) {
            throw new Error('Database connection not established');
        }
        const result = await db.collection('projects').deleteOne({
            _id: new ObjectId(id)
        });

        console.log('Delete result:', result);
        console.log('Deleted count:', result.deletedCount);

        if (result.deletedCount === 0) {
            console.log('❌ No project found with this ID');
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        console.log('✅ Project deleted successfully!');
        return NextResponse.json({ success: true, message: 'Project deleted' });

    } catch (error) {
        console.error('❌ Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}