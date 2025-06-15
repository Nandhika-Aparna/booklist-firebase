import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {collection,query,where,getDocs} from 'firebase/firestore';
import { db ,auth } from '../firebase/config.js';
import {doc,updateDoc ,deleteDoc,addDoc} from 'firebase/firestore'


export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books:[],
    status: 'idle'
  },
  reducers: {
    
  },extraReducers: builder => {
    builder
      .addCase(fetchbooks.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchbooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.books= action.payload;
      })
      .addCase(fetchbooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(toggleRead.fulfilled, (state, action) => {
        state.books.map(book=>{
          if(book.id==action.payload){
            book.isRead=!book.isRead;
          }
        })
        state.status = 'succeeded'
      })
      .addCase(toggleRead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(eraseBook.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(eraseBook.fulfilled, (state, action) => {
        state.books=state.books.filter(book => book.id !=action.payload);
        state.status = 'succeeded'
      })
      .addCase(eraseBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addBook.pending, (state, action) => {
        state.status = 'pending'
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.status = 'succeeded'
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error'
      })
  }


});

  



export const selectBooks = state => state.books;

export default booksSlice.reducer;
export const fetchbooks= createAsyncThunk('books/fetchbooks',async()=>{
  const q =query(collection(db,"books"),where("user_id","==",auth.currentUser.uid));
       const querySnapshot = await getDocs(q);
       let booklist = [];
       querySnapshot.forEach((doc)=>{
        booklist.push({id:doc.id,...doc.data()});
       });
       return booklist;
})

export const toggleRead= createAsyncThunk('books/toggleRead',async(payload)=>{
 const bookref=doc(db,"books",payload.id);
 await updateDoc(bookref,{
  isRead:!payload.isRead
 });
 return payload.id;
});

export const eraseBook= createAsyncThunk('books/eraseBook',async(payload)=>{
 await deleteDoc(doc(db,"books",payload));
 return payload
});

export const addBook= createAsyncThunk('books/addBook',async(payload)=>{
  let newBook =payload;
  newBook.user_id=auth.currentUser.uid;
  const docref= await addDoc(collection(db,"books"),newBook)
  newBook.id=docref.id;
  return newBook;
});