// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     if (stage === "build-html" || stage === "develop-html") {
//         actions.setWebpackConfig({
//             module: {
//                 rules: [
//                     {
//                         test: /firebase/,
//                         use: loaders.null(),
//                     },
//                 ],
//             },
//         })
//     }
// }

import * as React from "react"
// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined"
export default function MyComponent() {
    let loggedIn = false
    if (isBrowser) {
        window.localstorage.getItem("isLoggedIn") === "true"
    }
    return <div>Am I logged in? {loggedIn}</div>
}