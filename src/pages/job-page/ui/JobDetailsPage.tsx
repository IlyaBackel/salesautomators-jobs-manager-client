// src/pages/jobs/ui/JobDetailsPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../shared/api/axios';
import type { Job } from '../../../entities/job/model/types';
import StatusSelect from '../../../features/update-job-status';

export default function JobDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await api.get('/jobs');
                const found = data.find((j: Job) => j.id === Number(id));
                setJob(found || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const updateStatus = (newStatus: string) => {
        if (job) setJob({ ...job, status: newStatus });
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
    if (!job) return <div className="p-8 text-center text-red-500">Job not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
                <button
                    onClick={() => navigate('/jobs')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-medium transition"
                >
                    ← Back to Jobs
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Job Details</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-6">
                    <div className="text-base"><span className="font-semibold text-gray-700">First Name:</span> <span className="text-gray-900">{job.firstName}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Last Name:</span> <span className="text-gray-900">{job.lastName}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Phone:</span> <span className="text-gray-900">{job.phone}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{job.email || '—'}</span></div>
                    <div className="col-span-2 text-base"><span className="font-semibold text-gray-700">Job Type:</span> <span className="text-gray-900">{job.jobType}</span></div>
                    <div className="col-span-2 text-base"><span className="font-semibold text-gray-700">Source:</span> <span className="text-gray-900">{job.jobSource}</span></div>
                    <div className="col-span-2 text-base"><span className="font-semibold text-gray-700">Description:</span> <span className="text-gray-900">{job.jobDescription || '—'}</span></div>
                    <div className="col-span-2 text-base"><span className="font-semibold text-gray-700">Address:</span> <span className="text-gray-900">{job.address}, {job.city}, {job.state} {job.zipCode}, {job.area}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Start Date:</span> <span className="text-gray-900">{job.startDate}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Start Time:</span> <span className="text-gray-900">{job.startTime}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">End Time:</span> <span className="text-gray-900">{job.endTime}</span></div>
                    <div className="text-base"><span className="font-semibold text-gray-700">Technician:</span> <span className="text-gray-900">{job.techSelect}</span></div>
                    {job.cancellationReason && (
                        <div className="col-span-2 text-base"><span className="font-semibold text-gray-700">Cancellation Reason:</span> <span className="text-red-600">{job.cancellationReason}</span></div>
                    )}
                </div>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-700">Status:</span>
                    <StatusSelect jobId={job.id} currentStatus={job.status} onStatusChange={updateStatus} />
                </div>
            </div>
        </div>
    );
}