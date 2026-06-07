import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../shared/api/axios';
import { STATUSES } from '../../../shared/lib/constants';

interface StatusSelectProps {
  jobId: number;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export default function StatusSelect({ jobId, currentStatus, onStatusChange }: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === status) return;
    setLoading(true);
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
      setStatus(newStatus);
      onStatusChange(newStatus);
      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="border rounded px-2 py-1 text-sm"
    >
      {STATUSES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
};