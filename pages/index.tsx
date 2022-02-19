import { gql, useApolloClient } from '@apollo/client'
import SkillBoards from '@components/home/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import useMyInfo from 'hooks/useMyInfo'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments'
import { IPostDisplay } from '@utils/types/interfaces'
import SeePosts from '@components/post/SeePosts'
import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { postsState, selectedSkillsState } from '@utils/atoms'

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
  const [posts, setPosts] = useRecoilState(postsState);
  const { seeMyProfile } = useMyInfo();
  const resetSelectedSkill = useResetRecoilState(selectedSkillsState);
  const { cache } = useApolloClient()

  useEffect(() => {
    resetSelectedSkill();
    setPosts(requestedPosts);

  }, []);

  return (
    <MainLayout title="당신의 소울파트너">
      <SkillBoards />
      <SeePosts posts={posts} />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // seePosts query 요청부
  const { data } = await client.query({
    query: SEE_POSTS_QUERY,
  });
  client.cache.extract()
  return {
    props: {
      requestedPosts: data.seePosts,
    }
  }
}

export default Home
