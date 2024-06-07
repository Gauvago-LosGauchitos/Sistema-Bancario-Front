import { NavBar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import { useUser } from '../../shared/hooks/useUser.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import './AdminPanel.css';
import dolar from '../../assets/img/dolar.png'
import euro from '../../assets/img/euro.png'
import imgDefault from '../../assets/img/imgPerfil.png'
import register from '../../assets/img/register.png'
import delet from '../../assets/img/delete.png'
import edit from '../../assets/img/editar.png'





export const AdminPanel = () => {
    const { users, admins, loading, exchangeRate, exchangeRateEUR } = useUser();


    return (
        <div>
            <NavBar />
            <div className="widget-container">
                <div className="grid-container">
                    <div className="grid-item">
                        <div className="flex-container">
                            <img src={register} alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">Registra un usuario</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
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
                            <img src={edit} alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">Editar a un usuario</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <Box className="chart-container" sx={{ mb: 3 }}>
                    <Typography variant="h5" className="section-title">Tipo de Cambio (USD/GTQ/EUR)</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {exchangeRate ? (
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <img src={dolar} alt="exchange icon" className="exchange-rate-icon" />
                            <Typography variant="h6" className="exchange-rate-title">1 USD =</Typography>
                            <Typography variant="h6" className="exchange-rate">{exchangeRate}</Typography>
                            <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                        </Paper>

                    ) : (
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            No se pudo obtener el tipo de cambio
                        </Paper>
                    )}
                    {exchangeRate ? (
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <img src={euro} alt="exchange icon" className="exchange-rate-icon" />
                            <Typography variant="h6" className="exchange-rate-title">1 EUR =</Typography>
                            <Typography variant="h6" className="exchange-rate">{exchangeRateEUR}</Typography>
                            <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                        </Paper>

                    ) : (
                        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            No se pudo obtener el tipo de cambio
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
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map(user => (
                                    <tr key={user._id}>
                                        <td><img src={users.imgProfile||imgDefault} alt="icon" className="grid-icon" /></td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.DPI}</td>
                                        <td>Q{user.monthlyIncome}</td>
                                        <td>{user.phone}</td>
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
                                <img src={admins.imgProfile||imgDefault} alt="staff" className="staff-icon" />
                                <p className="staff-name">{admin.name}</p>
                                <p className="staff-role">{admin.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="activity-container">
                    <h2 className="section-title">Cuentas con mas movimiento</h2>
                    <ul className="activity-list">
                        <li>5 mins ago - John Doe checked in</li>
                        <li>10 mins ago - Jane Doe checked out</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
