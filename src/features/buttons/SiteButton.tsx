import type { ReactNode } from "react";
import ButtonTypes from "./types/ButtonTypes";
import "./ui/SiteButton.css";

export default function SiteButton({ buttonType, text, action, children }: {
    buttonType: ButtonTypes,
    text?: string,
    action?: () => void,
    children?: ReactNode
}) {

    const extraClass =
        buttonType == ButtonTypes.Red ? "button-red"
            : buttonType == ButtonTypes.White ? "button-white"
                : "";

    return <div role="button" className={"site-button " + extraClass} onClick={action}>
        {text}
        {children}
    </div>;
}
