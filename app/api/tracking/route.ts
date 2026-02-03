import { NextResponse } from 'next/server';

// SIMPAN DATA INPUT (DUMMY STORAGE)
let customTrackingData: any = null;

export async function GET() {
  try {
    // 👉 JIKA SUDAH ADA DATA INPUT, PAKAI ITU
    if (customTrackingData) {
      return NextResponse.json(customTrackingData);
    }

    // 👉 DEFAULT: FETCH DUMMY API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!res.ok) {
      throw new Error('Failed to fetch dummy API');
    }

    const posts = await res.json();

    const statusList = [
      'Diajukan',
      'Diproses',
      'Menunggu Review',
      'Selesai'
    ];

    const timeline = posts.slice(0, 4).map((post: any, index: number) => ({
      status: statusList[index],
      date:
        index === 0
          ? '25 Januari 2026, 10:30 WIB'
          : index === 1
          ? '26 Januari 2026, 09:15 WIB'
          : index === 2
          ? 'Estimasi: 4 Februari 2026'
          : 'Estimasi: 11 Februari 2026',
      description: post.body
    }));

    return NextResponse.json({
      serviceNumber: 'SVC-2024-001234',
      serviceType: 'Pembuatan Website Kementerian',
      submissionDate: '25 Januari 2026',
      estimatedCompletion: '20 Februari 2026',
      currentStatus: 'Sedang Diproses',
      timeline
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal mengambil data tracking' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  customTrackingData = {
    serviceNumber: body.serviceNumber,
    serviceType: body.serviceType,
    submissionDate: body.submissionDate,
    estimatedCompletion: body.estimatedCompletion,
    currentStatus: body.currentStatus,
    timeline: [
      {
        status: body.currentStatus,
        date: new Date().toLocaleString('id-ID'),
        description: body.description
      }
    ]
  };

  return NextResponse.json({
    message: 'Data tracking berhasil disimpan',
    data: customTrackingData
  });
}
