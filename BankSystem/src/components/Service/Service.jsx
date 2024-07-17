import React, { useEffect, useState } from "react";
import './Service.css';
import { useService } from '../../shared/hooks/useService.jsx'
import { NavBar } from '../Navbar/Navbar.jsx'
import { useParams } from "react-router-dom";
import { Footer } from '../Footer/Footer.jsx';
import imgCompra from '../../assets/img/img-compra.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../../assets/spinner/Spinner"
import Swal from "sweetalert2";

export const Services = () => {
    const [loading, setLoading] = useState(true)
    const { service, isLoading, bougth, balance } = useService()

    let services = [];
    if (service && service.services) {
        services = Array.isArray(service.services) ? service.services : [service.services];
    }

    const handleBuyed = (service) => {
        Swal.fire({
            title: 'Realizar Compra',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let quantity = '1'
                    await bougth(service.name, quantity);
                    Swal.fire(
                        'Compra realizada!',
                        `Servicio ${service.name} ha sido adquirido.`,
                        'success'
                    );
                } catch (error) {
                    console.error('Error al realizar la compra:', error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al realizar la compra.',
                        'error'
                    );
                }
            }
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="parte1">
                    <NavBar />
                    <div className="galeria">
                        {!isLoading && Array.isArray(service) && service.map(service => (
                            <div className="contenido" key={service._id}>
                                <img className="mi-imagen" src={service.img || imgCompra} alt="" />
                                <h3 >{service.name}</h3>
                                <p className="Descrip">{service.description}</p>
                                <h6 className="Price">Q{service.price}</h6>
                                <ul className="parte2">
                                    <li className="start1"><i className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></i></li>
                                    <li className="start1"><i className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></i></li>
                                    <li className="start1"><i className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></i></li>
                                    <li className="start1"><i className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></i></li>
                                    <li className="start1"><i className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></i></li>
                                </ul>
                                <button className="comprar-1" onClick={()=> handleBuyed(service)}>Comprar</button>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
