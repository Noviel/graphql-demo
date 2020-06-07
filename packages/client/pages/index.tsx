import { GetStaticProps, NextPageContext } from 'next';

type Props = NextPageContext;

export default function IndexPage(props: Props) {
  return <div>index page, api: {process.env.NEXT_PUBLIC_GRAPHQL_URI}</div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
