import React, { useState } from 'react';
import './ServiceForm.css';
import { useService } from '../../shared/hooks/useService';

export const ServiceForm = () => {
    const { addNewService } = useService();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        img: null   
    });

    const handleChange = (e) => {
        const { name, files, value } = e.target;

        if (name === 'file') {
            // Actualizar solo si hay archivos seleccionados
            if (files.length > 0) {
                setFormData({
                    ...formData,
                    img: files[0]  // Guardar el primer archivo seleccionado
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('img', formData.img);  // asegúrate de que 'img' es el campo correcto
    
        // Verificar el contenido de FormData
        for (let [key, value] of formDataToSend.entries()) { 
            console.log(`${key}: ${value}`);
        }
    
        try {
            await addNewService(formDataToSend);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name Service *</label>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description *</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Una descripción no tan larga"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="form-label">Precio *</label>
                    <input
                        className="form-input"
                        placeholder="00.00"
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file-upload" className="form-label">Una imagen del servicio *</label>
                    <div className="file-upload-container">
                        <div className="file-upload-content">
                            <svg className="file-upload-icon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H20C18.8954 8 18 8.89543 18 10V38C18 39.1046 18.8954 40 20 40H28C29.1046 40 30 39.1046 30 38V10C30 8.89543 29.1046 8 28 8Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 8H10C8.89543 8 8 8.89543 8 10V38C8 39.1046 8.89543 40 10 40H14C15.1046 40 16 39.1046 16 38V10C16 8.89543 15.1046 8 14 8Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M38 8H34C32.8954 8 32 8.89543 32 10V38C32 39.1046 32.8954 40 34 40H38C39.1046 40 40 39.1046 40 38V10C40 8.89543 39.1046 8 38 8Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="file-upload-text">
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <span>Choose file</span>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="submit-button">Registrar</button>
                </div>
            </form>
        </div>
    );
};
