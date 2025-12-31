import { Box, Typography, Stack } from "@mui/material";

interface AdminPageHeaderProps {
    title: string;
    action?: React.ReactNode;
}

export const AdminPageHeader = ({ title, action }: AdminPageHeaderProps) => {
    return (
        <Stack id="admin-page-header"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
        >
            <Box>
                <Typography variant="h4" fontWeight={800} color="text.primary">
                    {title}
                </Typography>
            </Box>
            {action && (
                <Box>
                    {action}
                </Box>
            )}
        </Stack>
    );
};