import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Spacer, Button, Link, Text } from '@chakra-ui/react';

function NavBar() {
  return (
    <Flex bg="blue.500" p={4} align="center">
      <Link as={NavLink} exact to="/" mr={4}>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Logistics App
        </Text>
      </Link>
      <Spacer />
      <Flex w={"50%"} justify={"space-evenly"}>
      <NavLink mr={"10px"} to="/signup" activeClassName="activeLink" className="navLink">
        Register
      </NavLink>
      <NavLink mr={"10px"} to="/" activeClassName="activeLink" className="navLink">
        Login
      </NavLink>
      <NavLink mr={"10px"} to="/items" activeClassName="activeLink" className="navLink">
        Items
      </NavLink>
      <NavLink mr={"10px"} to="/vehicles" activeClassName="activeLink" className="navLink">
        Vehicles
      </NavLink>
      <NavLink mr={"10px"} to="/orders" activeClassName="activeLink" className="navLink">
        Orders
      </NavLink>
      </Flex>
      
    </Flex>
  );
}

export default NavBar;
