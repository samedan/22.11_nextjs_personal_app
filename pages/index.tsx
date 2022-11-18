import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { BlogList } from "@components/blogs";
import { PortfolioList } from "@components/portfolios";
import BaseLayout from "@components/layouts/base";
import { getBlogs } from "@lib/blogs";
import { Blog } from "@interfaces/Blog";
import { saveSearchData } from "@lib/md";
import { getPortfolios } from "@lib/portfolios";
import { Portfolio } from "@interfaces/Portfolio";

type Props = {
  blogs: Blog[];
  portfolios: Portfolio[];
};

const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  return (
    <BaseLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Newest Blogs
        <Link legacyBehavior href="/blogs">
          <a className="text-sm ml-1 text-indigo-600">(See All)</a>
        </Link>
      </h2>

      {/* Blog List Starts */}
      <BlogList blogs={blogs} />
      {/* Blog List Ends */}

      <br></br>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Portfolios
        <Link legacyBehavior href="/portfolios">
          <a className="text-sm ml-1 text-indigo-600">(See All)</a>
        </Link>
      </h2>

      {/* Portfolio List Starts */}
      <PortfolioList portfolios={portfolios} />
      {/* Portfolio List Ends */}
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();
  const portfolios = getPortfolios();
  const content = {
    blogs,
    portfolios,
  };

  saveSearchData(content);
  return { props: { blogs, portfolios } };
};

export default Home;
