import { Chip } from "@mui/material"

interface StatusChipProps {
    value: boolean;
    trueLabel: string;
    falseLabel: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ value, trueLabel, falseLabel }) => {
    return (
        <Chip
            label={value ? trueLabel : falseLabel}
            color={value ? "success" : "default"}
            size="small"
            variant="outlined"
        />
    )
}