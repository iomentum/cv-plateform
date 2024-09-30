import { version } from "../package.json";

const Footer = () => {
  return (
    <footer className="mt-10 pt-10 px-4 border-t bg-card">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-1 flex-col sm:flex-row sm:gap-5">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Jobbi - Tout droits résérvés
        </p>
        <a
          href="/legal-notice"
          className="hover:text-primary hover:underline transition-all"
        >
          Mentions légales
        </a>

        <p className="text-muted-foreground">v{version}</p>
      </div>
    </footer>
  );
};

export default Footer;
