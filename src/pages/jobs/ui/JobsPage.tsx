import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../shared/api/axios';
import type { Job } from '../../../entities/job/model/types';

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

  if (loading) return <div className="p-8 text-center text-gray-500 text-lg">Loading jobs...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
      </div>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No jobs yet. Create one from leads.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {jobs.map(job => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl cursor-pointer transition-all duration-200"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.firstName} {job.lastName}
                  </h3>
                  <p className="text-lg text-gray-700 mb-1"><span className="font-semibold">Job Type:</span> {job.jobType}</p>
                  <p className="text-lg text-gray-700 mb-1"><span className="font-semibold">Address:</span> {job.address}, {job.city}</p>
                  <p className="text-lg text-gray-700 mb-1"><span className="font-semibold">Date:</span> {job.startDate}</p>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-base font-medium rounded-full">
                    Status: {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}