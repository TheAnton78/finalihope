import './styles/global.css';
import './styles/background.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
