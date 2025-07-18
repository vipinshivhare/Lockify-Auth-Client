import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";


const Menubar = () => {
    const navigate = useNavigate()
    return (
       <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
           <div className="d-flex align-items-center ">

               <img src={assets.padlock} alt="logo" width={42} height={42} />
                <span className="fw-bold fs-4 text-dark"> Lockify</span>
           </div>

           <div className="btn btn-outline-dark rounded-pill px-3" onClick={()=> navigate("/login")}>
               Login <i className="bi bi-arrow-right ms-2"></i>

           </div>

       </nav>
    )
}

export default Menubar;