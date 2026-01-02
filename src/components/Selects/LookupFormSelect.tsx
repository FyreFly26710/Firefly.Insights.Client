import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Tooltip,
    Box
} from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface LookupFormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    options: { id: string | number; name: string; description?: string }[];
    isDisabled?: boolean;
    required?: string;
    placeholder?: string;
    onChangeSideEffect?: (value: string | number) => void;
}

export const LookupFormSelect = <T extends FieldValues>({
    name,
    control,
    label,
    options,
    isDisabled = false,
    required,
    placeholder = "Select an option",
    onChangeSideEffect
}: LookupFormSelectProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: required,
                // Validates that it's not empty string, 0, or null
                validate: required ? (val) => (val !== "" && val !== 0 && val !== null && val !== undefined) || required : undefined
            }}
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        {...field}
                        labelId={`${name}-label`}
                        label={label}
                        disabled={isDisabled}
                        value={field.value ?? ''}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const val = (rawValue !== "" && !isNaN(Number(rawValue)))
                                ? Number(rawValue)
                                : rawValue;

                            field.onChange(val);
                            if (onChangeSideEffect) onChangeSideEffect(val as string | number);
                        }}
                    >
                        <MenuItem value="">
                            <em>{placeholder}</em>
                        </MenuItem>

                        {options.map((opt) => (
                            <MenuItem key={opt.id} value={opt.id}>
                                {opt.description ? (
                                    <Tooltip title={opt.description} placement="right" arrow>
                                        <Box component="span" sx={{ width: '100%' }}>
                                            {opt.name}
                                        </Box>
                                    </Tooltip>
                                ) : (
                                    opt.name
                                )}
                            </MenuItem>
                        ))}
                    </Select>

                    {error && (
                        <FormHelperText sx={{ ml: 1.75 }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};