import "../public/CSS/global.css"
import "../public/CSS/Header.css"
import "../public/CSS/body.css"
import "../public/CSS/settings.css"

export const metadata = {
    title: 'Pedido Web',
    description: 'Pedidos a tiempo y con adelanto dle mismo',
}

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }