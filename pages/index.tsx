import { gql } from '@apollo/client'
import SkillBoards from '@components/home/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import useMyInfo from 'hooks/useMyInfo'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { useEffect } from 'react'
import { useResetRecoilState, useRecoilState } from 'recoil'
import { selectedSkillsState, postsState, IPost } from '@utils/atoms'

interface IHome {
  requestedPosts: IPost[];
}

const SEE_POSTS_QUERY = gql`
    query seePosts{
        seePosts{
            id
            title
        }
    }
`

const Home = ({ requestedPosts }: IHome) => {
  const [posts, setPosts] = useRecoilState(postsState)
  const asd = useMyInfo()
  const resetSelectedSkill = useResetRecoilState(selectedSkillsState)

  useEffect(() => {
    resetSelectedSkill();
    setPosts(requestedPosts)
  }, [])

  return (
    <MainLayout title="당신의 소울파트너">
      <SkillBoards />
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
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
