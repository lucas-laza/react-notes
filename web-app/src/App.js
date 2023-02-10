import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { darkTheme, GlobalStyle, lightTheme } from "./GlobalStyle";
import { Side, Main, LoaderWrapper, ModeChanger, SearchBar } from "./App.styled";
import { NoteList } from "./NoteList/NoteList.styled";
import LinkToNote from "./LinkToNote";
import Note from "./Note";
import { Loader } from "./Note/Note.styled";
import { CreateLink } from "./Aside/Aside.styled";
import SwitchTheme from "./Components/SwitchTheme";
import { FiPlus } from "react-icons/fi";

function App() {

  const [notes, setNotes] = useState(null);

  // ==> sortedNotes
  const [sortedNotes, setSortedNotes] = useState(null);

  const [selectedNote, setSelectedNote] = useState(0);

  const [searchValue, setSearchValue] = useState('');


  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useState(darkTheme);

  const [userTheme, setUserTheme] = useState(null);

  const navigate = useNavigate();

  
  // THEME
  const fetchTheme = async () => {
    const response = await fetch("/profile");
    const fetched_theme = await response.json(); 
    if (null !== fetched_theme.theme) {
      setUserTheme(fetched_theme.theme);
    }
  }

  const storeUserTheme = async () => {
    const response = await fetch(`/profile`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        theme: userTheme
      })
    });
  }

  useEffect(() => {
    if ( null !== userTheme) {
      storeUserTheme();
      setLightTheme(userTheme);
      setThemeInStorage(userTheme);
    }
    
  }, [userTheme]);

  const setThemeInStorage = (theme) => {
    localStorage.setItem('theme', theme)
 }

 const setLightTheme = (theme) => {
    setUserTheme(theme);  
    if (theme == 'light') {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }

  // NOTES
  const fetchNotes = async () => {
    // ==> _sort=date pour afficher les dernières notes éditées en premier dès le chargement de la page
    const response = await fetch("/notes?_sort=date&_order=desc");

    const notes = await response.json();
    setNotes(notes);
    setIsLoading(false);
  };

  useEffect(() => {
    setLightTheme(localStorage.getItem('theme'));
    fetchNotes();
    fetchTheme();
  }, []);

  useEffect(() => {
    // ==> Dès que les notes changent, on les tries et on actualise SortedNotes
    if (null !== notes) {
      setSortedNotes(
        notes.sort(
          // ==> Methode pour trier (sort) notre tableau en fonction de la valeur de "date" de chaque object
          (a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }
          // ==> reverse() pour afficher les plus récent en premier
        ).reverse())
    }
  }, [notes]);

  const createNote = async () => {
    const response = await fetch(`/notes`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title: "New Note",
        content: "Edit me",
        date: new Date()
      })
    });
    if (!response.ok) {
    } else {
      const note = await response.json();
      addTitle(note);
      navigate(`/notes/${note.id}`);
    }
  }

  const delNote = async (id) => {
    const response = await fetch(`/notes/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
    });
    if (!response.ok) {
    } else {
      const note = await response.json();
      delTitle(id);
      navigate(`/`);
    }
  }
  
  // TITLES
  const updateTitle = async (noteToUpdate) => {
    setNotes(
      notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    )
  };

  const addTitle = (note) => {
    console.log('add title');
    setNotes(
      [{
        id: note.id,
        title: note.title,
        date: note.date
      }].concat(notes)
    );
  }

  const delTitle = (id) => {
    setNotes((current) =>
      current.filter((note) => note.id !== id)
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {
        null !== userTheme ? (
          <ModeChanger>
            <label>
              <span>Theme</span>
              <SwitchTheme onChange={setLightTheme} checked={userTheme}/>
            </label>
          </ModeChanger>
        ) : null
      }
      
      <GlobalStyle />
      <Side>
        {!isLoading && notes ? (
          <>
          <SearchBar>
            <input type={"text"} placeholder="Search note" onChange={ (event) => {
              let text = event.target.value;
              setSearchValue(text)
            } }
            value={searchValue}></input>
          </SearchBar>
          <NoteList>
            {/* /!\ Ne pas utiliser de duplucation d'etats: le filter se fait dans le rendu  */}
          {
              sortedNotes && (
                sortedNotes.filter(
                  note => note.title.toLowerCase().includes(searchValue.toLowerCase())
                ).map((note_sorted) => (
                    (selectedNote == note_sorted.id) ? (
                      <li key={note_sorted.id} style={{color:"orange"}}>
                        <LinkToNote id={note_sorted.id} title={note_sorted.title}/>
                      </li>
                  ) : (
                      <li key={note_sorted.id}>
                        <LinkToNote id={note_sorted.id} title={note_sorted.title}/>
                      </li>
                  )
                ))
              )
            }
          </NoteList>
          </>
          
        ) : 
        <LoaderWrapper>
          <Loader/>
        </LoaderWrapper>
        }
        <CreateLink onClick={createNote}>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"5px"}}>Create note <FiPlus /></div> 
        </CreateLink>
      </Side>
      <Main>
        <Routes>
          <Route
            path="/"
            element={<div>Sélectionnez une note pour l'éditer</div>}
          />
          {/* ==> quand une note est enregistré, le composant fait appel a sa props onSave qui trigger la fonction updateTitle,
           qui utilise setNote, donc qui appelle setSortedNotes */}
          <Route path="/notes/:id" element={<Note onSave={updateTitle} deleteNote={delNote} onSelect={setSelectedNote}/>} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

export default App;
