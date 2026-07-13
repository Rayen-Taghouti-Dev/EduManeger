export function ThemeScript() {
  const code = `
    (function() {
      try {
        var theme = localStorage.getItem('edumanager-theme') || 'system';
        var resolved = theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;
        document.documentElement.classList.add(resolved);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
