import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../shared/api/axios';
import { STATUSES } from '../../../shared/lib/constants';
import { CancelReasonModal } from './CancelReasonModal';

interface Props {
  jobId: number;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export default function StatusSelect({ jobId, currentStatus, onStatusChange }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === status) return;

    if (newStatus === 'Cancelled') {
      setPendingStatus(newStatus);
      setShowCancelModal(true);
      return;
    }

    await updateStatus(newStatus);
  };

  const updateStatus = async (newStatus: string, reason?: string) => {
    setLoading(true);
    try {
      const payload: { status: string; cancellationReason?: string } = { status: newStatus };
      if (reason) payload.cancellationReason = reason;
      await api.patch(`/jobs/${jobId}/status`, payload);
      setStatus(newStatus);
      onStatusChange(newStatus);
      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = (reason: string) => {
    if (pendingStatus) {
      updateStatus(pendingStatus, reason);
      setPendingStatus(null);
    }
  };

  return (
    <>
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className="border rounded px-3 py-2 text-base"
      >
        {STATUSES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <CancelReasonModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
};