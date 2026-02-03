'use client';

import { useState } from 'react';

export default function TrackingInputPage() {
  const [form, setForm] = useState({
    serviceNumber: '',
    serviceType: '',
    submissionDate: '',
    estimatedCompletion: '',
    currentStatus: 'Diajukan',
    description: ''
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('Data tracking berhasil diinput');
    } else {
      alert('Gagal menyimpan data');
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: '0 auto' }}>
      <h2>📥 Input Tracking Layanan</h2>

      <form onSubmit={handleSubmit}>
        <input name="serviceNumber" placeholder="Nomor Layanan" onChange={handleChange} required />
        <input name="serviceType" placeholder="Jenis Layanan" onChange={handleChange} required />
        <input name="submissionDate" placeholder="Tanggal Pengajuan" onChange={handleChange} required />
        <input name="estimatedCompletion" placeholder="Estimasi Selesai" onChange={handleChange} required />

        <select name="currentStatus" onChange={handleChange}>
          <option>Diajukan</option>
          <option>Diproses</option>
          <option>Menunggu Review</option>
          <option>Selesai</option>
        </select>

        <textarea
          name="description"
          placeholder="Deskripsi Progres"
          onChange={handleChange}
          required
        />

        <button type="submit">Simpan Tracking</button>
      </form>

      <style jsx>{`
        input, select, textarea {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
        }
        button {
          margin-top: 15px;
          padding: 10px;
          width: 100%;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
