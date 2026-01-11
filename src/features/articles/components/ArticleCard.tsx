import { Box, Chip, Link, Stack, Typography, useTheme } from '@mui/material';
import type { ArticleDto } from '../api-types';
import Flex from '@/components/Elements/Flex/Flex';

interface ArticleCardProps {
    article: ArticleDto;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <Box sx={{ width: '100%', py: 1, px: 1 }}>
            {/* Top Row: Title and Tags */}
            <Flex justify="space-between" align="flex-start">
                <Link
                    href={`/topics/${article.topicId}/articles/${article.articleId}`}
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isLight ? 'common.black' : 'primary.light',
                        textDecoration: 'none',
                        mr: 2,
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                    }}
                    title={article.title}
                >
                    {article.title}
                </Link>

                <Flex gap={4} justify="flex-end" grow={0} width="auto" shrink={0}>
                    {article.tags?.map((tag) => (
                        <Chip
                            key={tag.tagId}
                            label={tag.name}
                            size="small"
                            sx={{
                                height: 22,
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                bgcolor: isLight ? '#e6f7ff' : 'rgba(24, 144, 255, 0.15)',
                                color: isLight ? '#1890ff' : '#40a9ff',
                                border: '1px solid',
                                borderColor: isLight ? '#91d5ff' : '#1d39c4',
                            }}
                        />
                    ))}
                </Flex>
            </Flex>

            <Flex justify="space-between" align="flex-start" gap={4} margin="8px 0">
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        pr: 4,
                    }}
                >
                    {article.description || ''}
                </Typography>

                <Chip
                    label={`Topic: ${article.topicName}`}
                    size="small"
                    sx={{
                        borderRadius: '4px',
                        fontWeight: 500,
                        bgcolor: isLight ? '#f6ffed' : 'rgba(82, 196, 26, 0.15)',
                        color: isLight ? '#52c41a' : '#73d13d',
                        border: '1px solid',
                        borderColor: isLight ? '#b7eb8f' : '#237804',
                    }}
                />
            </Flex>
        </Box>
    );
};
