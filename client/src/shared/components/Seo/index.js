import React from 'react'
import { Helmet } from 'react-helmet-async'

const Seo = ({ title }) => (
  <Helmet>
    <title>{`${title} - Baroasta`}</title>
  </Helmet>
)

export default Seo