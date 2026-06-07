import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import JobFormModal from '../../../features/create-job';

export default function LeadsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <div className="border rounded-lg p-4 shadow-sm mb-4">
        <h2 className="text-xl font-semibold">Test Lead: Alex Johnson</h2>
        <p className="text-gray-600">Phone: +1 234 567 8900</p>
        <p className="text-gray-600">Problem: Leaking pipe in kitchen</p>
        <Button className="mt-2" onClick={() => setModalOpen(true)}>Create Job</Button>
      </div>
      <Button variant="secondary" onClick={() => navigate('/jobs')}>View All Jobs</Button>
      <JobFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => navigate('/jobs')} />
    </div>
  );
}