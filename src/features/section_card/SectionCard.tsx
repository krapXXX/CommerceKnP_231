import {Link} from "react-router-dom";
import type { HomePageSection } from "./types/section";
import "./ui/SectionCard.css";

export default function SectionCard({section} : {section: HomePageSection}) {
    return <Link className="section-card text-decoration-none" to={"/section/" + section.slug}>
        <div>
            <img src={section.imageUrl}/>
        </div>
        <p>{section.title}</p>
        </Link>;
}