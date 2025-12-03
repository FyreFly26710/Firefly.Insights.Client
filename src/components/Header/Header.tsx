
import Flex from '../Elements/Flex/Flex';
export function Header() {

    return (
        <Flex direction="row" justify="flex-start" align="center" gap={20}>
            <div>Left</div>
            <div>Center</div>
            <div>Right</div>
        </Flex>
    );
}
