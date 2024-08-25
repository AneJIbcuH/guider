import { Book } from "../models/models";

type Props = {
  index: number;
  book: Book;
};

const MyBook: React.FC<Props> = ({ index, book }) => {
  return (
    <div className="book">
      <div className="book-info">
        <p>
          {index + 1} <span>{book.title}</span>
        </p>
        <div className="book-info-p">
          <p>{book.author}</p>
          <p>{new Date(book.date).toLocaleDateString()}</p>
          <p>{book.price}$</p>
        </div>
      </div>
      <div className="book-tags">
        {book.tags.map((chip) => (
          <div key={chip} className="book-tags-chips">{chip}</div>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
