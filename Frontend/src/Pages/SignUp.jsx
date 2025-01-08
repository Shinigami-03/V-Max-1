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
  Box
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { postSignup } from '../Redux/Auth/Action';
import { useToast } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom';
import "./Navbar.css"

const initialState={
  Name:"",
  mobile_Number:"",
  age:"",
  email:"",
  password:"",
}

export const SignUp = () => {
  const [user,setuser]=React.useState(initialState) 
  const dispatch= useDispatch()
  const toast = useToast()
  const navigate=useNavigate()


 const handleChange=(e)=>{
  const {name,value}=e.target
  setuser(prev => {
    return {...prev, [name] : name=== "age" && name==="mobile_Number"  ? +value :value}
})
 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  dispatch(postSignup(user))
  if(user.Name==""&&user.mobile_Number==""&&user.age==""&&user.email==""&&user.password==""){
    // toast.error("Please Enter All Credentials to Sign Up")
    toast({
      position:"top",
      isClosable: true,
      duration: 2000,
      status: "warning",
      render:()=>(
          <Box color="white" bg="blue.500" p="20px" > Please fill out all required fields</Box>
      )
    })
   
  }
  else if(user.password.includes("~!@#$%^&*")){
    // toast("Password should contain some special characters ~!@#$%^&*")
    toast({
      position:"top",
      isClosable: true,
      duration: 2000,
      status: "warning",
      render:()=>(
          <Box color="white" bg="blue.500" p="20px" > should contain some special characters ~!@#$%^&*</Box>
      )
    })
   
  }
  else{
    toast({
      position: 'top',
      isClosable: true,
      duration: 2000,
      status: "success",
      render: () => (
        <Box color='white' p={3} bg='blue.500'>
         { user.Name} your account created successfully! 😊 
        </Box>
      ),
     
    })
    setuser(initialState);
    navigate("/Login")
    console.log(user)
   
  }

}




  return (
    <Box as="main"  height="auto" w={"98.5vw"} paddingLeft={"9%"} id='mainDiv'  bg={"#000014"} border={"0.1px solid gray"} >
    <Stack minH="70vh"  paddingLeft={"8%"} marginTop={"3%"} direction={{ base: 'column-reverse', md: 'row' }} border={"1px solid gray"} background= 'transparent' color="white" backdropFilter={"blur(1px)"}>
      <Flex flex={1}>
        <Image alt="Cover image" objectFit="cover" src="https://emby.media/community/uploads/inline/1124/57dec9263974d_Produce7.gif" />
      </Flex>
      <Flex p={6} flex={1} align="center" justifyContent="center">
        <Stack spacing={2}>
          <Stack align="center">
            <Heading fontSize="2xl" color={"gray"}>Sign in to your account</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={6}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('#000014', 'gray.700')}
            color={"gray"}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={1} w="100%">
            <FormControl id="Name">
                <FormLabel>Name</FormLabel>
                <Input rounded="md" type="text" placeholder='Enter your Name' name='Name' value={user.Name} onChange={(e)=>handleChange(e)} />
              </FormControl>
              <FormControl id="mobile">
                <FormLabel>Mobile number</FormLabel>
                <Input rounded="md" type="number" placeholder='Enter your Number'  name='mobile_Number' value={user.mobile_Number} onChange={(e)=>handleChange(e)} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input rounded="md" type="email" placeholder='Enter your email' name='email' value={user.email} onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="Age">
                <FormLabel>Age</FormLabel>
                <Input rounded="md" type="number" placeholder='Enter your Age' name='age' value={user.age} onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input rounded="md" type="password" placeholder='Enter your password' name='password' value={user.password} onChange={(e)=>handleChange(e)}/>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="blue" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
              <Button
                bg="blue.500"
                color="white"
                _hover={{
                  bg: 'blue.300'
                }}
                rounded="md"
                w="100%"
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
    </Box>
  );
};
