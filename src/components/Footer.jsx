export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--color-border)] py-6 text-sm text-[var(--color-text-muted)]">
      © {new Date().getFullYear()} Nick Esselman
    </footer>
  );
}
