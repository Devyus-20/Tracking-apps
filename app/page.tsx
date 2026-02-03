'use client';

import { useState } from 'react';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

export default function TrackingPage() {
  const [serviceData, setServiceData] = useState<any>(null);

  const [form, setForm] = useState({
    serviceNumber: '',
    serviceType: '',
    submissionDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitDate = new Date(form.submissionDate);
    const estimateFinish = addDays(submitDate, 7);

    setServiceData({
      serviceNumber: form.serviceNumber,
      serviceType: form.serviceType,
      submissionDate: formatDate(submitDate),
      estimatedCompletion: formatDate(estimateFinish),
      currentStatus: 'Sedang Diproses',
      timeline: [
        {
          status: 'Diajukan',
          date: formatDate(submitDate),
          description: 'Permohonan layanan telah diajukan oleh pengguna.'
        },
        {
          status: 'Diproses',
          date: formatDate(addDays(submitDate, 1)),
          description: 'Tim mulai mengerjakan layanan.'
        },
        {
          status: 'Menunggu Review',
          date: formatDate(addDays(submitDate, 4)),
          description: 'Hasil pekerjaan menunggu proses review.'
        },
        {
          status: 'Selesai',
          date: formatDate(estimateFinish),
          description: 'Layanan selesai dan siap digunakan.'
        }
      ]
    });
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('selesai')) {
      return 'bg-emerald-100 text-emerald-700';
    }
    if (status.toLowerCase().includes('proses')) {
      return 'bg-blue-100 text-blue-700';
    }
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Tracking Layanan
          </h1>
          <p className="text-slate-600">
            Input data layanan dan pantau progresnya
          </p>
        </div>

        {/* Form Input */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            Input Data Layanan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nomor Layanan"
              className="w-full border rounded-xl px-4 py-2"
              onChange={(e) =>
                setForm({ ...form, serviceNumber: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Jenis Layanan"
              className="w-full border rounded-xl px-4 py-2"
              onChange={(e) =>
                setForm({ ...form, serviceType: e.target.value })
              }
              required
            />

            <input
              type="date"
              className="w-full border rounded-xl px-4 py-2"
              onChange={(e) =>
                setForm({ ...form, submissionDate: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700"
            >
              Simpan & Tampilkan Tracking
            </button>
          </form>
        </div>

        {/* Result */}
        {serviceData && (
          <>
            {/* Info */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Informasi Layanan
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p><b>Nomor:</b> {serviceData.serviceNumber}</p>
                <p><b>Jenis:</b> {serviceData.serviceType}</p>
                <p><b>Tanggal Pengajuan:</b> {serviceData.submissionDate}</p>
                <p><b>Estimasi Selesai:</b> {serviceData.estimatedCompletion}</p>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    serviceData.currentStatus
                  )}`}
                >
                  {serviceData.currentStatus}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Timeline Progres
              </h2>

              <div className="space-y-4">
                {serviceData.timeline.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50"
                  >
                    <div className="flex justify-between mb-1">
                      <h3 className="font-semibold">{item.status}</h3>
                      <span className="text-xs text-slate-500">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
