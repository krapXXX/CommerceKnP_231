import type ISearchResult from "../model/ISearchResult";

export default class SearchDao {
    static GetSearchResult(data: string): Promise<ISearchResult> {
        return new Promise<ISearchResult>((resolve, reject) => {
            setTimeout(
                () => resolve({ 
                    products: [], 
                    sections: [] 
                }),
                1300
            );
        });
    }
}


