import { Link, useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem, MenuDivider,
    Icon, IconButton, useToast, Spacer, Text
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from 'react-icons/cg';



function MenuDrop() {
    const navigate = useNavigate();
    const toast = useToast();

    function redirect() {

        try {
            fetch(`http://localhost:5000/users/account_info`, { credentials: 'include' })
                .then(response => {
                    if (response.status != 200) {
                        navigate('/login')
                        toast({
                            title: 'Login',
                            status: 'error',
                            duration: 1500,
                            isClosable: true
                        })
                    }
                })
        } catch (error) {
            console.error('Error redirecting: ', error);
        }
        // .catch(error => console.error('Error fetching User:', error));
    }

    async function fetchLogout() {
        const response = await fetch(`http://localhost:5000/logout`, {
            method: 'POST',
            credentials: 'include',  // Include cookies in the request

        })
            .then(response => {
                if (response.status == 200) {
                    navigate('/login')
                    toast({
                        title: 'Logged out',
                        duration: 1500,
                        isClosable: true
                    })
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    return (
        <Menu>
            <MenuButton
                onClick={redirect}
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
            >
            {/* <Icon as={CgProfile} boxSize={8} color='white' /> */}

            </MenuButton>
            <MenuList>
                {/* <MenuItem as={Link} to='/login'>Login</MenuItem> */}
                <MenuItem as={Link} to='/events'>Events</MenuItem>
                <MenuItem as={Link} to='/account'>Account Info</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FaSignOutAlt />} color='red.500' onClick={fetchLogout}>Logout</MenuItem >
            </MenuList>
        </Menu>

    )
}

export default MenuDrop;

