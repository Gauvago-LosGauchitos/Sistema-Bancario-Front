import { NavBar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import './AdminPanel.css';

export const AdminPanel = () => {
    return (
        <div>
            <NavBar  />
            <div className="widget-container">
                <div className="grid-container">
                    <div className="grid-item">
                        <div className="flex-container">
                            <img src="https://placehold.co/50x50" alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">520</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="flex-container">
                            <img src="https://placehold.co/50x50" alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">6969</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="flex-container">
                            <img src="https://placehold.co/50x50" alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">7509</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="flex-container">
                            <img src="https://placehold.co/50x50" alt="icon" className="grid-icon" />
                            <div>
                                <p className="stat-number">2110</p>
                                <p className="stat-label"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-container">
                    <h2 className="section-title">Bauchito</h2>
                    <img src="https://placehold.co/800x200" alt="chart" className="chart" />
                </div>

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
                                <tr>
                                    <td><img src="https://placehold.co/50x50" alt="icon" className="grid-icon" /></td>
                                    <td>John Doe</td>
                                    <td>Mar 10, 2023</td>
                                    <td>Apr 15, 2023</td>
                                    <td>123-456-7890</td>
                                    <td>$200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="staff-container">
                    <h2 className="section-title">Admin Staff</h2>
                    <div className="staff-grid">
                        <div className="staff-member">
                            <img src="https://placehold.co/100x100" alt="staff" className="staff-icon" />
                            <p className="staff-name">John Smith</p>
                            <p className="staff-role">Admin</p>
                        </div>
                    </div>
                </div>

                <div className="activity-container">
                    <h2 className="section-title">Recent Activity</h2>
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
