import { gql } from '@apollo/client'
import type { GetServerSideProps } from 'next'
import MainLayout from '../components/shared/MainLayout'
import { client } from '../utils/apollo'

interface IPost {
  __typename: string;
  id: number;
  title: string;
}
interface IPosts {
  posts: IPost[]
}

const Home = ({ posts }: IPosts) => {
  return (
    <MainLayout title="당신의 소울파트너">
      <div>
        {posts.map(post => <div key={post.id}>{post.title}</div>)}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const { data } = await client.query({
    query: gql`
      query seePosts{
        seePosts{
          id
          title
        }
      }
    `
  });

  return {
    props: {
      posts: data.seePosts,
    }
  }
}

export default Home
