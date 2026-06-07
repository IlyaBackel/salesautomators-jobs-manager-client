import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/axios';
import { Button } from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../../../entities/job/model/types';
import StatusSelect from '../../../features/update-job-status';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, []);

  const updateJobStatus = (id: number, newStatus: string) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button variant="secondary" onClick={() => navigate('/leads')}>Back to Leads</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found. Create one from leads.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-bold">{job.firstName} {job.lastName}</h3>
                  <p className="text-sm text-gray-600">Phone: {job.phone}</p>
                  <p className="text-sm text-gray-600">Job: {job.jobType} | {job.address}, {job.city}</p>
                  <p className="text-sm text-gray-600">Scheduled: {job.startDate} {job.startTime} - {job.endTime}</p>
                  {job.cancellationReason && <p className="text-sm text-red-500">Reason: {job.cancellationReason}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <StatusSelect jobId={job.id} currentStatus={job.status} onStatusChange={(newStatus) => updateJobStatus(job.id, newStatus)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}