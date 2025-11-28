import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
    try {
        const mongoose = await connectDB();
        const db = mongoose.connection.db;
        const { updates } = await request.json();

        // updates should be an array like:
        // [
        //   { id: "673e...", data: { squareMeters: 5000 } },
        //   { id: "673f...", data: { units: 100 } }
        // ]

        const results: Array<{ id: string; success: boolean; error?: string }> = [];

        for (const update of updates) {
            if (!ObjectId.isValid(update.id)) {
                results.push({ id: update.id, success: false, error: 'Invalid ID' });
                continue;
            }

            if (!db) {
                results.push({ id: update.id, success: false, error: 'Database connection error' });
                continue;
            }

            const result = await db.collection('projects').findOneAndUpdate(
                { _id: new ObjectId(update.id) },
                { $set: { ...update.data, updatedAt: new Date() } },
                { returnDocument: 'after' }
            );

            if (result) {
                results.push({ id: update.id, success: true });
            } else {
                results.push({ id: update.id, success: false, error: 'Project not found' });
            }
        }

        return NextResponse.json({
            success: true,
            results,
            updated: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length
        });
    } catch (error) {
        console.error('Bulk update error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to bulk update projects' },
            { status: 500 }
        );
    }
}