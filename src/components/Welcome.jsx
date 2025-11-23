import React, { useRef } from 'react'

const Welcome = () => {
    const titlerRef = useRef(null);
    const subtitleRef = useRef(null);
  return (
    <section id="welcome">
        <p ref={subtitleRef}>Hello, I'm Balasubramanian</p>
        <h1 ref={subtitleRef} className="mt-7">PORTFOLIO</h1>
        <div className="small-screen">
            <p>This Portfolio is designed for desktop/tablets only.</p>
            </div>
    </section>

  )
}

export default Welcome
