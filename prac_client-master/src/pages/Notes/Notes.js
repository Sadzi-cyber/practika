import styles from './Notes.module.scss';
import { Component } from 'react';
import { connect } from 'react-redux';

import { 
    getAllNotes, 
    addNewNote, 
    updateNote, 
    changeCompleted,
    deleteNoteById,
    updateImage
} from '../../redux/notesReducer';

import ListNotes from '../../components/ListNotes/ListNotes';
import FormNote from '../../components/FormNote/FormNote';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCreateNoteWindow: false,
        }

        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    componentDidMount() {
        this.props.getAllNotes();
    }

    openWindow() {
        this.setState({ openCreateNoteWindow: true });
    }

    closeWindow() {
        this.setState({ openCreateNoteWindow: false });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={"container " + styles.notesContainer}>
                    <div className={styles.content}>
                        <div className={styles.head}>
                            <button 
                                type="button" 
                                className={styles.buttonAddNote}
                                onClick={this.openWindow}
                            >+</button>
                        </div>
                        <div className={styles.list}>
                            <ListNotes 
                                notes={this.props.notes}
                                updateNote={this.props.updateNote}
                                changeCompleted={this.props.changeCompleted}
                                deleteNote={this.props.deleteNote}
                                updateImage={this.props.updateImage}
                            />
                        </div>
                    </div>
                </div>
                <FormNote 
                    open={this.state.openCreateNoteWindow}
                    onClose={this.closeWindow}
                    action={this.props.addNewNote}
                    setImage={this.props.updateImage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes.notes,
});

export default connect(mapStateToProps, {
    getAllNotes,
    addNewNote,
    updateNote,
    changeCompleted,
    deleteNote: deleteNoteById,
    updateImage
})(Notes);