import ButtonTypes from "./types/ButtonTypes";
import "./ui/SiteButton.css";

export default function SiteButton(
    { buttonType,text,action }: { buttonType: ButtonTypes, text:string, action?:()=>void}
) {

    const extraClass =
        buttonType == ButtonTypes.Red ? 'button-red'
        : buttonType == ButtonTypes.White ? 'button-white'
        : "";

    return <div className={"site-button " + extraClass}onClick = {action}>
        {text}
    </div>;
}