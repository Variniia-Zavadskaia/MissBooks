const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { UseMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/book" element={<BookIndex/>} />
                        <Route path="/book/:bookId" element={<BookDetails/>} />
                        <Route path="/book/edit" element={<BookEdit/>} />
                        <Route path="/book/edit/:bookId" element={<BookEdit/>} />

                    </Routes>
                </main>
                <UseMsg/>
            </section>
        </Router>
    )
}
