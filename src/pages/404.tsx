import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
      <main>
          <h1 className='text-4xl'>Page not found</h1>
          <p>
              Sorry 😔, we couldn't find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
              Try creating a page in <code className='code'>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
              <Link replace={true} to="/">Go home</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
