import React from 'react'
import Modal from '../uiComponents/Modal'
import AddressForm from './AddressForm'
import { auth } from '@/auth'

const AddressFormContainer = async () => {

    const session = await auth()
    const loggedInUserEmail  = session?.user?.email

    return (
        <Modal addressForm>
            <AddressForm loggedInUserEmail={loggedInUserEmail} />
        </Modal>
    )
}

export default AddressFormContainer