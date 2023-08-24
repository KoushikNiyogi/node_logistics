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
  useToast,
} from '@chakra-ui/react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchItems()
  }, []);

 const fetchItems = () =>{
    fetch('https://node-logistics-backend.onrender.com/order')
      .then(response => response.json())
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
 }

  const handleUpdate = (order_id,orderNumber) => {
    // Make request to update order
    fetch(`https://node-logistics-backend.onrender.com/order/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("admintoken")
      },
      body: JSON.stringify({
        order_id,
        orderNumber // Assuming you want to mark it as delivered
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchItems();
      toast({
        title: data.msg,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // You can update the list of orders or take appropriate action here
    })
    .catch(error => {
      console.error(error);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Box p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order Number</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order._id}>
              <Td>{order.orderNumber}</Td>
              <Td>{order.price}</Td>
              <Td>{order.isDelivered ? 'Completed' : 'Not Completed'}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleUpdate(order._id,order.orderNumber)}
                  disabled={order.isDelivered} // Disable update if already delivered
                >
                  Update
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Orders;
