import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Link,
  Image,
  Flex,
  Box,
  HStack
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { postSignup } from '../Redux/Auth/Action';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  Name: '',
  mobile_Number: '',
  age: '',
  email: '',
  password: '',
  verificationCode: Array(6).fill('') // Array to store 6 digits
};

export const SignUp = () => {
  const [user, setUser] = React.useState(initialState);
  const [step, setStep] = React.useState(1); // Track the current step
  const [generatedCode, setGeneratedCode] = React.useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) { // Allow only numerical input
      const newCode = [...user.verificationCode];
      newCode[index] = value;
      setUser((prev) => ({ ...prev, verificationCode: newCode }));

      // Auto-focus the next box
      if (value && index < 5) {
        document.getElementById(`code-box-${index + 1}`).focus();
      }
    }
  };

  const handleDetailsSubmit = () => {
    if (user.Name === '' || user.mobile_Number === '' || user.age === '' || user.email === '') {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'warning',
        render: () => <Box color="white" bg="blue.500" p="20px">Please fill out all required fields</Box>
      });
      return;
    }

    if (!user.email.includes('@gmail.com')) {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: () => <Box color="white" bg="red.500" p="20px">Email must be a valid Gmail address</Box>
      });
      return;
    }

    // Simulate sending a verification code
    const code = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
    setGeneratedCode(code);
    console.log('Verification Code:', code); // For testing; remove in production

    toast({
      position: 'top',
      isClosable: true,
      duration: 2000,
      status: 'info',
      render: () => <Box color="white" bg="blue.500" p="20px">Verification code sent to your email!</Box>
    });

    setStep(2); // Move to verification step
  };

  const handleCodeSubmit = () => {
    if (user.verificationCode.join('').length === 6) {
      // Bypass verification check
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'success',
        render: () => <Box color="white" bg="green.500" p="20px">Verification successful!</Box>
      });
      setStep(3); // Move to set password step
    } else {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: () => <Box color="white" bg="red.500" p="20px">Invalid verification code!</Box>
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (user.password === '') {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'warning',
        render: () => <Box color="white" bg="blue.500" p="20px">Please set a password</Box>
      });
      return;
    }

    dispatch(postSignup(user));

    toast({
      position: 'top',
      isClosable: true,
      duration: 2000,
      status: 'success',
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          {user.Name}, your account has been created successfully! 😊
        </Box>
      )
    });

    setUser(initialState);
    navigate('/Login');
  };

  return (
    <Box as="main" height="auto" w="98.5vw" paddingLeft="9%" bg="#000014" border="0.1px solid gray">
      <Stack
        minH="70vh"
        paddingLeft="8%"
        marginTop="3%"
        direction={{ base: 'column-reverse', md: 'row' }}
        border="1px solid gray"
        background="transparent"
        color="white"
        backdropFilter="blur(1px)"
      >
        <Flex flex={1}>
          <Image alt="Cover image" objectFit="cover" src="https://emby.media/community/uploads/inline/1124/57dec9263974d_Produce7.gif" />
        </Flex>
        <Flex p={6} flex={1} align="center" justifyContent="center">
          <Stack spacing={2}>
            <Stack align="center">
              <Heading fontSize="2xl" color="gray">Sign up for an account</Heading>
            </Stack>
            <VStack
              as="form"
              spacing={6}
              boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              h="max-content !important"
              bg={useColorModeValue('#000014', 'gray.700')}
              color="gray"
              rounded="lg"
              boxShadow="lg"
              p={{ base: 5, sm: 10 }}
            >
              {step === 1 && (
                <>
                  <FormControl id="Name">
                    <FormLabel>Name</FormLabel>
                    <Input rounded="md" type="text" placeholder="Enter your Name" name="Name" value={user.Name} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="mobile">
                    <FormLabel>Mobile number</FormLabel>
                    <Input rounded="md" type="number" placeholder="Enter your Number" name="mobile_Number" value={user.mobile_Number} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input rounded="md" type="email" placeholder="Enter your Gmail address" name="email" value={user.email} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="Age">
                    <FormLabel>Age</FormLabel>
                    <Input rounded="md" type="number" placeholder="Enter your Age" name="age" value={user.age} onChange={handleChange} />
                  </FormControl>
                  <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: 'blue.300' }}
                    rounded="md"
                    w="100%"
                    onClick={handleDetailsSubmit}
                  >
                    Send Verification Code
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <FormControl>
                    <FormLabel>Enter Verification Code</FormLabel>
                    <HStack spacing={2}>
                      {user.verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          id={`code-box-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          textAlign="center"
                          rounded="md"
                          width="3rem"
                        />
                      ))}
                    </HStack>
                  </FormControl>
                  <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: 'blue.300' }}
                    rounded="md"
                    w="100%"
                    onClick={handleCodeSubmit}
                  >
                    Verify Code
                  </Button>
                </>
              )}
              {step === 3 && (
                <>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      rounded="md"
                      type="password"
                      placeholder="Set your password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: 'blue.300' }}
                    rounded="md"
                    w="100%"
                    onClick={handlePasswordSubmit}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </VStack>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};
