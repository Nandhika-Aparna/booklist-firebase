
import {collection,query,where,getDocs,doc,deleteDoc,addDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import {db} from '../firebase/config.js'

function Notes({bookId}) {
    
    
    
    const handleEraseNote= async (id)=> {
      if(confirm('Are you sure you want to erase this note?')) {
        try {
          await deleteDoc(doc(db,"notes",id));
          setnotes(notes.filter(note=>note.id!=id));
        } catch (error) {
          alert("Error deleting the note")
          
        }
        
      }
    }

    const handleAddNote = async(e)=> {
      e.preventDefault();

      const newNote = {
        book_id: bookId,
        title: document.querySelector('input[name=title]').value,
        text: document.querySelector('textarea[name=note]').value
      }
      if (newNote.title && newNote.text) {
        try {
          const docref= await addDoc(collection(db,"notes"),newNote)
            newNote.id=docref.id;
           setnotes([...notes,newNote]);
            document.querySelector('input[name=title]').value = "";
            document.querySelector('textarea[name=note]').value = "";
          
        } catch (error) {
          alert('Error adding the note')
        }
      } else {
          alert('Please fill the mandatory fields.');
      }

  }

  const fetchnotes = async(book_id)=>{
  
  
    try{
       const q =query(collection(db,"notes"),where("book_id","==",book_id));
             const querySnapshot = await getDocs(q);
             let notelist = [];
             querySnapshot.forEach((doc)=>{
              notelist.push({id:doc.id,...doc.data()});
             });
            
             setnotes(notelist);
      
      setfetchstatus("succeeded");
    }catch(error){
        setfetchstatus("failed");
    }
  
  }

    
    const [notes,setnotes] = useState("");
    const [fetchstatus,setfetchstatus] = useState("idle");
    useEffect(()=>{
          if(fetchstatus=='idle'){
      
            fetchnotes(bookId);
          }
          
        },[]);
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>

            {notes.length ?

              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick={()=>handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
              </div>

               : fetchstatus=="succeeded"?
            
            <div>
              <p>This book doesnt have any notes yet. Use the form below to add a note</p>
            </div>

            : fetchstatus=="failed"?
            <div>
              <p>Error fetching the notes.</p>
            </div> :

            <div>
              <p>Loading...</p>
              
            </div>
}

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick={(e)=>{handleAddNote(e)}}className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  