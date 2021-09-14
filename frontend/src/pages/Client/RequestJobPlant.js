import Navbar from "../../components/Client/navbar/Navbar";
import Sidebar from "../../components/Client/sidebar/Sidebar";
import RequesJobPlant from '../../components/Client/request/Plantform';
import Rightbar from "../../components/Client/rightbar/Rightbar";
import "./clientDash.css"

export default function ClientDash() {
  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <RequesJobPlant />
        <Rightbar/>
      </div>
    </div>
  );
}