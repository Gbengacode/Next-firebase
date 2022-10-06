import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated  create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
         <Login/>
    </div>
  )
}
