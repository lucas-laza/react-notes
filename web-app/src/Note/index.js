import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { IconAndLabel } from "../IconAndLabel/IconAndLabel.styled";
import { Form, Title, Content, SaveAndStatus, SaveButton, Loader, ErrorMessage, Del } from "./Note.styled";
import { FiCheck, FiTrash } from "react-icons/fi";
import { FullHeightAndWidthCentered } from "../App.styled";

const Note = (props) => {
  const onSave = props.onSave;
  const deleteNote = props.deleteNote;
  const onSelect = props.onSelect;

  // Params de l'url :id
  const { id } = useParams();

  useEffect(() => {
    onSelect(id);
    clearTimeout(timer.current);
  }, [id])

  const [isSaved, setSaved] = useState("FirstLoading");

  const [note, setNote] = useState(null);

  const [hasChanged, setHasChanged] = useState(false);

  const fetchNote = useCallback(async () => {
    const response = await fetch(`/notes/${id}`);
    if (response.ok) {
      const note = await response.json();
      setNote(note)
      setSaved('Idle')
    } else {
      setSaved('Error')
    }
  }, [id]);

  // On appelle fetchNotes dès que id ou fetchNote a changé
  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  


  // ### TIMEOUT AUTOSAVE
  // useRef pour "let" => useState qui n'influe pas sur l'affichage
  const timer = useRef(null);
  const saveTimeout = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(saveNote, 750);
  }
  // Trigger when changed
  useEffect(() => {
    if (note && hasChanged) {
      saveTimeout();
    } else if (note && !hasChanged) {
      setHasChanged(true);
    }
  }, [note])

  const saveNote = async () => {
    setSaved("Loading");
    const response = await fetch(`/notes/${note.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(note)
    });
    if (!response.ok) {
      setSaved("Error");
    } else {
      setSaved("Saved");
      onSave(note);
    }
  }

  if (isSaved === "FirstLoading") {
    return (
      <FullHeightAndWidthCentered>
        <Loader />
      </FullHeightAndWidthCentered>
    );
  }

  if (isSaved === "Error") {
    return (
      <FullHeightAndWidthCentered>
        <ErrorMessage>404 : la note {id} n'existe pas.</ErrorMessage>
      </FullHeightAndWidthCentered>
    );
  }


  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      saveNote();
    }}>
      <Del onClick={() => {deleteNote(note.id)}}><FiTrash></FiTrash></Del>
      <Title type="text" value={note ? note.title : ""} onChange={(event) => {
        setNote({
          // Ne pas écraser tout: ... copie (spread operator)
          ...note,
          title: event.target.value,
          date: Date()
        })
        setSaved("Idle");
      }} />
      <Content value={note ? note.content : ""} onChange={(event) => {
          setNote({
            // Ne pas écraser tout: ... copie
            ...note,
            content: event.target.value,
            date: Date()
          })
          setSaved("Idle");
        }} />
      
      <SaveAndStatus>
        <SaveButton>Enregistrer</SaveButton>
        {
        isSaved === "Saved" ? (
          <IconAndLabel>
            <FiCheck />
            Saved
          </IconAndLabel>
        ) : isSaved === "Loading" ? (
          <IconAndLabel>
            <Loader />
            Loading
          </IconAndLabel>
        ) : isSaved === "Error" ? (
          <IconAndLabel>
            ERROR
          </IconAndLabel>
        )  : null
        }
        
      </SaveAndStatus>
    </Form>
  );
};

export default Note;
