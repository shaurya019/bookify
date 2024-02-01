import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";

function Order() {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const user = firebase.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const fetchedBooks = await firebase.fetchOrder(user.uid);
          setBooks(fetchedBooks.docs.map(book => ({ id: book.id, ...book.data() })));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Order</h1>
      {books.map(book => <BookCard link = {`/book/order/${book.id}`} key={book.id} id={book.id} {...book} />)}
    </div>
  );
}

export default Order;
