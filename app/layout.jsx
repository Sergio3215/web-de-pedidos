import "../public/CSS/global.css"
import "../public/CSS/Header.css"
import "../public/CSS/body.css"
import "../public/CSS/settings.css"
import "../public/CSS/productos.css"
import "../public/CSS/grilla.css"
import "../public/CSS/loader.css"

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