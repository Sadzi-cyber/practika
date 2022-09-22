import { notesAPI } from '../api/api';

const SET_ALL_NOTES = 'GET_ALL_NOTES';
const SET_NEW_NOTE = 'ADD_NEW_NOTE';
const SET_UPDATE_NOTE = 'UPDATE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const CHANGE_COMPLETED = 'CHANGE_COMPLETED';
const SET_IMAGE = 'SET_IMAGE';

let initialState = {
    notes: [],
};

const notesReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case SET_ALL_NOTES: {
            return {
                ...state,
                notes: action.notes,
            }
        }
        case SET_NEW_NOTE: {
            return {
                ...state,
                notes: [action.note, ...state.notes],
            }
        }
        case SET_UPDATE_NOTE: {
            return {
                ...state,
                notes: state.notes.map(note => {
                    if (note.id === action.id) {
                        return {
                            ...note,
                            text: action.text,
                            importance: action.importance
                        };
                    }
                    return note;
                }),
            }
        }
        case DELETE_NOTE: {
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
            }
        }
        case CHANGE_COMPLETED: {
            return {
                ...state,
                notes: state.notes.map(note => {
                    if (note.id === action.id) {
                        return {
                            ...note,
                            completed: action.completed,
                        };
                    }
                    return note;
                }),
            }
        }
        case SET_IMAGE: {
            return {
                ...state,
                notes: state.notes.map(note => {
                    if (note.id === action.id) {
                        return {
                            ...note,
                            image: action.image,
                        }
                    }
                    return note;
                })
            }
        }
        default:
            return state;
    }
}

export const setAllNotes = (notes) => ({
    type: SET_ALL_NOTES,
    notes
});

export const setNewNote = (note) => ({
    type: SET_NEW_NOTE,
    note
});

export const setUpdateNote = ({ id, text, importance }) => ({
    type: SET_UPDATE_NOTE,
    id, text, importance
});

export const deleteNote = (id) => ({
    type: DELETE_NOTE,
    id
});

export const setChangeCompleted = (id, completed) => ({
    type: CHANGE_COMPLETED,
    id, completed
});

export const setImage = (id, image) => ({
    type: SET_IMAGE,
    id, image
});

// Получить все записи.
export const getAllNotes = () => async (dispatch) => {
    const response = await notesAPI.getAllNotes();
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && Array.isArray(data)) {
        dispatch(setAllNotes(data));
    }
};

// Добавить новую запись.
export const addNewNote = ({ text, importance }) => async (dispatch) => {
    const response = await notesAPI.addNewNote(text, importance);
    console.log(response);
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && data) {
        dispatch(setNewNote(data));
    }
};

// Обновить запись.
export const updateNote = ({ id, text, importance }) => async (dispatch) => {
    const response = await notesAPI.updateNoteById({ id, text, importance });
    console.log(response);
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && data) {
        dispatch(setUpdateNote({ id, text, importance }));
    }
};

// Удалить запись
export const deleteNoteById = ({ id }) => async (dispatch) => {
    const response = await notesAPI.deleteNote(id);
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && data) {
        dispatch(deleteNote(id));
    }
}

// Отметка, что заметка выполнена / не выполнена.
export const changeCompleted = ({ id, completed }) => async (dispatch) => {
    const response = await notesAPI.changeCompleted(id, completed);
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && data) {
        dispatch(setChangeCompleted(id, completed));
    }
}

// Установить или обновить изображение
export const updateImage = ({ id, image }) => async (dispatch) => {
    const response = await notesAPI.updateImage(id, image);
    const dataResponse = response.data;
    const { result, data } = dataResponse;
    if (result === 'ok' && data) {
        console.log(data);
        dispatch(setImage(id, data));
    }
}


export default notesReducer;