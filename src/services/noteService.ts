import axios from "axios";
import type { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteList {
    results: Note[],
}
export const fetchNotes = async(search: string, page: number): Promise <NoteList> => {
    try {
        const res = await axios.get<NoteList>(
            `https://notehub-public.goit.study/api/notes`,
            {
                params: {
                    search,
                    page,
                    perPage: 10,
                    sortBy: "created",
                },
                headers: {
                    Authorization: `Bearer ${myKey}`,
                }
            }
        ) 
        const result = res.data;
        console.log(result);
        return result;
    }
    catch(error) {
        console.log(error);
        return { results: []};
    }
}