import { Card, CardHeader, Typography, CardContent, Avatar, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

type TopicCardProps = {
    topicId: number;
    name: string;
    description: string;
    imageUrl: string;
}

export default function TopicCard({ topicId, name, description, imageUrl }: TopicCardProps) {
    const defaultImageUrl = imageUrl || 'https://ih1.redbubble.net/image.5582017600.4418/st,small,507x507-pad,600x600,f8f8f8.webp';

    return (
        <Card id="topic-card" variant="outlined" sx={{ maxWidth: '300px' }}>
            <CardActionArea component={Link} to={`/topics/${topicId}`}>
                <CardHeader
                    title={name}
                    avatar={<Avatar src={defaultImageUrl} alt={name} />}
                />
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
        </Card >
    );
}