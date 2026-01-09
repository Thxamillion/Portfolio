import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const bucket = process.env.PORTFOLIO_BUCKET;

  // Local development: serve from public folder
  if (!bucket) {
    const filePath = path.join(process.cwd(), 'public', 'Quin_Ortiz_Resume.pdf');
    try {
      const file = fs.readFileSync(filePath);
      return new NextResponse(file, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Quin_Ortiz_Resume.pdf"',
        },
      });
    } catch {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
  }

  // Production: fetch from S3
  try {
    const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: 'resume.pdf',
    });

    const response = await s3Client.send(command);
    const body = await response.Body?.transformToByteArray();

    if (!body) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return new NextResponse(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Quin_Ortiz_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error fetching resume from S3:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
