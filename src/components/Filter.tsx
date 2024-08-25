import { useState } from "react";
import { Book, By, OrderBy } from "../models/models";

type Props = {
  books: Book[];
  activeTags: string[];
  setActiveTags: (arg: string[]) => void;
  setOrderBy: (arg: OrderBy) => void;
  orderBy: OrderBy;
};

const Filter: React.FC<Props> = ({
  books,
  activeTags,
  setActiveTags,
  orderBy,
  setOrderBy,
}) => {
  const [openTags, setOpenTags] = useState<boolean>(false);
  const tags = [...new Set(books.map((el) => el.tags).flat())];

  function changeTags(tag: string) {
    if (activeTags.find((el) => el == tag)) {
      setActiveTags(activeTags.filter((el) => el != tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  }

  function changeOrder(str: By) {
    if (str == orderBy.by) {
      setOrderBy({
        ...orderBy,
        order: orderBy.order == "asc" ? "desc" : "asc",
      });
    } else {
      setOrderBy({ order: "asc", by: str });
    }
  }

  return (
    <div className={`filters ${openTags ? "open" : ""}`}>
      <div
        className={orderBy.by == "price" ? "filt-active filt" : "filt"}
        onClick={() => changeOrder("price")}
      >
        price
        {orderBy.by == "price" && orderBy.order == "desc" ? (
          <span>&#8659;</span>
        ) : (
          <span>&#8657;</span>
        )}
      </div>
      <div
        className={orderBy.by == "author" ? "filt-active filt" : "filt"}
        onClick={() => changeOrder("author")}
      >
        author
        {orderBy.by == "author" && orderBy.order == "desc" ? (
          <span>&#8659;</span>
        ) : (
          <span>&#8657;</span>
        )}
      </div>
      <div
        className={orderBy.by == "date" ? "filt-active filt" : "filt"}
        onClick={() => changeOrder("date")}
      >
        date
        {orderBy.by == "date" && orderBy.order == "desc" ? (
          <span>&#8659;</span>
        ) : (
          <span>&#8657;</span>
        )}
      </div>

      <div className="filters-tag" onClick={() => setOpenTags(!openTags)}>
        tags:{" "}
        <div className={`filters-tag-arrow ${openTags ? "down" : "up"}`}>
          &#9650;
        </div>
      </div>

      <div className="filters-reset" onClick={() => setActiveTags([])}>reset</div>

      <div className={`filters-tags ${openTags ? "open" : ""}`}>
        {tags.map((tag) => (
          <div
            className={
              activeTags.find((el) => el == tag)
                ? "filters-tags-chips active-ftc"
                : "filters-tags-chips"
            }
            key={tag}
            onClick={() => changeTags(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
