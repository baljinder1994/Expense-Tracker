import React, { useEffect, useState } from 'react'
import { ChakraProvider, VStack ,Input,Select, Button, Table, Thead, Tr, Th, Td,Tbody, HStack} from '@chakra-ui/react'
import { Box,Heading,Flex } from '@chakra-ui/react'
import {createExpense,getExpense,updateExpense,deleteExpense} from './api'
const App = () => {

  const[expenses,setExpenses]=useState([])
  const[title,setTitle]=useState('')
  const[amount,setAmount]=useState('')
  const[type,setType]=useState('income')
  const[editId,setEditId]=useState(null)
  const[totalBalance,setTotalBalance]=useState(0);

  useEffect(()=>{
    fetchExpenses();
  },[])

  const fetchExpenses=async()=>{
    const res=await getExpense();
    setExpenses(res.data)
    calculateTotalBalance(res.data)
  }


  const calculateTotalBalance=(expenseList)=>{
    const total= expenseList.reduce((sum,expense)=>{
       return sum + (expense.type === 'income' ? parseFloat(expense.amount): -parseFloat(expense.amount))
    },0)
    setTotalBalance(total)
  }


  const handleSubmit= async (e)=>{
    e.preventDefault();
    const expenseData= { title,amount,type};

    if(editId){
      await updateExpense(editId,expenseData)
      setEditId(null)
    }else{
      await createExpense(expenseData);
    }
    setTitle('')
    setAmount('')
    setType('income')
    fetchExpenses();

  }

  const handleEdit=(expense) =>{
  setTitle(expense.title);
  setAmount(expense.amount)
  setType(expense.type)
  setEditId(expense._id)
  }

  const handleDelete= async (id)=>{
     await deleteExpense(id)
     fetchExpenses()
  }
  return (
    <ChakraProvider>
      <Box max-Width="1200px" mx="auto" mt="10" p="5" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
        <Heading mb="6" textAlign="center" color="teal.500">Expense Tracker</Heading>
        <Flex justify="space-between" direction={{ base: 'column', md:'row'}}>
          <Box as="form" onSubmit={handleSubmit} bg="gray.50" p="4" borderRadius="lg" width={{ base:"100%", md:'40%'}} mb={{ base:'6', md: '0'}}>
           <VStack spacing={4}>
            <Input
              placeholder='Title'
              focusBorderColor='teal.500'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></Input>
            <Input
              placeholder='Amount'
              focusBorderColor='teal.500'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></Input>
            <Select value={type}  onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>

            <Button type="submit" colorScheme="teal" width="full">
             {editId ? 'Update' : 'Add'}
              
              </Button>


           </VStack>
          </Box>
          <Box width={{base:'100%', md:'50%'}} p="4">
            <Box p="4" bg="gray.100" borderRadius="lg" textAlign="center" fontSize="xl" mb="4">
              <strong>Total Balance</strong>${totalBalance.toFixed(2)}
            </Box>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenses.map((expense) =>(
                  <Tr key={expense._id}>
                    <Td>{expense.title}</Td>
                    <Td>{expense.amount}</Td>
                    <Td>{expense.type}</Td>
                    <Td>
                      <HStack spacing="4">
                        <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(expense)} >Edit</Button>
                        <Button size="sm" colorScheme="red" onClick={() => handleDelete(expense._id)}>Delete</Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App
