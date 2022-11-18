import { GetStaticProps, NextPage } from "next";
import { PageLayout } from "@components/layouts";
import { Portfolio } from "@interfaces/Portfolio";
import { PortfolioList } from "@components/portfolios";
import { getPortfolios } from "@lib/portfolios";

type Props = {
  portfolios: Portfolio[];
};

const PortfoliosPage: NextPage<Props> = ({ portfolios }) => {
  return (
    <PageLayout pageTitle="My portfolio">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        My Portfolio
      </h2>
      <PortfolioList portfolios={portfolios} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const portfolios = getPortfolios();
  return {
    props: { portfolios },
  };
};

export default PortfoliosPage;
