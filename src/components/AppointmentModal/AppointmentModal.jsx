import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomInput } from '../CustomInput/CustomInput';
import { bringPortfolios, bringWorkers, createAppointment } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

function AppointmentModal({ titleProp, classNameProp, modalFormProp }) {
    // const [modalForm,setModalForm] = useState(modalFormProp)
    const [appointmentData, setAppointmentData] = useState({
        appointment_date: "",
        emailWorker: "",
        nameJob: "",
    })

    const [workers, setWorkers] = useState([])
    const [portfolios, setPortfolios] = useState([])
    const navigate = useNavigate()

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const [show, setShow] = useState(false);

    const handleClose = () => {
        navigate("/")
        setTimeout(() => {
            navigate("/appointments")
        })
        setShow(false)


    };
    const handleShow = () => setShow(true);

    const inputHandler = (e) => {
        setAppointmentData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    const resetInputHandler = () => {
        setAppointmentData({
            appointment_date: "",
            emailWorker: "",
            nameJob: "",
        })
    }

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const res = await bringWorkers(userReduxData.token)
                setWorkers(res)
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPortfolios = async () => {
            try {
                const res = await bringPortfolios(userReduxData.token)
                setPortfolios(res)
            } catch (error) {
                console.log(error);
            }
        }

        fetchWorkers()
        fetchPortfolios()
    }, [])

    useEffect(() => {
        console.log(appointmentData);
    }, [appointmentData])


    return (
        <>
            <Button className={classNameProp} onClick={handleShow}>
                {titleProp}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalFormProp === "new" ? ("New Appointment") : modalFormProp === "edit" ? ("Edit Appointment") : ("Delete Appointment")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalFormProp === "new"
                        ? (
                            <>
                                <CustomInput
                                    errorText={""}
                                    typeProp={"datetime-local"}
                                    nameProp={"appointment_date"}
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
                            </>
                        )
                        : modalFormProp === "edit"
                            ? (<>
                                <CustomInput
                                    errorText={""}
                                    typeProp={"datetime-local"}
                                    nameProp={"appointment_date"}
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
                            </>
                            )
                            : ("adios")
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
                            handleClose()
                            createAppointment(appointmentData, token)
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AppointmentModal;