import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { deposit } from "../../services/api"

export const useDeposit = ()=>{
    const [isLoading, setIsLoading] = useState(false)

    const deposito = async (recipientAccount, amount) =>{
        setIsLoading(true)
        try {
            const dep = {
                recipientAccount,
                amount
            }
            const response =  await deposit(dep)
            console.log(response)
        } catch (error) {
            toast.error('Deposit error')
        } finally {
            setIsLoading(false)
        }
    }
    return {
        deposito,
        isLoading
      }
}