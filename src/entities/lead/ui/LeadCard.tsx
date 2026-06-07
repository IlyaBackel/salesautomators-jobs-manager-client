import type { Lead } from '../../../shared/lib/mockLeads';
import { Button } from '../../../shared/ui/Button';

interface Props {
  lead: Lead;
  onCreateJob: (lead: Lead) => void;
}

export const LeadCard: React.FC<Props> = ({ lead, onCreateJob }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{lead.firstName} {lead.lastName}</h3>
      <p className="text-gray-700 mb-1"><span className="font-medium">Phone:</span> {lead.phone}</p>
      {lead.email && <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> {lead.email}</p>}
      <p className="text-gray-700 mb-1"><span className="font-medium">Address:</span> {lead.address}, {lead.city}</p>
      <p className="text-gray-700 mb-3"><span className="font-medium">Problem:</span> {lead.problem}</p>
      <div className="flex justify-end">
        <Button onClick={() => onCreateJob(lead)}>Create Job</Button>
      </div>
    </div>
  );
};