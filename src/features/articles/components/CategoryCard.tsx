
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

type CategoryCardProps = {
    title: string;
    description: string;
    imageUrl: string;
}

export default function OutlinedCard({ title, description, imageUrl }: CategoryCardProps) {
    return (
        <Card variant="outlined" sx={{ maxWidth: 300 }}>
            <CardMedia component="img" height="140" image={imageUrl} alt={title} />
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
}