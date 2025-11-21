import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET(request: Request) {
    console.log('🔥 Projects endpoint called');

    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;

        // Get URL params for limit
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('most-viewed') || '0');
        console.log('🔥 Parsed limit parameter:', limit);
        if (!db) {
            throw new Error('Database connection not established');
        }


        if (limit == 0) {
            console.log('✅ Fetching all projects');

            const projects = await db.collection('projects').find({}).toArray();

            return NextResponse.json({ success: true, data: projects });
        }
        console.log(`✅ Fetching top ${limit} most viewed projects`);
        const mostViewed = await db.collection('projects')
            .find({})
            .sort({ views: -1 })
            .limit(limit)
            .toArray();

        console.log('✅ Found most viewed projects:', mostViewed.length);


        return NextResponse.json({ success: true, data: mostViewed });




    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;
        const body = await request.json();

        if (!db) {
            throw new Error('Database connection not established');
        }

        const result = await db.collection('projects').insertOne({
            ...body,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}