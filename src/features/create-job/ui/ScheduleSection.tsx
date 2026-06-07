import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { TECHNICIANS } from "../../../shared/lib/constants";
import type { JobFormData } from "../model/types";

interface ScheduleSectionProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
}

export default function ScheduleSection({ register, errors }: ScheduleSectionProps) {
    return (
        <div>
            <h3 className="font-bold text-lg mb-3">Scheduled</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="date" label="Start date *" {...register('startDate')} error={errors.startDate?.message as string} />
                <Input type="time" label="Start time *" {...register('startTime')} error={errors.startTime?.message as string} />
                <Input type="time" label="End time *" {...register('endTime')} error={errors.endTime?.message as string} />
                <Select
                    label="Technician *"
                    options={TECHNICIANS.map(t => ({ value: t, label: t }))}
                    {...register('techSelect')}
                    error={errors.techSelect?.message as string}
                />
            </div>
        </div>
    )
};