import { GetStaticProps, NextPageContext } from 'next';

import { UsersList } from 'components/UsersList';

type Props = NextPageContext;

export default function IndexPage(props: Props) {
  return <UsersList />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
