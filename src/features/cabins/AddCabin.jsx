import React, { useState } from 'react'
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin(){
    return <Modal>
        <Modal.Open>
            <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window>
            <CreateCabinForm/>
        </Modal.Window>
    </Modal>
}

/* export default function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);


    return(<div>

        <Button size={"medium"} variation ={"primary"} onClick={()=>setIsOpenModal((show)=>!show)} >Add new cabin</Button>
        {isOpenModal && 
        <Modal onClose= {()=> setIsOpenModal(false)}>
            <CreateCabinForm onCloseModal= {()=> setIsOpenModal(false)}/>    
        </Modal>
        }
    </div>
    )
} */
