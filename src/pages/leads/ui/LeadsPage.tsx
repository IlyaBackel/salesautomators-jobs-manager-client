import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLeads, type Lead } from '../../../shared/lib/mockLeads';
import { LeadCard } from '../../../entities/lead/ui/LeadCard';
import JobFormModal from '../../../features/create-job';

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateJob = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Leads</h1>
      <div className="flex flex-col gap-8">
        {mockLeads.map(lead => (
          <LeadCard key={lead.id} lead={lead} onCreateJob={handleCreateJob} />
        ))}
      </div>
      <JobFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => navigate('/jobs')}
        initialData={selectedLead ? {
          firstName: selectedLead.firstName,
          lastName: selectedLead.lastName,
          phone: selectedLead.phone,
          email: selectedLead.email || '',
          address: selectedLead.address,
          city: selectedLead.city,
        } : undefined}
      />
    </div>
  );
}