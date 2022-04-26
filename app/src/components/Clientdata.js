import { useLocation } from "react-router-dom";
import EditClientComponent from "./EditClientComponent";

function Clientdata(){
    const props = useLocation(); 

    return <EditClientComponent {...props}/>
}

export default Clientdata;