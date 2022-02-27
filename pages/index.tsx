import { gql, useQuery } from '@apollo/client'
import SkillBoards from '@components/skill/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments'
import { IPostDisplay } from '@utils/types/interfaces'
import SeePosts from '@components/post/read/SeePosts'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { postsState } from '@utils/atoms'
import SelectedSkillBoard from '@components/skill/SelectedSkillBoard'

interface ISeePosts {
  [key: string]: IPostDisplay[];
};

const SEE_POSTS_QUERY = gql`
    query seePosts($offset:Int,$skills:String,$howToArrangement:String){
        seePosts(offset:$offset,skills:$skills,howToArrangement:$howToArrangement){
          ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`
const SEE_POSTS_COUNT_QUERY = gql`
  query seePostsCount($skills:String){
    seePostsCount(skills:$skills){
      count
    }
  }
`

const Home = ({ requestedPosts }: ISeePosts) => {
  const setPosts = useSetRecoilState(postsState);

  const seePostsCompleted = ({ seePosts }: ISeePosts) => setPosts(seePosts);

  const { data: seePostsData, fetchMore, refetch: seePostsRefetch } = useQuery(SEE_POSTS_QUERY, {
    onCompleted: seePostsCompleted,
  });

  const { data: seePostsCountData, refetch: seePostsCountRefetch } = useQuery(SEE_POSTS_COUNT_QUERY);

  useEffect(() => {
    setPosts(requestedPosts);
  }, []);
  useEffect(() => {
    setPosts(seePostsData?.seePosts!);
  }, [seePostsData]);

  return (
    <MainLayout
      title="당신의 소울파트너"
    >
      <SkillBoards />
      <SelectedSkillBoard seePostsRefetch={seePostsRefetch} seePostsCountRefetch={seePostsCountRefetch} />
      <SeePosts
        seePostsRefetch={seePostsRefetch}
        howManyData={seePostsCountData?.seePostsCount?.count}
        fetchMore={
          () => fetchMore({
            variables: { offset: seePostsData?.seePosts?.length },
          })
        }
      />
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
