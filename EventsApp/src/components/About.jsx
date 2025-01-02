import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-indigo-800 text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl pt-20 mx-auto p-8 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg -mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Despre noi</h1>
        <p className="text-base mb-4">
          Aplicația noastră web este accesibilă de pe orice dispozitiv—desktop, mobil sau tabletă—pentru a vă oferi flexibilitatea de care aveți nevoie.
        </p>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li>
            <span className="font-semibold">Pentru organizatori:</span> Posibilitatea de a crea și gestiona evenimente individuale sau serii recurente, cu generarea automată a codurilor de acces unice (QR) pentru participanți.
          </li>
          <li>
            <span className="font-semibold">Pentru participanți:</span> Autentificare simplă și selectarea evenimentelor disponibile, cu acces rapid prin scanarea codului QR, facilitând participarea la eveniment.
          </li>
          <li>
            <span className="font-semibold">Monitorizare și raportare:</span> Urmărirea în timp real a prezenței participanților și exportul listelor în formate CSV sau XLSX, eficientizând procesul de gestionare a datelor.
          </li>
        </ul>
        <p className="text-base mt-4">
          Aplicația noastră îmbunătățește experiența utilizatorilor de ambele părți, simplificând și eficientizând procesul de monitorizare a prezenței.
        </p>
      </div>

      <div id="contact" className="mt-20 bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Contactați-ne</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-indigo-500 text-xl" />
            <span className="text-base">eventsApp@gmail.ro</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhone className="text-indigo-500 text-xl" />
            <span className="text-base">+40 732 416 589</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-indigo-500 text-xl" />
            <span className="text-base">Strada Maceselor, Nr. 76, București, România</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
