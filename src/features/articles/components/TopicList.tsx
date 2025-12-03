import { useAsync } from "@/features/shared/hooks/useAsync ";
import { useEffect } from "react";
import { apiTopicsGetList } from "../api";
import { PageSpinner } from "@/components/Elements/Spinner/PageSpinner";

export const TopicList = () => {

    const { data, isLoading, execute } = useAsync(apiTopicsGetList);

    useEffect(() => {
        execute();
    }, []);

    if (isLoading) {
        return <PageSpinner />;
    }

    // if (error) {
    // }

    return <div>{data?.map((topic) => <div key={topic.topicId}>{topic.name}</div>)}</div>;
}