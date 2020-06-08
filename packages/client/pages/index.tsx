import { GetStaticProps, NextPageContext } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { UsersList } from 'components/UsersList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
  })
);

type Props = NextPageContext;

export default function IndexPage(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UsersList />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
