export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 text-center relative z-10 border-t border-white/5 mt-20">
      <p className="text-muted-silver/60 text-sm font-mono">
        &copy; {currentYear} | Designed & Engineered with Code & Sorcery by <span className="text-neon-cyan/70">Vishwajeet Singh Rawat</span>.
      </p>
    </footer>
  );
}
