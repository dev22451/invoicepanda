import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "../Style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout"
import Seo from "../components/seo"
import Address from "../components/Address"
import HomePage from "../components/HomePage"
const IndexPage = () => {
  return (
    <div className="indexPage">
      <HomePage />
    </div>
  )
}

export default IndexPage