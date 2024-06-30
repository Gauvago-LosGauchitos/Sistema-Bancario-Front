import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { transfer, reverTransfer } from "../../services/api"

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
            if (response.error) {
                throw new Error(response.error)
            }
            toast.success('Transfer completed successfully')
            return response.idTransfer // Return del id de la transaccion
            console.log(response)
        } catch (error) {
            toast.error('Transfer error')
        } finally {
            setIsLoading(false)
        }
    }

    const revert = async(idTransfer)=>{
        setIsLoading(true)
        try {
            const response =  await reverTransfer(idTransfer)
            if(response.error) {
                throw new Error(response.error)
            }
            toast.success('Transfer successfully reversed')
            console.log(response)
        }catch(error) {
            toast.error('Failed to reverse transfer')
        } finally {
            setIsLoading(false)
        }    
    }
    
    return {
        transferencia,
        revert,
        isLoading
      }
}