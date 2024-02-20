import { renderHook, waitFor } from "@testing-library/react"
import { act } from "@testing-library/react";
import useGetFact from "./use-get-fact"
import axios from "axios";
import { catFact } from "./catFact.fixture";

jest.mock('axios');

describe('useGetFact', () => {
    it('fetches successfully data from cat API', async () => {
        const mockData = catFact;
        const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: catFact })
        const { result } = renderHook(() => useGetFact());

        expect(result.current.error).toBe(null);

        await act(async () => {
            await expect(result.current.fetchFact()).resolves.toEqual(mockData);
        })

        axiosGetSpy.mockRestore();
    });
});
