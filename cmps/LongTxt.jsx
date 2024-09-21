const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExplanded, setIsExplanded] = useState(false)

    function getDisplayText() {
        if (!txt) return ''

        if (isExplanded || txt.length <= length) {
            return txt
        } else {
            // console.log(typeof(txt));
            // console.log(txt.subsrting(0, 100));
            
            return txt.substring(0, 100) + '...'
        }
    }

    function onToggleExpansion() {
        setIsExplanded(prevExplanded => !prevExplanded)
    }

    return (
        <section className="long-text">
            <p>
                {getDisplayText()}
                {txt && txt.length > length && (
                    <button onClick={onToggleExpansion}>{isExplanded ? 'Less...' : 'More...'}</button>
                )}
            </p>
        </section>
    )
}
