import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type ISearchResult from "../../entities/search/model/ISearchResult";
import SearchDao from "../../entities/search/api/SearchDao";
import { AppContext } from "../../features/app_context/AppContext";

export default function Search() {
    const { slug } = useParams();
    const search = decodeURIComponent(slug ?? "")
    const [result, setResult] = useState<ISearchResult | null>(null)
    const { setBusy } = useContext(AppContext);
const taskRef = useRef<Promise<ISearchResult | null>>(null)

    useEffect(() => {
        setBusy(true);
        taskRef.current = SearchDao.GetSearchResult(search)
        SearchDao.GetSearchResult(search)
            .then(setResult)
            .finally(() => setBusy(false))

            return()=>{
                if(taskRef.current){
                    console.log("Search task cancelled")
                }
            }
    }, [slug])

    return (
        <>
            <h1>Search for: </h1>
            `{search}`
            <br />
            <br />
            {result != null && <>
                <i>Sections: </i>{result.sections.length == 0
                    ? <b>No matches</b>
                    : <b>Found a match</b>}
                <br />
                <i>Items: </i>{result.products.length == 0
                    ? <b>No matches</b>
                    : <b>Found a match</b>}
            </>}
        </>
    );
}
