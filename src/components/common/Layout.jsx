import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ChatWidget } from "./ChatWidget"

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
      <ChatWidget />
    </>
  )
}
