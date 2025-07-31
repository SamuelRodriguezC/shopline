import React from 'react'
import Modal from '../uiComponents/Modal'
import AddressForm from './AddressForm'
import { auth } from '@/auth'
import { getAddress } from '@/lib/api'

const AddressFormContainer = async () => {

    const session = await auth()
    const loggedInUserEmail  = session?.user?.email
    const address = await getAddress(loggedInUserEmail)

    return (
        <Modal addressForm address={address}>
            <AddressForm loggedInUserEmail={loggedInUserEmail} address={address}/>
        </Modal>
    )
}

export default AddressFormContainer