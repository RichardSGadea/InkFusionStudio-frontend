import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { bringAllClients, bringAllWorkers, bringOneUser, deleteUserById} from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import ModalCustom from '../ModalCustom/ModalCustom';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./CustomTable.css"

function CustomTable() {

    //To save all clients or workers depending selected
    const [infoData, setInfoData] = useState([])

    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    //To control pages change
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    //To control delete button hidden
    const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);


    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const myPassport = useSelector(getUserData);
    const token = myPassport.token

    const inputHandler = (e) => {
        setUserProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const bringUserProfile = async (id) => {
        //Function to retrieve one info user
        try {
            const response = await bringOneUser(token, id)
            setUserProfile(response)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
            //Function to retrieve users depending on the role
            try {
                const usersSelected = sessionStorage.getItem("selected")
                if (usersSelected === "clients") {
                    const response = await bringAllClients(token, currentPage)
                    setInfoData(response.clients)
                    setTotalPages(response.total_pages)
                }
                if (usersSelected === "workers") {
                    const response = await bringAllWorkers(token, currentPage)
                    setInfoData(response.workers)
                    setTotalPages(response.total_pages)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers()
    }, [currentPage])

    
    const deleteUserStepOne = (id) => {
        // Function to start deleted user and show or hidden confirmation button
        if (areYouDeletingMe === id) {
            setAreYouDeletingMe(null);
        } else {
            setAreYouDeletingMe(id);
        }
    };

    const deleteUser = async(id,role) => {
        // Function to delete user
        const res = await deleteUserById(token,id,role)
        navigate("/")
        setTimeout(() => {
            navigate("/users")
        })
    } 

    return (
        <div className='container-fluid'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>userId</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {infoData.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.email}</td>
                                <td>{item.isActive ? "si" : "no"}</td>
                                <td>
                                    <div className='btn d-flex align-items-end'>
                                        <ModalCustom
                                            functionEmit={bringUserProfile}
                                            profileData={userProfile}
                                            inputHandler={inputHandler}
                                            userId={item.id}
                                            path={path}
                                            token={token}
                                        />
                                        <div
                                            className="delete-button"
                                            onClick={() => deleteUserStepOne(item.id)}
                                        >Delete</div>
                                        <div
                                            className={
                                                // Deleted confirm button
                                                areYouDeletingMe === item.id
                                                    ? "delete-button confirm-delete "
                                                    : "delete-button confirm-delete display-none"
                                            }
                                            onClick={() => {
                                                deleteUser(item.id,item.roleId)
                                                
                                            }}
                                        >Confirm</div>

                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <button disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {

                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                }
            }}>{"<-"}</button>
            <button disabled={currentPage == totalPages ? "disabled" : ""} onClick={() => {
                if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1)
                }
            }}>{"->"}</button>

        </div>
    );
}

export default CustomTable;