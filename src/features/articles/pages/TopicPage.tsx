import { useParams } from "react-router-dom";

export const TopicPage = () => {
    const { topicId } = useParams();
    return (
        <div id="topic-page">
            TOPIC PAGE {topicId}
        </div>
    );
}