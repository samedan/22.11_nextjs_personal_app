import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import Image from "next/image";
import { Footer, Header, Navbar } from '../components/common';
import { BlogList } from '../components/blogs';






const portfolios = [
  {
    slug: "software-engineer-siemens",
    title: "Software Engineer Siemens",
    description: "Working as C++ and C# software engineer",
    employmentDate: "2022-01-12",
    coverImage: "https://images.unsplash.com/photo-1622473590773-f588134b6ce7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1370&q=50",
  },
]





const Home: NextPage = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
        <Head>
          <title>Portfolio - Popescu Daniel</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="relative">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            {/* Navbar Starts */}
                <Navbar />
            {/* Navbar Ends */}

            {/* Header Starts */}
                <Header />
            {/* Header Ends */}

          </div>
          <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              priority
              layout="fill"
              alt=""
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1369&q=60"
            />
          </div>        
        </div>

        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 
            className="text-2xl font-bold tracking-tight text-gray-900">
              Newest Blogs
              <Link legacyBehavior href="/blogs">
                <a className='text-sm ml-1 text-indigo-600'>
                  (See All)
                </a>
              </Link>
          </h2>

          {/* Blog List Starts */}
            <BlogList />
          {/* Blog List Ends */}

          <br></br>

          <h2 
            className="text-2xl font-bold tracking-tight text-gray-900">
              Portfolios
              <Link legacyBehavior href="/portfolios">
                <a className='text-sm ml-1 text-indigo-600'>
                  (See All)
                </a>
              </Link>
          </h2>

          {/* Portfolio List Starts */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {portfolios.map((portfolio) => (
              <div key={portfolio.slug} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <Image
                    layout="fill"
                    src={portfolio.coverImage}
                    alt={""}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link legacyBehavior href={`/portfolios/${portfolio.slug}`}>
                    <a>
                      <span className="absolute inset-0" />
                      { portfolio.title }
                    </a>
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">{ portfolio.description }</p>
              </div>
            ))}
          </div>
          {/* Portfolio List Ends */}
        </div>
      </div>
    <Footer />
    </>
  )
}

export default Home