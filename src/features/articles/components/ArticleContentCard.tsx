import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Link, Divider, useTheme, Table, TableContainer, Paper } from '@mui/material';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Code } from '@/components/Markdowns/Code';
import { MdTable } from '@/components/Markdowns/MdTable';
type ArticleContentCardProps = {
    content: string;
};

export const ArticleContentCard = ({ content }: ArticleContentCardProps) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <Box
            sx={{
                p: 0,
                width: '100%',
                // overflowY: 'auto',
                margin: '0 auto',
            }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Map H1 to MUI Typography
                    h1: ({ node, ...props }) => (
                        <>
                            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }} {...props} />
                            <Divider sx={{ my: 0.5 }} />
                        </>
                    ),
                    h2: ({ node, ...props }) => (
                        <>
                            <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }} {...props} />
                            <Divider sx={{ my: 0.5 }} />
                        </>
                    ),
                    blockquote: ({ node, ...props }) => (
                        <Typography
                            component="blockquote"
                            variant="body1"
                            sx={{
                                py: 0.5,
                                px: 1,
                                borderLeft: '4px solid',
                                backgroundColor: isLight ? 'action.hover' : 'action.hover',
                                fontStyle: 'italic',
                                color: isLight ? 'text.secondary' : 'text.primary',
                                borderRadius: '0 4px 4px 0',
                                '& p': { m: 0 },
                            }}
                            {...props}
                        />
                    ),
                    // Map paragraphs
                    p: ({ node, ...props }) => <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7 }} {...props} />,
                    // Map links to MUI Link
                    a: ({ node, ...props }) => <Link underline="hover" color="primary" {...props} />,
                    // Divider for horizontal rules
                    hr: () => <Divider sx={{ my: 4 }} />,
                    // Modern Syntax Highlighting for code blocks
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code({ node, className, children, ...props }: any) {
                        return <Code node={node} className={className} children={children} {...props} />;
                    },
                    ...MdTable,
                }}
            >
                {content}
            </ReactMarkdown>
        </Box>
    );
};
