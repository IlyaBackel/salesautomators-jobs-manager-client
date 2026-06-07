import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { api } from '../../../shared/api/axios';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';
import { jobFormSchema, type JobFormData } from '../model/types';
import ClientSection from './ClientSection';
import JobDetailsSection from './JobDetailsSection';
import LocationSection from './LocationSection';
import ScheduleSection from './ScheduleSection';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<JobFormData>;
}

export default function JobFormModal({ open, onClose, onSuccess, initialData }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: JobFormData) => {
    try {
      await api.post('/jobs', data);
      toast.success('Job created successfully!');
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create job');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Job" size="large">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <ClientSection register={register} errors={errors} />
        <JobDetailsSection register={register} errors={errors} />
        <LocationSection register={register} errors={errors} />
        <ScheduleSection register={register} errors={errors} />
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="secondary" onClick={handleClose} type="button" className="px-6 py-3 text-base">Cancel</Button>
          <Button type="submit" loading={isSubmitting} className="px-6 py-3 text-base">Create Job</Button>
        </div>
      </form>
    </Modal>
  );
};