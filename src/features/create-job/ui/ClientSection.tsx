import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../shared/ui/Input";
import type { JobFormData } from "../model/types";

interface ClientSectionProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
}

export default function ClientSection({ register, errors }: ClientSectionProps) {
    return (
        <div>
            <h3 className="font-bold text-lg mb-3">Client details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First name *" {...register('firstName')} error={errors.firstName?.message as string} />
                <Input label="Last name *" {...register('lastName')} error={errors.lastName?.message as string} />
                <Input label="Phone *" {...register('phone')} error={errors.phone?.message as string} />
                <Input label="Email (optional)" {...register('email')} error={errors.email?.message as string} />
            </div>
        </div>
    )
};