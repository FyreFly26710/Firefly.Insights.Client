import { Card, CardHeader, Typography, CardContent, Avatar, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

type TopicCardProps = {
    topicId: number;
    name: string;
    description: string;
    imageUrl: string;
};

export default function TopicCard({ topicId, name, description, imageUrl }: TopicCardProps) {
    return (
        <Card id="topic-card" variant="outlined" sx={{ maxWidth: '250px' }}>
            <CardActionArea component={Link} to={`/topics/${topicId}`}>
                <CardHeader title={name} />
                <CardContent>
                    <Typography
                        variant="body2"
                        title={description}
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                        }}
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
