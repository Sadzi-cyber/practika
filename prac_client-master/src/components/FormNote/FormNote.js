import { useState } from 'react';
import styles from './FormNote.module.scss';
import { useFormik } from 'formik';
import imageSVG from '../../assets/images/image.svg';


const FormNote = ({ open, onClose, action, update, note, setImage }) => {
    const [addImage, setAddImage] = useState(false);

    const formik = useFormik({
        initialValues: {
            importance: update ? note?.importance : 0,
            text: update ? note?.text : ''
        },
        onSubmit: values => {   
            console.log(values);
            action({ 
                text: values.text, 
                importance: values.importance,
                id: note?.id
            });
            onClose();
        },
    });

    const setImageForNote = (e) => {
        if (e.target.files.length) {
            setImage({ 
                id: note.id, 
                image: e.target.files[0] 
            });
        }
        onClose();
    }
    
    if (open) {
        document.body.classList.add('lock');
    } else {
        document.body.classList.remove('lock');
    }
    return (
        <div
            className={styles.wrapper + " " + (open ? styles.open : "")}
        >
            <div className={styles.content}>
                <div className={styles.head}>
                    <div 
                        className={styles.close}
                        onClick={onClose}
                    ></div>
                </div>
                <h2 className={styles.title}>
                    Форма заметки
                </h2>
                <form 
                    className={styles.form}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.radio}>
                        <h3 className={styles.radioTitle}>
                            Установите важность записи: &nbsp;
                        </h3>
                        <div className={styles.radioList}>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="0" 
                                    name="importance"
                                    checked={formik.values.importance == 0}
                                    onChange={formik.handleChange}
                                />
                                0
                            </label>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="1" 
                                    name="importance"
                                    checked={formik.values.importance == 1}
                                    onChange={formik.handleChange}
                                />
                                1
                            </label>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="2" 
                                    name="importance"
                                    checked={formik.values.importance == 2}
                                    onChange={formik.handleChange}
                                />
                                2
                            </label>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="3" 
                                    name="importance"
                                    checked={formik.values.importance == 3}
                                    onChange={formik.handleChange}
                                />
                                3
                            </label>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="4" 
                                    name="importance"
                                    checked={formik.values.importance == 4}
                                    onChange={formik.handleChange}
                                />
                                4
                            </label>
                            <label className={styles.radioButton}>
                                <input 
                                    type="radio" 
                                    value="5" 
                                    name="importance"
                                    checked={formik.values.importance == 5}
                                    onChange={formik.handleChange}
                                />
                                5
                            </label>
                        </div>
                    </div>
                    <div className={styles.textNoteWrapper}>
                        <h3 className={styles.textNoteTitle}>Введите текст заметки</h3>
                        <textarea 
                            className={styles.textNote}
                            name="text"
                            onChange={formik.handleChange}
                            value={formik.values.text}
                        ></textarea>
                    </div>
                    <div className={styles.submitWrapper}>
                        <button 
                            type="submit"
                            className={styles.submit}
                        >Записать</button>
                    </div>
                </form>
                {(update && !note?.image) && <div className={styles.imageAddWrapper}>
                    <div>Добавить изображение?</div>
                    <label className={styles.addImage}>
                        <img
                            alt="logo"
                            src={imageSVG}
                        />
                        <input 
                            hidden
                            type="file" 
                            onChange={setImageForNote}
                        />
                    </label>
                </div>}
                {(update && note?.image) && <div className={styles.imageAddWrapper}>
                    <div>Изменить изображение</div>
                    <label className={styles.addImage}>
                        <img
                            alt="logo"
                            src={imageSVG}
                        />
                        <input 
                            hidden
                            type="file" 
                            onChange={setImageForNote}
                        />
                    </label>
                </div>}
            </div>
        </div>
    )
}

export default FormNote;