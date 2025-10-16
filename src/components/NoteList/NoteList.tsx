import { deleteNote } from "../../services/noteService";
import type { NoteListData} from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface NoteListProps {
//   notes: Note[];
// }

const NoteList = ({ notes }: NoteListData) => {
   const queryClient = useQueryClient();

  const {mutate} = useMutation ({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      })
    }
  })

  const handleDelete = (noteId: string) => {
    mutate(noteId)
  }

  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button} onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
