import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Select } from "../../../shared/ui/Select";
import { JOB_SOURCES, JOB_TYPES } from "../../../shared/lib/constants";
import { Input } from "../../../shared/ui/Input";
import type { JobFormData } from "../model/types";

interface JobDetailsSectionProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
}

export default function JobDetailsSection({ register, errors }: JobDetailsSectionProps) {
    return (
        <div>
            <h3 className="font-bold text-lg mb-3">Job details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Job type *"
                    options={JOB_TYPES.map(t => ({ value: t, label: t }))}
                    {...register('jobType')}
                    error={errors.jobType?.message as string}
                />
                <Select
                    label="Job source *"
                    options={JOB_SOURCES.map(s => ({ value: s, label: s }))}
                    {...register('jobSource')}
                    error={errors.jobSource?.message as string}
                />
                <div className="col-span-2">
                    <Input label="Description (optional)" {...register('jobDescription')} />
                </div>
            </div>
        </div>
    )
};  