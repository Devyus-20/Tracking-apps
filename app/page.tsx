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

function dateToInputFormat(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TrackingPage() {
  const [serviceData, setServiceData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    serviceNumber: '',
    serviceType: '',
    submissionDate: ''
  });

  const generateServiceData = (formData: any) => {
    const submitDate = new Date(formData.submissionDate);
    const estimateFinish = addDays(submitDate, 7);

    return {
      serviceNumber: formData.serviceNumber,
      serviceType: formData.serviceType,
      submissionDate: formatDate(submitDate),
      submissionDateRaw: formData.submissionDate,
      estimatedCompletion: formatDate(estimateFinish),
      currentStatus: 'Sedang Diproses',
      timeline: [
        {
          status: 'Diajukan',
          date: formatDate(submitDate),
          description: 'Permohonan layanan telah diajukan oleh pengguna.',
          icon: '📝',
          color: 'from-blue-400 to-blue-600'
        },
        {
          status: 'Diproses',
          date: formatDate(addDays(submitDate, 1)),
          description: 'Tim mulai mengerjakan layanan.',
          icon: '⚙️',
          color: 'from-purple-400 to-purple-600'
        },
        {
          status: 'Menunggu Review',
          date: formatDate(addDays(submitDate, 4)),
          description: 'Hasil pekerjaan menunggu proses review.',
          icon: '👀',
          color: 'from-amber-400 to-amber-600'
        },
        {
          status: 'Selesai',
          date: formatDate(estimateFinish),
          description: 'Layanan selesai dan siap digunakan.',
          icon: '✅',
          color: 'from-emerald-400 to-emerald-600'
        }
      ]
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = generateServiceData(form);
    setServiceData(data);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setForm({
      serviceNumber: serviceData.serviceNumber,
      serviceType: serviceData.serviceType,
      submissionDate: serviceData.submissionDateRaw
    });
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus data layanan ini?')) {
      setServiceData(null);
      setForm({
        serviceNumber: '',
        serviceType: '',
        submissionDate: ''
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      serviceNumber: '',
      serviceType: '',
      submissionDate: ''
    });
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('selesai')) {
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50';
    }
    if (status.toLowerCase().includes('proses')) {
      return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/50';
    }
    return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header with Animation */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/50 transform hover:scale-110 transition duration-300">
              <span className="text-4xl">📦</span>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tracking Layanan
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Pantau progres layanan Anda secara real-time
          </p>
        </div>

        {/* Form Input with Gradient Border */}
        {(!serviceData || isEditing) && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{isEditing ? '✏️' : '📋'}</span>
                  </div>
                  <h2 className="font-bold text-2xl text-slate-800">
                    {isEditing ? 'Edit Data Layanan' : 'Input Data Layanan'}
                  </h2>
                </div>
                {isEditing && (
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition duration-200"
                  >
                    ✕ Batal
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group/input">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">🔢</span>
                    Nomor Layanan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: SRV-001"
                    className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition duration-200 font-medium"
                    value={form.serviceNumber}
                    onChange={(e) =>
                      setForm({ ...form, serviceNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="group/input">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">💼</span>
                    Jenis Layanan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pembuatan Website"
                    className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition duration-200 font-medium"
                    value={form.serviceType}
                    onChange={(e) =>
                      setForm({ ...form, serviceType: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="group/input">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    Tanggal Pengajuan
                  </label>
                  <input
                    type="date"
                    className="w-full border-2 border-slate-200 rounded-xl px-5 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition duration-200 font-medium"
                    value={form.submissionDate}
                    onChange={(e) =>
                      setForm({ ...form, submissionDate: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                >
                  {isEditing ? '🔄 Update Data' : '🚀 Simpan & Tampilkan Tracking'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Result */}
        {serviceData && !isEditing && (
          <>
            {/* Info Card with Gradient */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h2 className="font-bold text-2xl text-slate-800">
                      Informasi Layanan
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEdit}
                      className="group/btn px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2"
                    >
                      <span className="group-hover/btn:rotate-12 transition duration-200">✏️</span>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="group/btn px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2"
                    >
                      <span className="group-hover/btn:rotate-12 transition duration-200">🗑️</span>
                      Hapus
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
                    <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">Nomor Layanan</p>
                    <p className="text-2xl font-bold text-slate-800">{serviceData.serviceNumber}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                    <p className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wide">Jenis Layanan</p>
                    <p className="text-2xl font-bold text-slate-800">{serviceData.serviceType}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wide">Tanggal Pengajuan</p>
                    <p className="text-xl font-bold text-slate-800">{serviceData.submissionDate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-100">
                    <p className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wide">Estimasi Selesai</p>
                    <p className="text-xl font-bold text-slate-800">{serviceData.estimatedCompletion}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <span
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold ${getStatusColor(
                      serviceData.currentStatus
                    )} animate-pulse`}
                  >
                    <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
                    {serviceData.currentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline with Modern Design */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <h2 className="font-bold text-2xl text-slate-800">
                    Timeline Progres
                  </h2>
                </div>

                <div className="relative space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 rounded-full"></div>
                  
                  {serviceData.timeline.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="relative flex gap-6 group/item hover:scale-[1.02] transition duration-300"
                    >
                      {/* Icon Circle */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-xl transform group-hover/item:scale-110 group-hover/item:rotate-12 transition duration-300`}>
                        <span className="text-2xl filter drop-shadow-lg">{item.icon}</span>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-100 shadow-md group-hover/item:shadow-xl group-hover/item:border-slate-200 transition duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-xl text-slate-800">{item.status}</h3>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}