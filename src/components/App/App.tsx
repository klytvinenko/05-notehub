import { useState } from "react";
import css from "../App/App.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import type { NoteListData } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";


const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
 const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<NoteListData>({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: (previousData) => previousData,
  });
  const notes = data?.notes ?? [];
  const total_pages = data?.totalPages ?? 0;
  const onOpen = () => {
    setIsOpenModal(true);
    //document.body.style.overflow = "hidden";
  };
  const onClose = () => {
    setIsOpenModal(false);
    //document.body.style.overflow = "visible";
  };

const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {total_pages > 1 && (
          <Pagination totalPages={total_pages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {notes.length > 0 && <NoteList notes={notes || []} />}
      {notes.length === 0  && !isLoading && <p>No notes found</p>}
      {isOpenModal && <Modal onClose={onClose}> 
        <NoteForm onClose={onClose}/>
        </Modal>}
    </div>
  );
};

export default App;
