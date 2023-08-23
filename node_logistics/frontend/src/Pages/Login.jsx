import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Text,
    useToast,
} from '@chakra-ui/react';

function Login() {
    const navigate = useNavigate();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email == "admin@gmail.com" && password == "admin1234") {

            localStorage.setItem("role", JSON.stringify({ email, password }))
            try {
                const response = await fetch("https://node-logistics-backend.onrender.com/customer/admin_login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log(data);
                if (data) {
                    localStorage.setItem("admintoken",data.token)
                    toast({
                        title: data.msg,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate('/items'); // Navigate to items page on successful login
                } else {
                    toast({
                        title: 'An error occurred',
                        description: 'Login failed. Please check your credentials.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    title: 'An error occurred',
                    description: 'Login failed. Please check your credentials.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {

            try {
                const response = await fetch("https://node-logistics-backend.onrender.com/customer/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log(data)
                if (data.user) {
                    localStorage.setItem("role", JSON.stringify(data.user))
                    toast({
                        title: data.msg,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate('/items'); // Navigate to items page on successful login
                } else {
                    toast({
                        title: 'An error occurred',
                        description: 'Login failed. Please check your credentials.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    title: 'An error occurred',
                    description: 'Login failed. Please check your credentials.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }

    }



    return (
        <Box maxW="400px" mx="auto" p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Login to Your Account
            </Text>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" mb={2} value={email} onChange={(e)=>setEmail(e.target.value)}  />
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" mb={4} value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Button colorScheme="blue" onClick={handleLogin} w="100%" mb={4}>
                    Login
                </Button>
                <Text>
                    Don't have an account?{' '}
                    <Link as={NavLink} to="/signup" color="blue.500">
                        Sign up here
                    </Link>
                </Text>
            </FormControl>
        </Box>
    );
}

export default Login
