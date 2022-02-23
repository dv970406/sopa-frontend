import { gql } from '@apollo/client'
import SkillBoards from '@components/home/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments'
import { IPostDisplay } from '@utils/types/interfaces'
import SeePosts from '@components/post/read/SeePosts'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { postsState } from '@utils/atoms'

interface IHome {
  requestedPosts: IPostDisplay[];
}

const SEE_POSTS_QUERY = gql`
    query seePosts{
        seePosts{
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`


const Home = ({ requestedPosts }: IHome) => {
  const setPosts = useSetRecoilState(postsState);

  useEffect(() => {
    setPosts(requestedPosts);
  }, []);

  return (
    <MainLayout title="당신의 소울파트너">
      <SkillBoards />
      <SeePosts />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // seePosts query 요청부
  const { data } = await client.query({
    query: SEE_POSTS_QUERY,
  });
  return {
    props: {
      requestedPosts: data.seePosts,
    }
  }
}

export default Home
