import React, { useState } from 'react';
import {
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Paper,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Controller, useFieldArray, type Control, type UseFormRegister, type UseFormGetValues, type UseFormSetValue } from 'react-hook-form';
import type { TopicCreateRequest } from '@/features/articles/api-types';
import Flex from '@/components/Elements/Flex/Flex';

interface TopicArticlesGridProps {
    control: Control<TopicCreateRequest>;
    register: UseFormRegister<TopicCreateRequest>;
    getValues: UseFormGetValues<TopicCreateRequest>;
    setValue: UseFormSetValue<TopicCreateRequest>;
}

export const TopicArticlesGrid: React.FC<TopicArticlesGridProps> = ({
    control,
    register,
    getValues,
    setValue
}) => {
    const { fields, remove, move } = useFieldArray({
        control,
        name: 'topicArticles',
    });

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) {
            setDragOverIndex(null);
            return;
        }
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        // Move the item in the form array
        move(draggedIndex, dropIndex);

        // Update sort numbers for all items
        const currentValues = getValues('topicArticles');
        const reordered = [...currentValues];
        const [movedItem] = reordered.splice(draggedIndex, 1);
        reordered.splice(dropIndex, 0, movedItem);

        // Update sort numbers
        reordered.forEach((_, idx) => {
            setValue(`topicArticles.${idx}.sortNumber`, idx);
        });

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <Flex direction="column" gap={24} width="100%">
            <Typography variant="h6" gutterBottom>
                Topic Articles
            </Typography>

            {/* Articles List */}
            {fields.length > 0 ? (
                <Stack spacing={1} sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                    {fields.map((field, index) => (
                        <Paper
                            key={field.id}
                            variant="outlined"
                            sx={{
                                p: 1,
                                cursor: 'move',
                                opacity: draggedIndex === index ? 0.5 : 1,
                                transition: 'all 0.2s',
                                border: dragOverIndex === index ? '2px dashed' : '1px solid',
                                borderColor: dragOverIndex === index ? 'primary.main' : 'divider',
                                bgcolor: dragOverIndex === index ? 'action.hover' : 'background.paper',
                                '&:hover': {
                                    boxShadow: 2,
                                }
                            }}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                        >
                            <Flex direction="row" align="center" gap={8}>
                                <IconButton
                                    size="small"
                                    sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
                                >
                                    <DragIndicatorIcon />
                                </IconButton>

                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    title={field.title}
                                    sx={{
                                        flexGrow: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {field.title}
                                </Typography>


                                <TextField
                                    {...register(`topicArticles.${index}.sortNumber`, { valueAsNumber: true })}
                                    label="Order"
                                    type="number"
                                    size="small"
                                    sx={{ width: 70, flexShrink: 0 }}

                                />

                                <Controller
                                    name={`topicArticles.${index}.isHidden`}
                                    control={control}
                                    render={({ field: checkboxField }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...checkboxField}
                                                    checked={!!checkboxField.value}
                                                    size="small"
                                                />
                                            }
                                            label="Hidden"
                                        />
                                    )}
                                />
                                <Controller
                                    name={`topicArticles.${index}.isTopicSummary`}
                                    control={control}
                                    render={({ field: checkboxField }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...checkboxField}
                                                    checked={!!checkboxField.value}
                                                    size="small"
                                                />
                                            }
                                            label="Summary"
                                        />
                                    )}
                                />
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => remove(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Flex>
                        </Paper>
                    ))}
                </Stack>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 4 }}>
                    No articles associated with this topic.
                </Typography>
            )}
        </Flex>
    );
};
