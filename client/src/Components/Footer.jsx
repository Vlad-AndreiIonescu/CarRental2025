// ─────────────────────────────────────────────────────────────
// src/Components/Footer.jsx
// ─────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-8">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
      {/* Col 1 */}
      <div>
        <h4 className="text-xl font-semibold text-white mb-3">CARLUX</h4>
        <p>© {new Date().getFullYear()} Toate drepturile rezervate.</p>
      </div>

      {/* Col 2 */}
      <div>
        <h4 className="font-semibold text-white mb-3">Contact</h4>
        <p>📞 0760 000 000</p>
        <p>✉ contact@carlux.ro</p>
        <p>📍 Str. Exemplu 1, București</p>
      </div>

      {/* Col 3 */}
      <div>
        <h4 className="font-semibold text-white mb-3">Urmărește-ne</h4>
        <div className="flex gap-4 text-white mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.464h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-6 h-6 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg className="w-6 h-6 hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.75 4.5v10.24a2.26 2.26 0 1 1-2.26-2.26h.38a.38.38 0 0 0 .38-.38V8.5a.38.38 0 0 0-.38-.38h-.38a5.26 5.26 0 1 0 5.26 5.26V9.15c.947.517 2.027.796 3.14.8V8.31a4.97 4.97 0 0 1-3.14-1.1V4.5h-3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
