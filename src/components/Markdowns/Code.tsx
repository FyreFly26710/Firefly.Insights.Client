import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Typography, useTheme } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Code = ({ node, className, children, ...props }: any) => {
    const codeContent = String(children).replace(/\n$/, '');

    const isMultiLine = codeContent.includes('\n');

    const match = /language-(\w+)/.exec(className || '');
    const isLight = useTheme().palette.mode === "light";
    const syntaxStyle = isLight ? oneLight : oneDark;

    // RULE: If it has multiple lines, render as a BLOCK. 
    // Otherwise, render as INLINE.
    if (isMultiLine) {
        return (
            <Box
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    my: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: isLight ? '#f9f9f9' : '#282c34',
                }}
            >
                {/* Header Bar */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        py: 0.5,
                        backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
                        {match ? match[1] : 'text'}
                    </Typography>
                    {/* You could add a Copy button here later */}
                </Box>

                {match ? (
                    <SyntaxHighlighter
                        style={syntaxStyle}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                            margin: 0,
                            padding: '16px',
                            fontSize: '0.875rem',
                            backgroundColor: 'transparent',
                        }}
                        {...props}
                    >
                        {codeContent}
                    </SyntaxHighlighter>
                ) : (
                    <Box
                        component="pre"
                        sx={{
                            margin: 0,
                            padding: '16px',
                            overflowX: 'auto',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            color: isLight ? 'text.primary' : '#abb2bf',
                        }}
                    >
                        <code>{codeContent}</code>
                    </Box>
                )}
            </Box>
        );
    }

    // SINGLE LINE / INLINE PILL
    return (
        <Box
            component="code"
            sx={{
                backgroundColor: isLight ? 'action.hover' : 'rgba(255,255,255,0.1)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'monospace',
            }}
            {...props}
        >
            {codeContent}
        </Box>
    );
}