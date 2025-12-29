import { useParams } from "react-router-dom";

export const ArticlePage = () => {
    const { topicId, articleId } = useParams();
    return (
        <div id="article-page">
            ARTICLE PAGE {topicId} {articleId}
        </div>
    );
}