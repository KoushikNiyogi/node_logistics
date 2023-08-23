import React, { useState, useEffect } from 'react';
import { Text,Box, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure ,useToast} from '@chakra-ui/react';

function Items() {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const toast = useToast();
  const [update_item,setUpdate_item] = useState({})
  const [updated_price,setUpdated] = useState("")

  const fetchitems = ()=>{
    fetch('https://node-logistics-backend.onrender.com/item')
      .then(response => response.json())
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }
  // Fetch items from the backend URL
  useEffect(() => {
    fetchitems()
    
    // Simulate fetching user role from local storage
    
  }, []);

  const handleOrder = (item) => {
    // Simulate making a request to backend to place an order
    // You can replace this with your actual order API request

  
    fetch("http://localhost:4040/order/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({ itemID : item["_id"], price : item["price"],customerID : role["_id"] }),
    })
    .then(response => response.json())
    .then(data => {
        fetchitems()
        toast({
          title: data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
    .catch(error => {
      console.log(error);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleUpdate = (item) => {
    onOpen();
    setUpdate_item(item)
     // Implement your update logic here
  };

  const handleUpdatePrice = ()=>{
     
  
    fetch("http://localhost:4040/item/update", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({ id : update_item["_id"], price : updated_price}),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
      if (data) {
        fetchitems()
        toast({
          title: data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch(error => {
      console.log(error);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });

  }


  const handleAddItem = ()=> {
    console.log(name, price);
  
    fetch("https://node-logistics-backend.onrender.com/item/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({ name, price }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
      if (data) {
        fetchitems()
        toast({
          title: data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch(error => {
      console.log(error);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  
    // Implement your add item logic here
    // Note: This function should open a modal for adding new items
  }
  
console.log(update_item)
  return (
    <Box p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            {role && role.email === "admin@gmail.com" && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {items.length!=0&&items.map(item => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.price}</Td>
              {role && role.email === "admin@gmail.com" && (
                <Td>
                  <Button colorScheme="blue" onClick={()=>handleUpdate(item)}>Update</Button>
                </Td>
              )}
              {role && role.email !== "admin@gmail.com" && (
                <Td>
                  <Button colorScheme="green" onClick={() => handleOrder(item)}>Order</Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input type="price" placeholder="Enter your password" mb={4} value={updated_price} onChange={(e)=>setUpdated(e.target.value)} />
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Cancel</Button>
            <Button variant="ghost" onClick={()=>handleUpdatePrice()}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {role && role.email === "admin@gmail.com" && (
        <Box maxW="400px" mx="auto" p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
           Add New Item
        </Text>
        <FormControl>
            <FormLabel>Name of Item</FormLabel>
            <Input type="name" placeholder="Enter name of Item" mb={2} value={name} onChange={(e)=>setName(e.target.value)}  />
            <FormLabel>Price of Item</FormLabel>
            <Input type="password" placeholder="Enter your password" mb={4} value={price} onChange={(e)=>setPrice(e.target.value)} />
            <Button colorScheme="blue" onClick={handleAddItem} w="100%" mb={4}>
                Submit
            </Button>
        </FormControl>
    </Box>
      )}
    </Box>
  );
}

export default Items;
