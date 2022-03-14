import { gql, useQuery } from '@apollo/client';
import SkillBoards from '@components/skill/SkillBoards';
import MainLayout from '@components/shared/MainLayout';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { IPostDisplay } from '@utils/types/interfaces';
import SeePosts from '@components/post/read/SeePosts';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postsState, searchModeState } from '@utils/atoms';
import SelectedSkillBoard from '@components/skill/SelectedSkillBoard';
import SortPosts from '@components/post/SortPosts';
import { GetServerSidePropsContext, NextPage } from 'next';
import { client } from '@utils/apollo';

interface ISeePostsQuery {
  seePosts: IPostDisplay[];
};
interface ISeePostsCountQuery {
  seePostsCount: {
    count: number;
  };
};

const SEE_POSTS_QUERY = gql`
    query seePosts($offset:Int,$skills:String,$howToSort:String){
        seePosts(offset:$offset,skills:$skills,howToSort:$howToSort){
          ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;

const SEE_POSTS_COUNT_QUERY = gql`
  query seePostsCount($skills:String){
    seePostsCount(skills:$skills){
      count
    }
  }
`;

const Home: NextPage = () => {
  const setPosts = useSetRecoilState(postsState);
  const searchMode = useRecoilValue(searchModeState);

  const { data: seePostsData, loading, fetchMore, refetch: refetchSeePosts } = useQuery<ISeePostsQuery>(SEE_POSTS_QUERY);

  const { data: seePostsCountData, refetch: refetchSeePostsCount } = useQuery<ISeePostsCountQuery>(SEE_POSTS_COUNT_QUERY);

  useEffect(() => {
    setPosts(seePostsData?.seePosts!);
  }, [seePostsData, setPosts]);
  useEffect(() => {
    if (!searchMode) {
      setPosts(seePostsData?.seePosts!);
    };
  }, [searchMode, seePostsData, setPosts]);

  return (
    <MainLayout
      title="소파"
    >
      {searchMode ? null : (
        <>
          <SkillBoards />
          <SelectedSkillBoard refetchSeePosts={refetchSeePosts} refetchSeePostsCount={refetchSeePostsCount} />
          <SortPosts refetchFn={refetchSeePosts} />
        </>
      )}
      <SeePosts
        loading={loading}
        howManyData={seePostsCountData?.seePostsCount?.count!}
        fetchMore={
          () => fetchMore({
            variables: { offset: seePostsData?.seePosts?.length },
          })
        }
      />
    </MainLayout>
  );
};

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  await client.query({
    query: SEE_POSTS_QUERY,
    variables: {
      howToSort: "new"
    },
    context: {
      headers: {
        token: req.cookies["TOKEN"]
      }
    }
  });

  return {
    props: {
      initialCache: client.cache.extract()
    }
  }
}

export default Home;
