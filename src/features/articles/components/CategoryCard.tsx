
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardHeader, Grid } from '@mui/material';
import type { CategoryDto } from '../api-types';
import TopicCard from './TopicCard';

type CategoryCardProps = {
    category: CategoryDto;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const imageUrl = category.imageUrl || 'https://ih1.redbubble.net/image.5582017600.4418/st,small,507x507-pad,600x600,f8f8f8.webp';
    return (
        <Card id="category-card" variant="outlined" >
            <CardHeader
                title={category.name}
                subheader={category.description}
                avatar={<Avatar src={imageUrl} alt={category.name} />}
            />
            <CardContent sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <Grid container spacing={2}>
                    {category.categoryTopics.map((topic) => (
                        <TopicCard key={topic.topicId} {...topic} />
                    ))}
                </Grid>
            </CardContent>
        </Card >
    );
}