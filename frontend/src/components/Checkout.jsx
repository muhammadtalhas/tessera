import React from 'react';
import {
    useToast, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';

function Checkout({ isOpen, onClose, value, event_id, user_id }) {
    const toast = useToast();
    const navigate = useNavigate();
    const OverlayOne = () => (
        <ModalOverlay
            backdropFilter='blur(5px)'
        />
    )
    const overlay = <OverlayOne />

    return (
        <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
            {overlay}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Checkout</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    {/* <Text>Total Price: ${value}</Text> */}
                    <PaymentForm totalAmount={value} user_id={user_id} event_id={event_id} />
                </ModalBody>
                <ModalFooter>
                    {/* <Button colorScheme='blue' mr={3} onClick={purchaseTicket}>
                        Purchase
                    </Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Checkout;