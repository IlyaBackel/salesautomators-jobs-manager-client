import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { api } from '../../../shared/api/axios';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { JOB_TYPES, JOB_SOURCES, TECHNICIANS } from '../../../shared/lib/constants';
import { Modal } from '../../../shared/ui/Modal';

const schema = z.object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  phone: z.string().min(1, 'Phone required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  jobType: z.string().min(1, 'Job type required'),
  jobSource: z.string().min(1, 'Source required'),
  jobDescription: z.string().optional(),
  address: z.string().min(1, 'Address required'),
  city: z.string().min(1, 'City required'),
  state: z.string().min(1, 'State required'),
  zipCode: z.string().min(1, 'Zip code required'),
  area: z.string().min(1, 'Area required'),
  startDate: z.string().min(1, 'Start date required'),
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
  techSelect: z.string().min(1, 'Technician required'),
});

type FormData = z.infer<typeof schema>;

interface JobFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JobFormModal({ open, onClose, onSuccess }: JobFormModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
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

  return (
    <Modal open={open} onClose={onClose} title="Create New Job">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Client details */}
        <h3 className="font-bold text-lg mb-2">Client details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name *" {...register('firstName')} error={errors.firstName?.message} />
          <Input label="Last name *" {...register('lastName')} error={errors.lastName?.message} />
          <Input label="Phone *" {...register('phone')} error={errors.phone?.message} />
          <Input label="Email (optional)" {...register('email')} error={errors.email?.message} />
        </div>

        {/* Job details */}
        <h3 className="font-bold text-lg mb-2 mt-4">Job details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Job type *" options={JOB_TYPES.map(t => ({ value: t, label: t }))} {...register('jobType')} error={errors.jobType?.message} />
          <Select label="Job source *" options={JOB_SOURCES.map(s => ({ value: s, label: s }))} {...register('jobSource')} error={errors.jobSource?.message} />
          <div className="col-span-2">
            <Input label="Description (optional)" {...register('jobDescription')} />
          </div>
        </div>

        {/* Service location */}
        <h3 className="font-bold text-lg mb-2 mt-4">Service location</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Address *" {...register('address')} error={errors.address?.message} />
          <Input label="City *" {...register('city')} error={errors.city?.message} />
          <Input label="State *" {...register('state')} error={errors.state?.message} />
          <Input label="Zip code *" {...register('zipCode')} error={errors.zipCode?.message} />
          <Input label="Area *" {...register('area')} error={errors.area?.message} />
        </div>

        {/* Scheduled */}
        <h3 className="font-bold text-lg mb-2 mt-4">Scheduled</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Start date *" {...register('startDate')} error={errors.startDate?.message} />
          <Input type="time" label="Start time *" {...register('startTime')} error={errors.startTime?.message} />
          <Input type="time" label="End time *" {...register('endTime')} error={errors.endTime?.message} />
          <Select label="Technician *" options={TECHNICIANS.map(t => ({ value: t, label: t }))} {...register('techSelect')} error={errors.techSelect?.message} />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" loading={isSubmitting}>Create Job</Button>
        </div>
      </form>
    </Modal>
  );
};