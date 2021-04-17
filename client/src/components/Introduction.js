import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Introduction.css'
import TLPpic from '../images/tlpmotto.png'

const Introduction = () => (
    <div className="Introduction-container">
        <Link className="Introduction-link" to='/'>
        <section className="Introduction">
            <p>
            Wittgenstein's <span className="emphasis">Tractatus-Logico-Philosophicus</span> is a philosophical classic that continues to attract attention a century after its first publication &#8212; even if the author himself disavowed it in his later work. Part of its appeal is the sheer ambition (<span className="emphasis">&ldquo;to limit the sayable from the inside&rdquo;</span>). Part of it romanticized accounts of its genesis (<span className="emphasis">&ldquo;written in the trenches of the first World War&rdquo;</span>). Part of it perhaps the curious sudden excursions into mysticism within a logically rigid work. And part of it, no doubt, its notoriously succinct style, sometimes bordering on the obscure.
            </p>
            <p>
            Its content is difficult. But there is also a more practical reason why it is a hard read: the work has a very curious structure. As Wittgenstein explains in a footnote, the work consists of seven main propositions. These are elaborated on in comments, and comments upon those comments, etcetera. The work, then, exhibits a tree structure which is hard to appreciate in the published &#8212; linear &#8212; form. Every reader will recall furiously flipping pages back and forth to follow the trains of thought.
            </p>
            <p>
            Here, I decided to present that structure in a visual and interactive manner. It allows us to following the lines of Wittgensteins thoughts and wander our own path among them, choose-your-own-adventure style. The reader will also quickly note that &#8212; in spite of Wittgenstein's explanatory footnote &#8212; very often the propositions comment not only on their direct ancestor, but also on their earlier siblings. As this is by far the most enlightening presentation, I have provided a way of reading them with those siblings included (just click on the plus-sign in the upper right corner when displaying a proposition).
            </p>
            <p>
            Part of the pleasure in reading the Tractatus is an aesthetic one. I have tried here to do some justice to that aesthetic. We can see its propositions form like ice crystals before us: clear, cold and forebidding. Until finally we reach the infamous last proposition &#8212; <span className="emphasis">Wovon man nicht sprechen kann, dar&uuml;ber muss man schweigen</span> &#8212; here surrounded by an empty canvas. Wittgenstein wrote that the most important part of his work resided in what he did not &#8212; and could not &#8212; say. I hope this empty space invites some contemplation of that part.
            </p>
        </section>
        </Link>
    </div>
)

export default Introduction
