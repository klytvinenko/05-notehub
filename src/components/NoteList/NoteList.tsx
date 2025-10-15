import type { NoteListData} from "../../types/note";
import css from "./NoteList.module.css";

// interface NoteListProps {
//   notes: Note[];
// }

const NoteList = ({ notes }: NoteListData) => {
  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
