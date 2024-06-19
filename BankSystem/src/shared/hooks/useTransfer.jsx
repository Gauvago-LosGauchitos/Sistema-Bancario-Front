import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { transfer } from "../../services/api"

export const useTransfer = ()=>{
    const [isLoading, setIsLoading] = useState(false)

    const transferencia = async (recipientAccount, amount) =>{
        setIsLoading(true)
        try {
            const tran = {
                recipientAccount,
                amount
            }
            const response =  await transfer(tran)
            console.log(response)
        } catch (error) {
            toast.error('transfer error')
        } finally {
            setIsLoading(false)
        }
    }
    return {
        transferencia,
        isLoading
      }
}