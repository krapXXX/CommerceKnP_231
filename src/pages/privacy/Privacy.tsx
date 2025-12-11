import { useContext, useEffect, useState } from "react";
import SiteButton from "../../features/buttons/SiteButton";
import ButtonTypes from "../../features/buttons/types/ButtonTypes";
import "./ui/Privacy.css"
import { AppContext } from "../../features/app_context/AppContext";



export default function Privacy() {
    const { showToast } = useContext(AppContext);

    return <>
        <h1 className="display-4"><i className="bi bi-shield-check"></i> Політика конфіденційності</h1>
        <SiteButton
            buttonType={ButtonTypes.Red}
            text="Toast"
            action={() => showToast({ message: "Hello " + Math.random() })} />
        <SiteButton
            buttonType={ButtonTypes.White}
            text="Long Toast"
            action={() => showToast({
                message: "Long " + Math.random(),
                timeout: 4000
            })} />


    </>;


}