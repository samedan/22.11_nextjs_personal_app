import { getBlogBySlugWithMarkdown, getBlogsSlugs } from "@lib/blogs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import { PageLayout } from "../../components/layouts";
import { Blog } from "@interfaces/Blog";
import { ParsedUrlQuery } from "querystring";
import BlogHeader from "@components/blogs/blogHeader";

type Props = {
  blog: Blog;
};

const BlogDetail: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <PageLayout pageTitle={blog.title}>
        <div className="w-2/3 m-auto">
          {/* Blog Header Starts */}
          <BlogHeader blog={blog} />
          {/* Blog Header Ends */}
          {/* "prose" class comes with @tailwindcss/typography plugin */}
          <article className="prose lg:prose-lg markdown-image-50">
            {/* Blog Content Here */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </div>
      </PageLayout>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const blog = await getBlogBySlugWithMarkdown(slug);
  return {
    props: { blog },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getBlogsSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
