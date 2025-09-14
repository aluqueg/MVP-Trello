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

export const ModalEditarTarea = ({ isOpen, onClose, tareaEditar, setTareaEditar, handleEditarTarea }) => {
  
  if(!tareaEditar) return null;

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
              value={tareaEditar.title}
              onChange={(e) => setTareaEditar({ ...tareaEditar, title: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Descripción de la tarea"
              value={tareaEditar.description}
              onChange={(e) => setTareaEditar({ ...tareaEditar, description: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Estado</FormLabel>
            <Select
              value={tareaEditar.type}
              onChange={(e) =>
                setTareaEditar({
                  ...tareaEditar,
                  type: parseInt(e.target.value, 10),
                })
              }
            >
              <option value={1}>Pendiente</option>
              <option value={2}>En progreso</option>
              <option value={3}>Hecho</option>
            </Select>            
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => handleEditarTarea(tareaEditar)}>
            Guardar Cambios
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};