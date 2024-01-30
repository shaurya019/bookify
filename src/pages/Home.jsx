import React , { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Cards from "../components/card"
import { CardGroup } from "react-bootstrap";
function Home() {

    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    useEffect(() => {
        firebase.getAllList().then((books)=>{
            setBooks(books.docs);
        })
    },[]);
  return (
    <div className="Container mt-5">
     <CardGroup>
     { books.map((book) =>  <Cards key={book.id} {...book.data()}/>)}
     </CardGroup>
    </div>
  )
}

export default Home
