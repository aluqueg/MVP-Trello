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

export const ModalCrearTarea = ({ isOpen, onClose, nuevaTarea, setNuevaTarea, handleCrearTarea }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear nuevo Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              placeholder="Título del tablero"
              value={nuevaTarea.title}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, title: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Descripción del tablero"
              value={nuevaTarea.description}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, description: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCrearTarea}>
            Crear
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};