import { useParams } from "react-router-dom";

export const TopicPage = () => {
    const { topicId } = useParams();
    return (
        <>
            TOPIC PAGE {topicId}
        </>
    );
}