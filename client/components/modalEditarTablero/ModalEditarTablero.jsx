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
  ModalOverlay,
  Checkbox, 
  Select
} from "@chakra-ui/react";

export const ModalEditarTablero = ({ isOpen, onClose, tableroEditar, setTableroEditar, handleEditarTableros }) => {
  
  if(!tableroEditar) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              placeholder="Título de la tarea"
              value={tableroEditar.title}
              onChange={(e) => setTableroEditar({ ...tableroEditar, title: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Descripción de la tarea"
              value={tableroEditar.description}
              onChange={(e) => setTableroEditar({ ...tableroEditar, description: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => handleEditarTableros(tableroEditar)}>
            Guardar Cambios
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};