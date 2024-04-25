import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { bringAllClients, bringAllWorkers, bringOneUser } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import "./CustomTable"
import ModalCustom from '../ModalCustom/ModalCustom';
import { useLocation } from 'react-router-dom';

function CustomTable() {

    const [infoData, setInfoData] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [userProfile, setUserProfile] = useState({})

    const location = useLocation()
    const path = location.pathname

    const myPassport = useSelector(getUserData);
    const token = myPassport.token

    const bringUserProfile = async (id) => {
        try {
            const response = await bringOneUser(token, id)
            setUserProfile(response)
        } catch (error) {
            console.log(error);
        }
    }

    const inputHandler = (e) => {
        setUserProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const fetchUsers = async () => {
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
                                    <div className='btn d-flex align-items-end' onClick={() => bringUserProfile(item.id)}>
                                        <ModalCustom
                                            profileData={userProfile}
                                            inputHandler={inputHandler}
                                            path={path}
                                            token={token}
                                        />
                                        <button>D</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <button disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {
                // console.log(currentPage);
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