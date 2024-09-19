import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSelectedBookId }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview key={book.id} book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectedBookId(book.id)}>Details</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
