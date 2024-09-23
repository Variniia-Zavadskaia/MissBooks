const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { AppLoader } from './AppLoader.jsx'

export function BookEdit() {
    // const [bookToEdit, setBookToEdit] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()
    const navigate = useNavigate()

    console.log('bookId', bookId, 'bookToEdit', bookToEdit)

    useEffect(() => {
        console.log('fff')
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.error('Had issues loading book edit', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }
    //     setBookToEdit(prevBook => {
    //         if (field.startsWith('listPrice')) {
    //             const updatedField = field.split('.')[1]
    //             return {
    //                 ...prevBook,
    //                 listPrice: {
    //                     ...prevBook.listPrice,
    //                     [updatedField]: value,
    //                 },
    //             }
    //         }

    //         return {
    //             ...prevBook,
    //             [field]: value,
    //         }
    //     })
    // }

    // function onSubmit(ev) {
    //     ev.preventDefault()

    //     console.log(ev.target.checkValidity())

    //     //  console.log(Object.fromEntries(new FormData(ev.target)))
    //     onSaveBook(bookToEdit)
    // }

    // function evStop(ev) {
    //     ev.stopPropagation()
    // }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then(book => {})
            .catch(err => {
                console.log('Had issues with book save:', err)
            })
            .finally(() => {
                navigate('/book')
            })
    }
    const { title, listPrice, description, authors, publishedDate, categories, isOnSale } = bookToEdit
    if (!bookToEdit) return <AppLoader />

    return (
        <section className="backdrop">
            <section className="book-edit">
                <h1>{bookToEdit.id ? 'Edit' : 'Add'} Book</h1>
                <form onSubmit={onSaveBook}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange} required />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="listPrice.amount"
                        value={listPrice.amount}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required></textarea>

                    <label htmlFor="authors">Authors:</label>
                    <input
                        type="text"
                        id="authors"
                        name="authors"
                        value={authors.join(', ')}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="publishedDate">Published Date:</label>
                    <input
                        type="number"
                        id="publishedDate"
                        name="publishedDate"
                        value={publishedDate}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="categories">Categories:</label>
                    <input
                        type="text"
                        id="categories"
                        name="categories"
                        value={categories.join(', ')}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="isOnSale">On Sale:</label>
                    <input
                        type="checkbox"
                        id="isOnSale"
                        name="listPrice.isOnSale"
                        checked={isOnSale}
                        onChange={handleChange}
                    />

                    <div className="form-actions">
                        <button type="submit">Save</button>
                        {/* <button type="button">Back</button> */}
                    </div>
                </form>
            </section>
        </section>
    )
}
