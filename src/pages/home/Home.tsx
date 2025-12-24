import { useEffect, useState } from "react";
import type { HomePageSection } from "../../features/section_card/types/section";
import SectionCard from "../../features/section_card/SectionCard";
import "./ui/Home.css";
import SectionDao from "../../entities/section/api/SectionDao";

export default function Home() {
    const [homePageContent, setHomePageContent] = useState<HomePageContent|null>(null);

    useEffect(() => {
        SectionDao.getSections().then(s => 
            setHomePageContent({
                sections: s
            }));
    }, []);

    return <>
    <h1 className="display-4"><i className="bi bi-house-heart"></i> Home, sweet home</h1>
    
    <div className="content-container">
        {homePageContent?.sections.map(sec => 
            <SectionCard section={sec} key={sec.title} />)}
    </div>

    </>;
}

type HomePageContent = {
    sections: Array<HomePageSection>,
}