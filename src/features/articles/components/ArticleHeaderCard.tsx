import Flex from '@/components/Elements/Flex/Flex';
import { Card, CardContent, Typography, Chip, Avatar, Stack } from '@mui/material';

type ArticleHeaderCardProps = {
    title: string;
    description: string;
    userName: string;
    tags: string[];
    userAvatar: string;
};

export const ArticleHeaderCard = ({ title, description, userName, userAvatar, tags }: ArticleHeaderCardProps) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                flexShrink: 0

            }}
        >
            <CardContent sx={{ padding: '8px 16px' }}>
                <Flex justify="space-between" >
                    <Flex direction="column" gap={1}>
                        {/* Title */}
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{ fontWeight: 800, color: 'text.primary' }}
                        >
                            {title}
                        </Typography>
                        <Flex justify="space-between">
                            {/* Tags Section */}
                            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, borderRadius: 1.5 }}
                                    />
                                ))}
                            </Stack>
                            {/* Author Info */}
                            <Flex gap={1} width="auto">
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 1 }}>
                                    Author:
                                </Typography>
                                <Avatar src={userAvatar} sx={{ width: 20, height: 20, mr: 1 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {userName}
                                </Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Description */}
                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}
                >
                    {description}
                </Typography>


            </CardContent>
        </Card>
    );
};