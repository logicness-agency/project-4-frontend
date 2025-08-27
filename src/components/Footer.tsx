import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black backdrop-blur-sm border-t border-gray-700 px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg text-sm">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
        <p className="text-gray-400">© 2025 Logicness Agency</p>
      </div>
      <div className="flex gap-3">
        <a
          href="https://github.com/logicness-agency"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <img
            src="https://img.icons8.com/?size=100&id=101795&format=png&color=ffffff"
            alt="GitHub"
            className="w-6 h-6"
          />
        </a>
        <a
          href="https://linkedin.com/in/enes-günay-331791347"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <img
            src="https://img.icons8.com/?size=100&id=42453&format=png&color=ffffff"
            alt="LinkedIn"
            className="w-6 h-6"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
