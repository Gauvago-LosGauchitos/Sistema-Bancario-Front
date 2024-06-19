import React, { useEffect } from "react";
import './Service.css';
import { useService } from '../../shared/hooks/useService.jsx'
import { NavBar } from '../Navbar/Navbar.jsx'
import { useParams } from "react-router-dom";
import { Footer } from '../Footer/Footer.jsx';
import imgCompra from '../../assets/img/img-compra.png';



export const Services = () => {
    const { service, isLoading } = useService()
    console.log(service)

    let services = [];
    if (service && service.services) {
        console.log('waos')
        services = Array.isArray(service.services) ? service.services : [service.services];
    } else {
        console.log(services)
    }

    return (
        <div>
            <NavBar />
            


                <Footer />
            
        </div>
    )
}
