import { useState } from 'react';
import styles from './Note.module.scss';

import FormNote from '../FormNote/FormNote';

const Note = ({ 
    note, 
    updateNote, 
    changeCompleted,
    deleteNote,
    updateImage }) => {
    const [openForm, setOpenForm] = useState(false);

    const openWindow = (e) => {
        setOpenForm(true);
    }

    const closeWindow = (e) => {
        setOpenForm(false);
    }

    const changeCompletedNote = (e) => {
        changeCompleted({ 
            id: note.id,
            completed: !note.completed
        });
    }


    const { text, importance, dateCreated, dateUpdated, completed } = note;
    const dateCreatedSplit = dateCreated.split(' ');
    const [date, time] = dateCreatedSplit;
    const [hours, minutes] = time.split(':');

    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.content}
                onClick={!openForm ? openWindow : () => {}}
            >
                <div className={styles.head}>
                    <div className={styles.date}>
                        {date}
                    </div>
                    <div className={styles.importance}>
                        Важность: &nbsp; 
                        <span>{importance}</span>
                    </div>
                    <div className={styles.time}>
                        {`${hours}:${minutes}`}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.text}>
                        <p>
                            {text}
                        </p>
                    </div>
                    {note.image && <div className={styles.image}>
                        <img 
                            alt={note.image}
                            src={note.image}
                        />
                    </div>}
                </div>
                <div className={styles.footer}>
                    Последние изменения в &nbsp;
                    {dateUpdated && <div className={styles.dateUpdated}>{dateUpdated}</div>}
                </div>
            </div>
            <div className={styles.actions}>
                <input 
                    type="checkbox"
                    className={styles.completed}
                    checked={completed}
                    onChange={changeCompletedNote}
                />
                <button 
                    className={styles.delete}
                    onClick={() => deleteNote({ id: note.id })}
                >
                    X
                </button>
            </div>
            <FormNote 
                open={openForm}
                onClose={closeWindow}
                update
                note={note}
                action={updateNote}
                setImage={updateImage}
            />
        </div>
    )
}

export default Note;