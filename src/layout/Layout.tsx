import { Link, Outlet } from "react-router-dom";
import './ui/Layout.css'
import Label from "../features/label/Label";
import LabelTypes from "../features/label/types/LabelTypes";
import { useContext } from "react";
import { AppContext } from "../features/AppContext";

export default function Layout() {

    const{user} = useContext(AppContext);
const profileTitle = user == null? "Enter" :"Profile";
    return <>
        <header><nav className="navbar navbar-expand-lg border-bottom">
            <div className="container-fluid ">
                <Link to="/" className="navbar-brand" title="Home Page" aria-label="Home Page">
                    Commerce
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <li className="nav-item">
                           <Label title="Catalog" type={LabelTypes.Black} />
                    </li>

                    <form className="d-flex flex-grow-1" role="search">
                        <input className="form-control me-2 nav-search" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to="/" className="nav-link " title="Trade-In" aria-label="Trade-In" >
                               <Label title="Trade In" />
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/privacy" className="nav-link"
                                title="Repair" aria-label="Repair">
                              <Label title="Repair" type={LabelTypes.Violet} />
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/auth" className="nav-link"
                                title={profileTitle} aria-label={profileTitle}>
                               <Label title = {profileTitle} type={LabelTypes.Blue} />
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/privacy" className="nav-link"
                                title="Cart" aria-label="Cart">
                               <Label title="Cart" type={LabelTypes.Grey} />

                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
        </header>
        <main ><Outlet /></main>
        <footer className=" border-top  p-3 ">&copy; IT Step University &copy; KN-P-231, 2025 &emsp;
            Розробка комерційних додатків &emsp;
            <Link to="/privacy" >Security Policy </Link>
        </footer>
    </>
}