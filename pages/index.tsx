import { gql } from '@apollo/client'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import SkillBoards from '../components/home/SkillBoards';
import MainLayout from '../components/shared/MainLayout'
import useMyInfo from '../hooks/useMyInfo';
import { client } from '../utils/apollo'

interface IPost {
  __typename: string;
  id: number;
  title: string;
}

interface IHome {
  posts: IPost[];
}

const SEE_POSTS_QUERY = gql`
    query seePosts{
        seePosts{
            id
            title
        }
    }
`

const Home = ({ posts }: IHome) => {
  const asd = useMyInfo()

  return (
    <MainLayout title="당신의 소울파트너">
      <SkillBoards />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  // seePosts query 요청부
  const { data } = await client.query({
    query: SEE_POSTS_QUERY
  });

  return {
    props: {
      posts: data.seePosts,
    }
  }
}

export default Home
