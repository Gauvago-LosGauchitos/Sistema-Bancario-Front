import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useService } from '../../shared/hooks/useService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '95vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    
};

const imageStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    border: '1px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
};

const hoverStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
    cursor: 'pointer',
};

export const EditServiceModal = () => {
    const { editAService, serviceFound, searchServiceByName, isLoading, error } = useService();
    const [open, setOpen] = useState(false);
    const [searchServiceName, setSearchServiceName] = useState('');
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        price: '',
        img: ''
    });
    const [serviceFoundFlag, setServiceFoundFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (serviceFound) {
            setServiceData(serviceFound);
            setServiceFoundFlag(true);
        }
    }, [serviceFound]);

    const handleOpen = () => {
        setOpen(true);
        setSearchServiceName('');
        setServiceData({
            name: '',
            description: '',
            price: '',
            img: ''
        });
        setServiceFoundFlag(false);
    };

    const handleClose = () => {
        setOpen(false);
        setSearchServiceName('');
        setServiceFoundFlag(false);
        setServiceData({
            name: '',
            description: '',
            price: '',
            img: ''
        });
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await searchServiceByName(searchServiceName);
            if (!serviceFound) {
                setServiceFoundFlag(false);
            }
        } catch (error) {
            console.error("Error al obtener el servicio:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const originalName = serviceFound.name;
            const data = serviceData;
            console.log(data.img)
            console.log({ data, originalName });
            await editAService(originalName, data);
            handleClose();
        } catch (error) {
            console.error("Error al editar el servicio:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setServiceData((prevData) => ({ ...prevData, img: file })); // Añadir el archivo de imagen al estado
        const reader = new FileReader();
        reader.onloadend = () => {
            setServiceData((prevData) => ({ ...prevData, img: reader.result })); // Actualizar la URL de la imagen en el estado
        };
        reader.readAsDataURL(file);
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
                        Editar Servicio
                    </Typography>
                    <TextField
                        label="Buscar por nombre del servicio"
                        value={searchServiceName}
                        onChange={(e) => setSearchServiceName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleSearch} variant="contained" color="primary" disabled={isLoading || loading}>
                        Buscar
                    </Button>
                    {loading && <Typography>Cargando...</Typography>}
                    {serviceFoundFlag && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Nombre"
                                name="name"
                                value={serviceData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextareaAutosize
                                aria-label="Descripción"
                                minRows={5}
                                placeholder="Descripción"
                                style={{ width: '100%', marginTop: '16px', backgroundColor: 'white', color: 'black'  }}
                                name="description"
                                value={serviceData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Precio"
                                name="price"
                                value={serviceData.price}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <div
                                style={imageStyle}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <img
                                    src={serviceData.img || 'https://via.placeholder.com/200'}
                                    alt="Imagen del servicio"
                                    style={{ width: '90%', height: '90%', objectFit: 'cover' }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="service-image-upload"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="service-image-upload" style={{ ...hoverStyle, opacity: hover ? 1 : 0 }}>
                                    Editar Imagen
                                </label>
                            </div>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Guardar
                            </Button>
                        </form>
                    )}
                </Box>
            </Modal>
        </div>
    );
};
