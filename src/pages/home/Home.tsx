import ButtonTypes from "../../features/buttons/types/ButtonTypes";
import SiteButton from "../../features/buttons/SiteButton";
import { useEffect, useState } from "react";
import type { HomePageSection } from "../../features/section_card/types/section";
import Sectioncard from "../../features/section_card/SectionCard";
import "./ui/Home.css"
import SectionDao from "../../entities/section/api/SectionDao";

export default function Home() {
    const [homePageContent, setHomePageContent] = useState<HomePageContent | null>(null);
    
    useEffect( () => {
        SectionDao.getSections().then(s=> 
             setHomePageContent({
                sections:s
       })
        )
      
    }, [])
    return <>
        <h1 className="display-4"><i className="bi bi-house-heart"></i>Home, sweet home</h1>
        <SiteButton buttonType={ButtonTypes.Red} text="Red Button" />
        <SiteButton buttonType={ButtonTypes.White} text="White Button" />

        <div className="content-container">
            {homePageContent?.sections.map(sec => <Sectioncard section={sec} key={sec.title} />)}
        </div>
    </>
}


type HomePageContent = {
    sections: Array<HomePageSection>;
}

const homePageJson: HomePageContent = {
    "sections": []
}
