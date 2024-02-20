import axios from "axios";
import { useCallback, useState } from "react";
import { catFetchUrl } from "../variables";

export type CatFactType = {
    text: string,
    _id: string,
};

export const useGetFact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFact = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(catFetchUrl);
            const data = response.data;
            setLoading(false);
            return data;
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                setLoading(false);
                setError(error.message);
            }
        }
    }, []);

    return { loading, error, fetchFact };
};

export default useGetFact;