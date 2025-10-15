import { useState } from "react";
import css from "../App/App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import type { NoteListData } from "../../types/note";

const App = () => {
  const [search, setSearch] = useState("");

  const { data } = useQuery<NoteListData>({
    queryKey: ["notes", search],
    queryFn: () => fetchNotes(search, 1),
  });
console.log(data.notes);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      <NoteList notes={data?.notes || []}/>
    </div>
  );
};

export default App;

