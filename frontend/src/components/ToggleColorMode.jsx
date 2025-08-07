import { Button } from "@chakra-ui/button";
import {useColorMode, useColorModeValue} from "@chakra-ui/color-mode";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
    const color = useColorModeValue('white', 'white');
    const {colorMode, toggleColorMode } = useColorMode();
    return (
        <Button colorScheme="darkblue" onClick={() => toggleColorMode()} color={color}>
            {colorMode === "dark" ? <SunIcon boxSize={5}/> : <MoonIcon boxSize={5}/>}
        </Button>
    )
}

export default ToggleColorMode;

