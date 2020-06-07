import { GetStaticProps, NextPageContext } from 'next';

type Props = NextPageContext;

export default function IndexPage(props: Props) {
  return <div>index page</div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
