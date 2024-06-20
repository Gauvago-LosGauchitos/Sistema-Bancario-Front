import React, { useState, useEffect, useCallback } from 'react';
import { NavBar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import { useUser } from '../../shared/hooks/useUser.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import './AdminPanel.css';
import dolar from '../../assets/img/dolar.png';
import history from '../../assets/img/history.png';
import mayor from '../../assets/img/mayor.png';
import menor from '../../assets/img/menor.png';
import euro from '../../assets/img/euro.png';
import imgDefault from '../../assets/img/imgPerfil.png';
import register from '../../assets/img/register.png';
import delet from '../../assets/img/delete.png';
import edit from '../../assets/img/editar.png';
import compra from '../../assets/img/compra.png';
import transferencia from '../../assets/img/transferencia.png';
import deposito from '../../assets/img/deposito.png';
import iconAlert from '../../assets/img/gifAlertTransfer.gif';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EditUserModal } from '../../assets/Modal/EditUserModal.jsx';

export const AdminPanel = () => {
    const { users, admins, loading, deleteUserHandler, exchangeRateEUR, exchangeRate, userFive, fetchLastMovements, setUserFive, topAccounts } = useUser();
    const [userData, setUseData] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        setFilteredAccounts(topAccounts);
    }, [topAccounts]);

    const handleRegister = () => {
        navigate('/register');
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Eliminar Usuario',
            html: `<input id="swal-input1" class="swal2-input" placeholder="Ingrese el nombre de usuario">`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const userName = Swal.getPopup().querySelector('#swal-input1').value;
                if (!userName) {
                    Swal.showValidationMessage('El campo Nombre de usuario es obligatorio');
                }
                return { userName: userName };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUserHandler(result.value.userName);
                    Swal.fire(
                        'Eliminado!',
                        `El usuario ${result.value.userName} ha sido eliminado.`,
                        'success'
                    );
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar el usuario.',
                        'error'
                    );
                }
            }
        });
    };

    const handleGetLastFive = async (user) => {
        setCurrentUser(user);
        setUseData(user._id);
        await fetchLastMovements(user._id);
    };

    const displayMovements = useCallback(async () => {
        if (userFive && userFive.transfers && Array.isArray(userFive.transfers) && userFive.transfers.length > 0) {
            const movementsList = userFive.transfers.map((movement, index) => {
                let details = '';
                switch (movement.motion) {
                    case 'BUYED':
                        const serviceName = movement.services ? movement.services.name : 'Nombre no disponible';
                        details = `
                            <ul>
                             <img src=${compra} alt="Compra Icon" class="movement-icon" />
                                <li><strong>Fecha</strong>: ${new Date(movement.date).toLocaleString()}</li>
                                <li><strong>Servicio</strong>: ${serviceName}</li>
                                <li><strong>Movimiento</strong>: ${movement.motion}</li>
                            </ul>`;
                        break;
                    case 'DEPOSIT':
                        details = `
                            <ul>
                            <img src=${deposito} alt="Compra Icon" class="movement-icon" />
                                <li><strong>Fecha</strong>: ${new Date(movement.date).toLocaleString()}</li>
                                <li><strong>Monto</strong>: ${movement.amount}</li>
                                <li><strong>Cuenta depositada</strong>: ${movement.recipientAccount.accountNumber} || Dueño: ${movement.recipientAccount.client.username} </li>
                                <li><strong>Movimiento</strong>: ${movement.motion}</li>
                            </ul>`;
                        break;
                    case 'TRANSFER':
                        details = `
                            <ul>
                            <img src=${transferencia} alt="Compra Icon" class="movement-icon" />
                                <li><strong>Fecha</strong>: ${new Date(movement.date).toLocaleString()}</li>
                                <li><strong>Monto</strong>: ${movement.amount}</li>
                                <li><strong>Destinatario</strong>: ${movement.recipientAccount.client.username} || No. Cuenta: ${movement.recipientAccount.accountNumber}</li>
                                <li><strong>Proveniente de</strong>: ${movement.rootAccount.client.username} || No. Cuenta: ${movement.rootAccount.accountNumber}</li>
                                <li><strong>Movimiento</strong>: ${movement.motion}</li>
                            </ul>`;
                        break;
                    default:
                        details = `<ul>Movimiento desconocido</ul>`;
                }
                return `<li key=${index}>${details}</li>`;
            }).join('');

            Swal.fire({
                title: `Últimos 5 movimientos del usuario ${currentUser.name}`,
                html: `
        <div class="swal2-html-container-custom">
            <img src=${iconAlert} alt="Loading GIF" class="custom-icon">
            <ul>${movementsList}</ul>
        </div>`,
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    popup: 'swal2-popup-custom',
                    title: 'swal2-title-custom',
                    htmlContainer: 'swal2-html-container-custom',
                },
                didClose: () => {
                    setUserFive(null);
                }
            });
        } else {
            Swal.fire({
                title: `No se encontraron movimientos para el usuario ${currentUser.name}`,
                icon: 'info'
            });
        }
    }, [currentUser, userFive]);

    useEffect(() => {
        if (currentUser && userFive) {
            displayMovements();
        }
    }, [userFive, currentUser, displayMovements]);

    const sortAccounts = (order) => {
        const sortedAccounts = [...topAccounts].sort((a, b) => {
            if (order === 'asc') {
                return a.movements - b.movements;
            } else {
                return b.movements - a.movements;
            }
        });
        setFilteredAccounts(sortedAccounts);
    };

    return (
        <div>
            <NavBar />
            <div className="widget-container">
                <div className="grid-container">
                    <div className="grid-item">
                        <div onClick={handleRegister} className="flex-container">
                            <img src={register} alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">Registrar a un usuario</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleDelete} className="grid-item">
                        <div className="flex-container">
                            <img src={delet} alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">Eliminar a un Usuario</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="flex-container">
                            <EditUserModal />
                            <img src={edit} alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">Editar a un usuario</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Box className="chart-container" sx={{ mb: 3 }}>
                    <Typography variant="h5" className="section-title">Tipo de Cambio (USD/GTQ/EUR)</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {(
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <img src={dolar} alt="exchange icon" className="exchange-rate-icon" />
                            <Typography variant="h6" className="exchange-rate-title">1 USD =</Typography>
                            <Typography variant="h6" className="exchange-rate">{exchangeRate}</Typography>
                            <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                        </Paper>
                    )}
                    {(
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <img src={euro} alt="exchange icon" className="exchange-rate-icon" />
                            <Typography variant="h6" className="exchange-rate-title">1 EUR =</Typography>
                            <Typography variant="h6" className="exchange-rate">{exchangeRateEUR}</Typography>
                            <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                        </Paper>
                    )}
                </Box>

                <div className="table-container">
                    <h2 className="section-title">Clients</h2>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Profile Picture</th>
                                    <th>Client Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>DPI</th>
                                    <th>Amount</th>
                                    <th>Phone</th>
                                    <th>Last Five</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map(user => (
                                    <tr key={user._id}>
                                        <td><img src={user.imgProfile || imgDefault} alt="icon" className="grid-icon" /></td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.DPI}</td>
                                        <td>Q{user.monthlyIncome}</td>
                                        <td>{user.phone}</td>
                                        <td><button onClick={() => handleGetLastFive(user)} className='lastFive'><img src={history} alt="history icon" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="staff-container">
                    <h2 className="section-title">Admin Staff</h2>
                    <div className="staff-grid">
                        {Array.isArray(admins) && admins.map(admin => (
                            <div className="staff-member" key={admin._id}>
                                <img src={admin.imgProfile || imgDefault} alt="staff" className="staff-icon" />
                                <p className="staff-name">{admin.name}</p>
                                <p className="staff-role">{admin.role}</p>
                                <button onClick={() => handleGetLastFive(admin)} className='lastFive'><img src={history} alt="history icon" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="activity-container">
                    <h2 className="section-title">Cuentas con más movimiento</h2>
                    <div className="filter-buttons">
                        <button className="filter-button" onClick={() => sortAccounts('asc')}>
                            <img src={mayor} alt="Ascendente" />
                            Ordenar de Menor a Mayor
                        </button>
                        <button className="filter-button" onClick={() => sortAccounts('desc')}>
                            <img src={menor} alt="Descendente" />
                            Ordenar de Mayor a Menor
                        </button>
                    </div>
                    {Array.isArray(filteredAccounts) && filteredAccounts.map((topAccount, index) => (
                        <div className="c p5" key={topAccount.accountNumber}>
                            <div className="r">
                                <div className="clg7 mx">
                                    <div className="cd rd0 bd0 sh">
                                        <div className="cb pd5">
                                            <div className="tr">
                                                <table className="tb">
                                                    <thead>
                                                        <tr>
                                                            <th scope="c">#</th>
                                                            <th scope="c">No. Account</th>
                                                            <th scope="c">Owner</th>
                                                            <th scope="c">Movements</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="r">{index + 1}</th>
                                                            <td>{topAccount.accountNumber}</td>
                                                            <td>{topAccount.accountOwner}</td>
                                                            <td>{topAccount.movements}</td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};
