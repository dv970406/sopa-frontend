import { gql } from '@apollo/client'
import SkillBoards from '@components/home/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import useMyInfo from 'hooks/useMyInfo'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { useEffect } from 'react'
import { useResetRecoilState } from 'recoil'
import { selectedSkillsState } from '@utils/atoms'

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
  const resetSelectedSkill = useResetRecoilState(selectedSkillsState)

  useEffect(() => {
    resetSelectedSkill()
  }, [])
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
