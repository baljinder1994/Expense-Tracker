import axios from 'axios'

const API_URL='http://localhost:5000/api/expense'

export const createExpense= async (expense)=>{
    return await axios.post(API_URL,expense)
}
export const getExpense= async ()=>{
    return await axios.get(API_URL)
}
export const updateExpense= async (id,expense)=>{
    return await axios.put(`${API_URL}/${id}`,expense)
}
export const deleteExpense= async (id,expense)=>{
    return await axios.delete(`${API_URL}/${id}`,expense)
}