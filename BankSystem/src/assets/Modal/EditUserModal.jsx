import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../shared/hooks/useUser';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const EditUserModal = () => {
    const { searchUser, userFound, editUserHandler, loading, error, fetchUsers } = useUser(); // Usar el hook useUser
    const [open, setOpen] = useState(false);
    const [searchUsername, setSearchUsername] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        address: '',
        phone: '',
        email: '',
        monthlyIncome: '',
        role: ''
    });
    const [userFoundFlag, setUserFoundFlag] = useState(false);

    useEffect(() => {
        if (userFound) {
            setUserData(userFound);
            setUserFoundFlag(true);
        }
    }, [userFound]);

    const handleOpen = () => {
        setOpen(true);
        setUserData(null)
    }
        
    const handleClose = () => {
        setOpen(false);
        setSearchUsername('');
        setUserFoundFlag(false);
    };

    const handleSearch = async () => {
        try {
            await searchUser(searchUsername);
            if (!userFound) {
                setUserFoundFlag(false);
                
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Clonar userData y eliminar campos restringidos
        const { DPI, password, ...filteredData } = userData;
    
        await editUserHandler(searchUsername, filteredData);
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            color: 'inherit',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Editar Usuario
                    </Typography>
                    <TextField
                        label="Buscar por nombre de usuario"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleSearch}>
                        Buscar
                    </Button>
                    {userFoundFlag && (
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginRight: '16px', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Nombre de Usuario"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Dirección"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginRight: '16px', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Teléfono"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Correo Electrónico"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginRight: '16px', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Ingreso Mensual"
                                    name="monthlyIncome"
                                    value={userData.monthlyIncome}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginBottom: '16px' }}
                                />
                                <TextField
                                    label="Rol"
                                    name="role"
                                    value={userData.role}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ width: 'calc(50% - 8px)', marginRight: '16px', marginBottom: '16px' }}
                                />
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Guardar
                                </Button>
                            </Box>
                        </form>
                    )}
                    {loading && <Typography>Cargando...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Modal>
        </div>
    );
};
