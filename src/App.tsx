import { useEffect, useState } from "react";
import { getBooks } from "./api";
import "./App.css";
import MyBook from "./components/MyBook";
import Filter from "./components/Filter";
import { Book, OrderBy } from "./models/models";
import { isBook } from "./models/func";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>({
    order: "",
    by: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books
    .filter((el) => {
      if (filters.length && isBook(el)) {
        return el.tags.some((tag) => filters.includes(tag));
      } else {
        return el;
      }
    })
    .sort((a, b) => {
      if (orderBy.order == "asc") {
        return a[orderBy.by as keyof Book] > b[orderBy.by as keyof Book]
          ? 1
          : -1;
      } else if (orderBy.order === "desc") {
        return a[orderBy.by as keyof Book] < b[orderBy.by as keyof Book]
          ? 1
          : -1;
      }
      return 0;
    });

  return (
    <div className="content">
      <div className="header">Book Store</div>
      <Filter
        books={books}
        activeTags={filters}
        setActiveTags={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <div className="books">
        {isLoading && <div className="loading">Loading...</div>}
        {filteredBooks.map((book, index) => (
          <MyBook index={index} book={book} key={book.title} />
        ))}
        {!isLoading && (
          <div className="sum">
            TOTAL: {filteredBooks.reduce((acc, val) => acc + val.price, 0)}$
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
