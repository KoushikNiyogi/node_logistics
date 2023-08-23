import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Link, Text, useToast } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

function Signup() {
    const toast = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async () => {
        try {
            // Replace with your backend API endpoint and actual signup logic
            const response = await fetch('https://node-logistics-backend.onrender.com/customer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json()
             console.log(data)
            if (response.ok) {
                toast({
                    title: data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/');
            } else {
                const data = await response.json();
                toast({
                    title: 'An error occurred',
                    description: 'Registration failed. Please check your credentials.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'An error occurred',
                description: 'Registration failed. Please check your credentials.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="400px" mx="auto" p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Create an Account
            </Text>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} mb={2} />
                <FormLabel>City</FormLabel>
                <Input type="text" name="city" value={formData.city} onChange={handleInputChange} mb={2} />
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} mb={2} />
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    mb={4}
                />
                <Button colorScheme="blue" onClick={handleSignup} w="100%" mb={4}>
                    Signup
                </Button>
                <Text>
                    Already have an account?{' '}
                    <Link as={NavLink} to="/" color="blue.500">
                        Login here
                    </Link>
                </Text>
            </FormControl>
        </Box>
    );
}

export default Signup;
