const { useState } = React

import { bookService } from '../services/book.service.js'

export function BookEdit({ onAddBook }) {
    const [bookToEdit, setBookToEdit] = useState()

    function addBook(ev) {
        ev.preventDefault()
        bookService
            .save(this.bookToEdit)
            .then(savedCar => {
                setCars([...cars, savedCar])
            })
            .catch(err => {
                console.error('Failed to save car', err)
                // TODO: show error msg to user
            })
    }
}
