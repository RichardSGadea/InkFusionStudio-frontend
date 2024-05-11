import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomInput } from '../CustomInput/CustomInput';
import { bringPortfolios, bringWorkers, createAppointment, deleteAppointmentById, updateAppointmentById } from '../../services/apiCalls';
import dayjs from "dayjs"
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import "./AppointmentModal.css"

function AppointmentModal({ titleProp,functionEmit, classNameProp, modalFormProp, appointmentData, inputHandlerProp, appointmentId }) {
    
    //To save the info selected about a new appointment
    const [newAppointment, setNewAppointment] = useState({
        appointmentDate: "",
        emailWorker: "",
        nameJob: "",
    })
    
    //To save the workers and jobs 
    const [workers, setWorkers] = useState([])
    const [portfolios, setPortfolios] = useState([])


    const navigate = useNavigate()

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    const userType = userReduxData.decoded.userRole

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        navigate("/")
        setTimeout(() => {
            navigate("/appointments")
        })
    };
    const handleShow = () => setShow(true);


    //Take the inputs control with this handlers
    const inputHandler = (e) => {
        setNewAppointment((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
        
    }
    const resetInputHandler = () => {
        setNewAppointment({
            appointment_date: "",
            emailWorker: "",
            nameJob: "",
        })
    }



    useEffect(() => {
        const fetchWorkers = async () => {
            //Function to retrieve workers
            try {
                const res = await bringWorkers(userReduxData.token)
                setWorkers(res)
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPortfolios = async () => {
            try {
                //Function to retrieve jobs
                const res = await bringPortfolios(userReduxData.token)
                setPortfolios(res)
            } catch (error) {
                console.log(error);
            }
        }

        fetchWorkers()
        fetchPortfolios()
    }, [])

    return (
        <>
            <Button className={classNameProp} onClick={()=>{
                modalFormProp=== "edit" && functionEmit(appointmentId)
                handleShow()
                }}>
                {titleProp}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalFormProp === "new" ? ("New Appointment") : modalFormProp === "edit" ? ("Edit Appointment") : ("Delete Appointment")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalFormProp === "new"
                        ? (
                            <div className='modalNewAppointment-design'>
                                <CustomInput
                                    errorText={""}
                                    typeProp={"datetime-local"}
                                    nameProp={"appointmentDate"}
                                    placeholderProp={"Date"}
                                    handlerProp={(e) => inputHandler(e)}
                                    onBlurHandler={(e) => inputHandler(e)}
                                />
                                <select onChange={(e) => inputHandler(e)} name="emailWorker" >
                                    <option value="" hidden >Select Worker...</option>
                                    {workers.map((element) => {
                                        return (<option key={element.id} value={element.email}>{element.firstName}</option>)
                                    })}
                                </select>
                                <select onChange={(e) => inputHandler(e)} name="nameJob" >
                                    <option value="" hidden >Select Job...</option>
                                    {portfolios.map((element) => {
                                        return (<option key={element.id} value={element.name}>{element.name}</option>)
                                    })}
                                </select>
                            </div>
                        )
                        : modalFormProp === "edit"
                            ? (<>
                                <CustomInput
                                    typeProp={"datetime-local"}
                                    nameProp={"appointmentDate"}
                                    errorText={""}
                                    isDisabled=""
                                    placeholderProp={"Date"}
                                    handlerProp={inputHandlerProp}
                                    onBlurHandler={(e) => inputHandlerProp(e)}
                                    value={`${dayjs(appointmentData.appointmentDate).format('YYYY-MM-DDTHH:mm')}`}
                                />
                            </>
                            )
                            : ("Are you sure?")
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button className='text-danger' onClick={() => {
                        {
                            modalFormProp === "new" && resetInputHandler()
                        }
                        handleClose()
                    }}>
                        Close
                    </Button>
                    <Button className='text-success' onClick={
                        () => {

                            {
                                modalFormProp === "new" ? (createAppointment(newAppointment, token))
                                : modalFormProp === "edit" ? updateAppointmentById(userType,appointmentData,appointmentData.id, token)
                                    : modalFormProp === "delete" && deleteAppointmentById(userType,token,appointmentId)
                            }
                            handleClose()
                        }}>
                        {modalFormProp === "delete" ? "Delete" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AppointmentModal;
