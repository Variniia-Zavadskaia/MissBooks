const { useState} = React

import { bookService } from '../services/book.service.js'

export function BookAdd({onAddBook}) {
    
    const [bookToAdd, setBookToAdd] = useState(bookService.getEmptyBook())

    function handleChange({ target }) {
        const field = target.name
        console.log(target.name)

        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(value)

        if (field === 'listPrice') {
            setBookToAdd(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, amount: value },
            }))
        } else {
            setBookToAdd(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onAddBook(bookToAdd)
        setBookToAdd({ title: '', listPrice: { amount: 0 } })
    }

    const { title, listPrice } = bookToAdd
    const isValid = title && listPrice.amount;

   
    return (
        // <section onClick={onClose} className="backdrop">

        <section className="book-add">
            <form onSubmit={onSubmit}>
                
                <input value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />

                <input
                    value={listPrice.amount || ''}
                    onChange={handleChange}
                    type="number"
                    name="listPrice"
                    id="listPrice"
                    placeholder="Price"
                />

                <button disabled={!isValid}>Add book</button>
            </form>
        </section>
        // </section>
    )
}