export function AppHeader({ onSetPage }) {
    const linkes = [
        { title: 'Home', href: 'home' },
        { title: 'About Us', href: 'about' },
        { title: 'Books', href: 'book' },
    ]
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {/* {linkes.map((link, idx) => {
                        return (
                            <a key={idx} onClick={()=>onSetPage(link.href)}>
                                {link.title}
                            </a>
                        )
                    })} */}
                    <a onClick={() => onSetPage('home')} href="#">
                        Home
                    </a>
                    <a onClick={() => onSetPage('about')} href="#">
                        About Us
                    </a>
                    <a onClick={() => onSetPage('book')} href="#">
                        Books
                    </a>
                </nav>
            </section>
        </header>
    )
}
