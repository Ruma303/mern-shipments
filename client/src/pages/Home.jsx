import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col gap-2'>
        <h2 className='text-2xl text-pink-500'>We are using GraphQL with Apollo Client</h2>
        <a href="https://www.apollographql.com/docs/react/get-started/" className='text-blue-500 font-semibold underline'>Start here!</a>
        <p>You are retrieving data from this API:
            <a href="http://localhost:5000/graphql" className='text-blue-500 font-semibold underline ms-1'>http://localhost:5000/graphql</a>
        </p>
    </div>
  )
}

export default Home