import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

export const ModalCrearTablero = ({ isOpen, onClose, nuevoTablero, setNuevoTablero, handleCrearTablero }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear nuevo tablero</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              placeholder="Título del tablero"
              value={nuevoTablero.title}
              onChange={(e) => setNuevoTablero({ ...nuevoTablero, title: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Descripción del tablero"
              value={nuevoTablero.description}
              onChange={(e) => setNuevoTablero({ ...nuevoTablero, description: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCrearTablero}>
            Crear
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
