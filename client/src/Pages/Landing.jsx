import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* HERO TEXT ONLY */}
      <section className="flex-1 px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Închiriază-ți <span className="text-amber-500">rapid</span> mașina ideală
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Alege dintr-o flotă variată de mașini, fără taxe ascunse. Rezervă în mai puțin de 2 minute!
        </p>
        <Link
          to="/home"
          className="inline-block px-8 py-3 rounded-full bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition"
        >
          Vezi mașinile
        </Link>
      </section>

      {/* BENEFICII */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
          {[
            { icon: "🧼", titlu: "Mașini curate", txt: "Igienizare completă după fiecare client" },
            { icon: "📍", titlu: "Peste 20 locații", txt: "Disponibil în toată țara" },
            { icon: "🛡️", titlu: "Asistență 24/7", txt: "Oriunde, oricând, fără stres" },
          ].map((b, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-bold mb-2">{b.titlu}</h3>
              <p className="text-gray-600">{b.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-amber-500 text-white text-center py-10 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Pregătit pentru drum? Începe acum!
        </h2>
        <Link
          to="/home"
          className="inline-block px-8 py-3 bg-white text-amber-600 font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Rezervă o mașină
        </Link>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;
