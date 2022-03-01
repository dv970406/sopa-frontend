import { gql, useQuery } from '@apollo/client'
import SkillBoards from '@components/skill/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments'
import type { IPostDisplay } from '@utils/types/interfaces'
import SeePosts from '@components/post/read/SeePosts'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { postsState, searchModeState } from '@utils/atoms'
import SelectedSkillBoard from '@components/skill/SelectedSkillBoard'
import Loading from '@components/shared/Loading'
import ArrangePosts from '@components/post/ArrangePosts'

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
  const searchMode = useRecoilValue(searchModeState);

  const seePostsCompleted = ({ seePosts }: ISeePosts) => setPosts(seePosts);

  const { data: seePostsData, loading, fetchMore, refetch: refetchSeePosts } = useQuery(SEE_POSTS_QUERY, {
    onCompleted: seePostsCompleted,
  });

  const { data: seePostsCountData, refetch: refetchSeePostsCount } = useQuery(SEE_POSTS_COUNT_QUERY);

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
      <div
        className={`sm:px-16 md:px-24 lg:px-28 xl:px-48 space-y-8`}
      >
        {searchMode ? null : (
          <>
            <SkillBoards />
            <SelectedSkillBoard refetchSeePosts={refetchSeePosts} refetchSeePostsCount={refetchSeePostsCount} />
            <ArrangePosts refetchFn={refetchSeePosts} />
          </>
        )}
        {loading ? (
          <Loading />
        ) : (
          <SeePosts
            howManyData={seePostsCountData?.seePostsCount?.count}
            fetchMore={
              () => fetchMore({
                variables: { offset: seePostsData?.seePosts?.length },
              })
            }
          />
        )}
      </div>
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
