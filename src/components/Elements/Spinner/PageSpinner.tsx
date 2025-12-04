import Flex from "../Flex/Flex";
import { Spinner } from "./Spinner";

export const PageSpinner = () => {
    return (
        <Flex id="page-spinner" height="100%" justify="center" align="center">
            <Spinner />
        </Flex>
    );
};
