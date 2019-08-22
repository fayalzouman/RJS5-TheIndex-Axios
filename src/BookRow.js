import React from "react";

function BookRow(props) {
  const book = props.book;
  //const author = props.author;
  const authors = book.authors.map(auth => {
    return <div>{auth.name}</div>;
  });

  console.log("BOOK", book);

  return (
    <tr>
      <td>{book.title}</td>
      <td>{authors}</td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
}

export default BookRow;
