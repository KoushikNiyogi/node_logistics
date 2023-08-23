import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure,
  Select
} from '@chakra-ui/react';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const toast = useToast()
  const [name,setName] = useState("")
  const [vehicleType,setVehicleType] = useState("")

  useEffect(() => {
    fetchVehicles()
  }, []);

  const fetchVehicles = ()=>{
    fetch('https://node-logistics-backend.onrender.com/vehicles',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("admintoken"),
        }})
      .then(response => response.json())
      .then(response =>{
        console.log(response)
        setVehicles(response.data)})
      .catch(error => console.error(error));
  }

  const handleUpdate = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveOrdersCount(vehicle.activeOrdersCount);
    onOpen();
  };

  const handleSave = () => {
    // Make request to update activeOrdersCount
    fetch('https://node-logistics-backend.onrender.com/vehicles/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken")
      },
      body: JSON.stringify({
        id: selectedVehicle._id,
        activeOrdersCount: activeOrdersCount,
      }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
      fetchVehicles();
      toast({
        title: data.msg||data.error,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    })
    .catch(error => {
      console.error(error);
      onClose();
    });
  };

  const handleAddVehicle = () => {
    // Implement add vehicle logic
    // Make request to add new vehicle
    let obj = {
        city : name,
        vehicleType
    }
    fetch('https://node-logistics-backend.onrender.com/vehicles/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken")
      },
      body: JSON.stringify(obj),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      fetchVehicles();
      toast({
        title: data.msg||data.error,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    })
    .catch(error => {
      console.error(error);
      onClose();
    });
  };

  return (
    <Box p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>City</Th>
            <Th>Vehicle Type</Th>
            <Th>Order Count</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vehicles.map(vehicle => (
            <Tr key={vehicle._id}>
              <Td>{vehicle.city}</Td>
              <Td>{vehicle.vehicleType}</Td>
              <Td>{vehicle.activeOrdersCount}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleUpdate(vehicle)}>Update</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Vehicle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Active Orders Count</FormLabel>
              <Input
                type="number"
                value={activeOrdersCount}
                onChange={(e) => setActiveOrdersCount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>Save</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormControl m={"4 auto"} maxW={"50%"} >
        <FormLabel>City</FormLabel>
        <Input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
        <FormLabel>Vehicle Type</FormLabel>
        <Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
        </Select>
      <Button colorScheme="green" mt={4} onClick={handleAddVehicle}>Add New Vehicle</Button>
      </FormControl>
      
    </Box>
  );
}

export default Vehicles;
