import { z } from 'zod';

export const jobFormSchema = z.object({
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
  startDate: z.string().min(1, 'Start date required').refine(date => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, { message: 'Start date cannot be in the past' }),
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
  techSelect: z.string().min(1, 'Technician required'),
});

export type JobFormData = z.infer<typeof jobFormSchema>;