import React from 'react'
import Router from 'next/router'
import Link from 'next/link'

const Index = (props) => (
  <div>
    <button
      type="button"
      onClick={() =>
        Router.push({
          pathname: '/',
          query: { name: 'Zeit' },
        })
      }
    >
      sdsd
    </button>
    <Link
      href={{
        pathname: '/',
        query: { name: 'Zeit' },
      }}
    >
      <a>555</a>
    </Link>
  </div>
)

export default Index
