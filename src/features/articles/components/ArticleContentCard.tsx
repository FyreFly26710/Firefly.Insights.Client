import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Typography, Link, Divider, useTheme } from '@mui/material';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
type ArticleContentCardProps = {
    content: string;
};

export const ArticleContentCard = ({ content }: ArticleContentCardProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                p: 3,
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
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, mt: 4 }} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, mt: 3 }} {...props} />
                    ),
                    // Map paragraphs
                    p: ({ node, ...props }) => (
                        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7 }} {...props} />
                    ),
                    // Map links to MUI Link
                    a: ({ node, ...props }) => (
                        <Link underline="hover" color="primary" {...props} />
                    ),
                    // Divider for horizontal rules
                    hr: () => <Divider sx={{ my: 4 }} />,
                    // Modern Syntax Highlighting for code blocks
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\\w+)/.exec(className || '');
                        return !inline && match ? (
                            <Box sx={{ borderRadius: 2, overflow: 'hidden', my: 2 }}>
                                <SyntaxHighlighter
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </Box>
                        ) : (
                            <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </Box>
    );
};