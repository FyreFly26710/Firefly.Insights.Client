import { useParams } from "react-router-dom";

export const ArticlePage = () => {
    const { topicId, articleId } = useParams();
    return (
        <>
            ARTICLE PAGE {topicId} {articleId}
        </>
    );
}