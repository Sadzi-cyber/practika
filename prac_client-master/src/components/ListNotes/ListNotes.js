import styles from './ListNotes.module.scss';

import Note from '../Note/Note';


const ListNotes = ({ 
    notes, 
    updateNote,
    changeCompleted, 
    deleteNote,
    updateImage }) => {
    return (
        <div className={styles.wrapper}>
            {notes && notes.map(note => <Note 
                key={note.id} 
                note={note} 
                updateNote={updateNote}
                changeCompleted={changeCompleted}
                deleteNote={deleteNote}
                updateImage={updateImage}
            />)}
        </div>
    )
}

export default ListNotes;