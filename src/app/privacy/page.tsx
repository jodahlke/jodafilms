import React from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-16 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto">
        <Link href="/" className="text-[var(--primary)] mb-10 inline-block hover:underline">
          &larr; Zurück zur Startseite / Back to Home
        </Link>
        
        {/* German Version */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--primary)]">Datenschutzerklärung</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§1 Verantwortlicher</h2>
            <p className="mb-4 text-gray-300">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              recsleeprepeat.com<br />
              Münsterstraße 165<br />
              40476 Düsseldorf<br />
              Deutschland<br />
              E-Mail: datenschutz@jonasvision.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§2 Allgemeines zur Datenverarbeitung</h2>
            <p className="mb-4 text-gray-300">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§3 Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
            
            <h3 className="text-lg font-semibold mb-3">a) Beim Besuch der Website</h3>
            <p className="mb-4 text-gray-300">
              Beim Aufrufen unserer Website jonasvision.com werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Folgende Informationen werden dabei erfasst und gespeichert:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>IP-Adresse des anfragenden Rechners,</li>
              <li>Datum und Uhrzeit des Zugriffs,</li>
              <li>Name und URL der abgerufenen Datei,</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
              <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.</li>
            </ul>
            <p className="mb-4 text-gray-300">
              Diese Daten sind technisch erforderlich, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f DSGVO).
            </p>

            <h3 className="text-lg font-semibold mb-3">b) Bei Nutzung unseres Kontaktformulars</h3>
            <p className="mb-4 text-gray-300">
              Bei Fragen jeglicher Art können Sie mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufnehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben sind freiwillig.
            </p>
            <p className="mb-4 text-gray-300">
              Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung.
            </p>

            <h3 className="text-lg font-semibold mb-3">c) Bei Anmeldung zu unserem Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Wenn Sie unseren Newsletter abonnieren, verwenden wir Ihre E-Mail-Adresse, um Ihnen regelmäßig Informationen zu unseren Dienstleistungen oder Angeboten zuzusenden. Die Anmeldung erfolgt über ein Double-Opt-In-Verfahren, bei dem Sie Ihre Anmeldung per E-Mail bestätigen müssen.
            </p>
            <p className="mb-4 text-gray-300">
              Sie können sich jederzeit vom Newsletter abmelden, indem Sie den Abmelde-Link in der E-Mail nutzen oder uns unter datenschutz@jonasvision.com kontaktieren.
            </p>

            <h3 className="text-lg font-semibold mb-3">d) Bewerbungsprozess</h3>
            <p className="mb-4 text-gray-300">
              Wenn Sie sich bei uns bewerben, speichern wir Ihre Bewerbungsunterlagen für die Dauer des Bewerbungsprozesses und maximal 6 Monate darüber hinaus, falls kein Arbeitsverhältnis zustande kommt. Falls Sie uns ausdrücklich erlauben, Ihre Unterlagen länger zu speichern, werden diese in unseren Talent-Pool aufgenommen (max. 12 Monate).
            </p>
            <p className="mb-4 text-gray-300">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§4 Weitergabe von Daten</h2>
            <p className="mb-4 text-gray-300">
              Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den aufgeführten Zwecken findet nicht statt, es sei denn:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Sie haben Ihre ausdrückliche Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO erteilt.</li>
              <li>Die Weitergabe ist zur Vertragserfüllung erforderlich (Art. 6 Abs. 1 lit. b DSGVO).</li>
              <li>Es besteht eine gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO).</li>
              <li>Die Weitergabe ist zur Wahrung berechtigter Interessen erforderlich (Art. 6 Abs. 1 lit. f DSGVO).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§5 Cookies & Tracking-Technologien</h2>
            <p className="mb-4 text-gray-300">
              Wir verwenden auf unserer Website Cookies, um die Benutzerfreundlichkeit zu verbessern.
            </p>
            <p className="mb-4 text-gray-300 font-semibold">Arten von Cookies</p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Essenzielle Cookies (technisch notwendige Cookies) – erforderlich für den Betrieb der Website.</li>
              <li>Funktionale Cookies – speichern Ihre Einstellungen (z. B. Sprache, Login).</li>
              <li>Analytische Cookies – helfen uns, die Nutzung der Website statistisch auszuwerten.</li>
              <li>Marketing- & Drittanbieter-Cookies – z. B. zur Wiedergabe von Videos oder Social-Media-Integrationen.</li>
            </ul>
            <p className="mb-4 text-gray-300">
              Sie können Ihre Cookie-Einstellungen jederzeit ändern und das Setzen von Cookies über Ihre Browser-Einstellungen deaktivieren.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§6 HLS-Video-Integration & Datenschutz</h2>
            <p className="mb-4 text-gray-300">
              Auf unserer Website nutzen wir HLS (HTTP Live Streaming) zur Bereitstellung von Videos. Dabei werden verschiedene Cookies und Tracking-Mechanismen eingesetzt.
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Beim Start eines HLS-Videos können IP-Adresse, Gerätedaten und Streaming-Statistiken erfasst werden.</li>
              <li>Drittanbieter, wie z. B. Cloudflare Stream oder Mux, können dabei technische Daten speichern.</li>
              <li>Die Nutzung von HLS-Videos basiert auf Ihrer aktiven Einwilligung über unser Cookie-Banner.</li>
            </ul>
            <p className="mb-4 text-gray-300">
              Mehr Informationen zu HLS-Streaming und Datenschutz erhalten Sie in den jeweiligen Richtlinien der Anbieter.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§7 Ihre Rechte als betroffene Person</h2>
            <p className="mb-4 text-gray-300">
              Sie haben das Recht auf:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO).</li>
              <li>Berichtigung falscher oder unvollständiger Daten (Art. 16 DSGVO).</li>
              <li>Löschung Ihrer Daten („Recht auf Vergessenwerden") (Art. 17 DSGVO).</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO).</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO).</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).</li>
            </ul>
            <p className="mb-4 text-gray-300">
              Falls Sie eines dieser Rechte ausüben möchten, kontaktieren Sie uns unter: E-Mail: datenschutz@jonasvision.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§8 Datenschutzaufsichtsbehörde</h2>
            <p className="mb-4 text-gray-300">
              Sie haben das Recht, sich bei einer Datenschutzbehörde zu beschweren:
            </p>
            <p className="mb-4 text-gray-300">
              Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
              Postfach 20 04 44<br />
              40102 Düsseldorf<br />
              Tel.: +49 211 384 240<br />
              Fax: +49 211 3 842 410<br />
              E-Mail: poststelle@ldi.nrw.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§9 Änderung dieser Datenschutzerklärung</h2>
            <p className="mb-4 text-gray-300">
              Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Version ist stets unter jonasvision.com abrufbar.
            </p>
          </section>
        </div>

        {/* English Version */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--primary)]">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§1 Data Controller</h2>
            <p className="mb-4 text-gray-300">
              The responsible entity for data processing on this website is:<br />
              Jonas Dahlke<br />
              Münsterstraße 165<br />
              40476 Düsseldorf<br />
              Germany<br />
              Email: datenschutz@jonasvision.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§2 General Information on Data Processing</h2>
            <p className="mb-4 text-gray-300">
              We take the protection of your personal data very seriously and handle your personal information confidentially and in accordance with legal data protection regulations and this privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§3 Collection and Storage of Personal Data, and How It Is Used</h2>
            
            <h3 className="text-lg font-semibold mb-3">a) When Visiting the Website</h3>
            <p className="mb-4 text-gray-300">
              When you access our jonasvision.com, the browser used on your device automatically sends information to the server of our website. This information is temporarily stored in a log file. The following information is collected and stored until it is automatically deleted:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>IP address of the requesting device</li>
              <li>Date and time of access</li>
              <li>Name and URL of the retrieved file</li>
              <li>Website from which access occurs (referrer URL)</li>
              <li>Browser used and, if applicable, the operating system of your device, as well as the name of your access provider</li>
            </ul>
            <p className="mb-4 text-gray-300">
              The processing of this data is necessary to display our website correctly and ensure its stability and security (legal basis: Art. 6(1)(f) GDPR).
            </p>

            <h3 className="text-lg font-semibold mb-3">b) When Using Our Contact Form</h3>
            <p className="mb-4 text-gray-300">
              If you have any inquiries, you may contact us using the form on our website. A valid email address is required so that we know who the inquiry is from and can respond accordingly. Any other information is provided voluntarily.
            </p>
            <p className="mb-4 text-gray-300">
              The data processing for contacting us is carried out in accordance with Art. 6(1)(a) GDPR based on your voluntary consent.
            </p>

            <h3 className="text-lg font-semibold mb-3">c) When Signing Up for Our Newsletter</h3>
            <p className="mb-4 text-gray-300">
              If you sign up for our newsletter, we will use your email address to send regular updates regarding our services or offers. Registration is completed through a double opt-in process, meaning you must confirm your registration via email.
            </p>
            <p className="mb-4 text-gray-300">
              You can unsubscribe at any time by clicking the unsubscribe link in any newsletter email or by contacting us at datenschutz@recsleeprepeat.com.
            </p>

            <h3 className="text-lg font-semibold mb-3">d) Application Process</h3>
            <p className="mb-4 text-gray-300">
              If you apply for a position with us, we will store your application documents for the duration of the recruitment process and up to six months thereafter if no employment relationship is established. If you explicitly allow us to retain your application longer, we may store it in our Talent Pool (for a maximum of 12 months).
            </p>
            <p className="mb-4 text-gray-300">
              Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§4 Data Sharing</h2>
            <p className="mb-4 text-gray-300">
              Your personal data will not be shared with third parties except in the following cases:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>You have given your explicit consent (Art. 6(1)(a) GDPR).</li>
              <li>The data transfer is necessary for contract performance (Art. 6(1)(b) GDPR).</li>
              <li>There is a legal obligation to share the data (Art. 6(1)(c) GDPR).</li>
              <li>The sharing is necessary for legitimate interests (Art. 6(1)(f) GDPR).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§5 Cookies & Tracking Technologies</h2>
            <p className="mb-4 text-gray-300">
              We use cookies on our website to enhance user experience.
            </p>
            <p className="mb-4 text-gray-300 font-semibold">Types of Cookies</p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Essential cookies – Required for the website's operation.</li>
              <li>Functional cookies – Store your preferences (e.g., language, login information).</li>
              <li>Analytical cookies – Help us analyze website usage.</li>
              <li>Marketing & Third-Party Cookies – Used for embedding videos or social media integrations.</li>
            </ul>
            <p className="mb-4 text-gray-300">
              You can modify your cookie preferences at any time or disable cookies in your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§6 HLS Video Integration & Data Protection</h2>
            <p className="mb-4 text-gray-300">
              We use HLS (HTTP Live Streaming) for video playback on our website. This may involve the use of cookies and tracking mechanisms.
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>When you start an HLS video, your IP address, device data, and streaming statistics may be collected.</li>
              <li>Third-party services, such as Cloudflare Stream or Mux, may store technical data.</li>
              <li>The use of HLS videos requires your active consent via our cookie banner.</li>
            </ul>
            <p className="mb-4 text-gray-300">
              For more information on HLS streaming and data protection, refer to the respective provider policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§7 Your Rights as a Data Subject</h2>
            <p className="mb-4 text-gray-300">
              You have the following rights:
            </p>
            <ul className="list-disc pl-8 mb-4 text-gray-300">
              <li>Access to your stored data (Art. 15 GDPR).</li>
              <li>Correction of incorrect or incomplete data (Art. 16 GDPR).</li>
              <li>Deletion of your data ("right to be forgotten") (Art. 17 GDPR).</li>
              <li>Restriction of processing (Art. 18 GDPR).</li>
              <li>Data portability (Art. 20 GDPR).</li>
              <li>Objection to data processing (Art. 21 GDPR).</li>
            </ul>
            <p className="mb-4 text-gray-300">
              To exercise any of these rights, contact us at: Email: datenschutz@jonasvision.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§8 Data Protection Supervisory Authority</h2>
            <p className="mb-4 text-gray-300">
              You have the right to file a complaint with a data protection authority:
            </p>
            <p className="mb-4 text-gray-300">
              State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia<br />
              Postfach 20 04 44<br />
              40102 Düsseldorf<br />
              Germany<br />
              Phone: +49 211 384 240<br />
              Fax: +49 211 3 842 410<br />
              Email: poststelle@ldi.nrw.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">§9 Changes to This Privacy Policy</h2>
            <p className="mb-4 text-gray-300">
              We reserve the right to update this privacy policy at any time. The latest version will always be available at jonasvision.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
} 