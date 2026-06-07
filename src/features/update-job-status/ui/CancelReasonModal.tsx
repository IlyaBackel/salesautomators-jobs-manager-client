import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const CancelReasonModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Cancel Job" size="small">
      <div className="space-y-4">
        <Input
          label="Cancellation reason"
          placeholder="e.g., Customer changed mind, Wrong address..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm Cancellation</Button>
        </div>
      </div>
    </Modal>
  );
};