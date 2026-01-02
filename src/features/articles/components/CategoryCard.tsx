
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardHeader, CardMedia, Grid } from '@mui/material';
import type { CategoryDto } from '../api-types';
import TopicCard from './TopicCard';

type CategoryCardProps = {
    category: CategoryDto;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const imageUrl = category.imageUrl;

    return (
        <Card id="category-card" variant="outlined">
            <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
            />

            <CardHeader
                title={category.name}
                subheader={category.description}
            />

            <CardContent sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <Grid container spacing={2}>
                    {category.categoryTopics.map((topic) => (
                        <TopicCard key={topic.topicId} {...topic} />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}