import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={350}
    viewBox="0 0 250 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-1" y="0" rx="0" ry="0" width="250" height="300" />
    <rect x="0" y="312" rx="0" ry="0" width="250" height="16" />
    <rect x="0" y="334" rx="0" ry="0" width="250" height="16" />
  </ContentLoader>
)

export default Sceleton
