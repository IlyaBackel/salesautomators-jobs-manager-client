import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../shared/ui/Input";
import type { JobFormData } from "../model/types";

interface LocationSectionProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
}

export default function LocationSection({ register, errors }: LocationSectionProps) {
    return (
        <div>
            <h3 className="font-bold text-lg mb-3">Service location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Address *" {...register('address')} error={errors.address?.message as string} />
                <Input label="City *" {...register('city')} error={errors.city?.message as string} />
                <Input label="State *" {...register('state')} error={errors.state?.message as string} />
                <Input label="Zip code *" {...register('zipCode')} error={errors.zipCode?.message as string} />
                <Input label="Area *" {...register('area')} error={errors.area?.message as string} />
            </div>
        </div>
    )
};  