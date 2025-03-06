import React from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

export default function Impressum() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-16 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto">
        <Link href="/" className="text-[var(--primary)] mb-10 inline-block hover:underline">
          &larr; Zurück zur Startseite
        </Link>
        
        <div className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--primary)]">Impressum</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-4 text-gray-300">
              Jonas Dahlke<br />
              Münsterstr. 165<br />
              40476 Düsseldorf<br />
              Deutschland
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Kontakt</h2>
            <p className="mb-4 text-gray-300">
              E-Mail: collab@jonasvision.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p className="mb-4 text-gray-300">
              Jonas Dahlke<br />
              Münsterstr. 165<br />
              40476 Düsseldorf
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Haftung für Inhalte</h2>
            <p className="mb-4 text-gray-300">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Haftung für Links</h2>
            <p className="mb-4 text-gray-300">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Urheberrecht</h2>
            <p className="mb-4 text-gray-300">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
} 