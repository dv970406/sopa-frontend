# SOPA

사이드 프로젝트, 스터디 팀원 매칭 사이트입니다.

- 소파 설명 : [벨로그](https://velog.io/@db970406/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8C%8C%ED%8A%B8%EB%84%88-%EB%A7%A4%EC%B9%AD-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%86%8C%ED%8C%8C)

- 소파 주소 : [소파](https://www.sopa.pro)

# 사용된 기술

- [Next](https://nextjs.org/) - React based SSR framework used
- [Recoil](https://recoiljs.org/ko/) - State Management
- [Apollo](https://www.apollographql.com/) - Communicate with Server by GraphQL
- [Tailwind CSS](https://tailwindcss.com/) - Main CSS Tool
- [Framer-motion](https://www.framer.com/docs/introduction/) - Interactive Skills
- [SendGrid](https://app.sendgrid.com/) - Check User's Email Validation

# 만든 이

- **Choi** - _Full work_ - [db970406](https://github.com/db970406)

# 설명

## 1. 사이드바 스킬 셀렉터

> 사이드바를 활용한 게시글 필터링!👈

![소파 셀렉터1](https://user-images.githubusercontent.com/87655280/158937741-bc598d1e-3578-4da4-9c51-044b1bf17613.gif)

- 스킬을 선택하게 되면 사이드바에서 선택 내역을 볼 수 있고 그 스킬이 포함된 게시글만이 보여지는 필터링 기능을 구현하였습니다(많은 게시글이 있다면 더욱 아름다워지겠죠?? 많은 이용 부탁드려요!)

## 2. 세미 디테일 화면 추가

> 자세한 기술 스택과 글의 내용을 확인!😮

![소파 세미](https://user-images.githubusercontent.com/87655280/158937753-3fee7603-f08b-4b13-93d3-94bbf3e008d9.gif)

- 불필요한 게시글 입장으로 뒤로가기 클릭을 지양하기 위해 유저분들이 스킬과 게시글의 내용을 얼추 확인한 다음!! 관심이 있다면 컨택을 하기 위해 게시글로 입장을 할 수 있도록 세미 디테일 화면을 구현하였습니다(세미 디테일 창에서 제목 혹은 돋보기를 클릭하시면 게시글로 넘어갑니다)!
- 내용을 읽었는데 관심이 없다면? 세미 디테일 밖의 화면을 클릭한다면 바로 창이 닫혀요!

## 3. 정렬 기능

> 게시글의 최신, 관심, 조회, 댓글 순 정렬 가능!

![소파 정렬](https://user-images.githubusercontent.com/87655280/158937763-2ed6d3a9-8e35-4c39-8ffc-1d2ee7e4454d.gif)

- 최초에는 최신순으로 정렬되며 각 탭을 눌러 각 기준의 내림차순으로 확인할 수 있고 프로필에도 적용되는 기능입니다. 정렬이 의미있어 질 수 있도록 많은 이용 부탁드려요

## 4. 관심 기능

> 게시글에 대한 관심을 누르고 프로필에서 자신의 관심 내역 확인 가능!💜

![소파 관심](https://user-images.githubusercontent.com/87655280/158937773-5c12552d-2d1b-4e6c-96d8-c7930d366c65.gif)

- 관심은 게시글 정렬의 기준 중 하나이자 게시글에 흥미가 있다면 관심을 누르고 추후에 프로필 화면에서 확인할 수 있어요!
- 짤과 같이 home페이지에서 클릭하는 것은 물론이고 게시글 상세 화면에서도 관심 클릭이 당연히 가능하답니다!

## 5. 제목으로 검색

> 제목에 들어간 키워드로 게시글을 검색할 수 있어요!🔍

![소파 검색](https://user-images.githubusercontent.com/87655280/158937777-0109ede8-fd4d-4311-93fe-3fc490f8ece6.gif)

- 검색이 끝나면 X버튼을 눌러 원래 화면으로 돌아갈 수 있답니다!

## 6. 게시글 작성자의 깃허브 확인

![image](https://user-images.githubusercontent.com/87655280/158937845-08cd8137-559a-4a0a-828e-37ed00db21e7.png)

- 유저분들은 유저 정보 수정에서 깃허브 링크를 추가할 수 있어요!
- 그리고 게시글을 올리면 작성자분의 닉네임과 깃허브 링크가 반영되어 다른 유저분들이 제목 반대편에서 확인할 수 있어요. 클릭하면 이동한답니다!

## 7. 이 외의 기본 기능

![소파 업로드 절차](https://user-images.githubusercontent.com/87655280/158937786-ca7f844b-f93c-4f96-acb9-35251d7fde49.gif)

- 게시글 업로드 시 스킬 선택이 최대한 편리할 수 있도록 구현하였어요!
- 이 외에도 네이버 카카오 깃허브 소셜로그인, 댓글 추가 수정 삭제, 게시글 추가 수정 삭제, 프로필을 통한 관심 내역, 내 게시글 내역, 내 댓글 내역 등을 관리 할 수 있습니다.
- 그리고 화면에서 볼 수 있듯 다크모드도 있으니 사용하고 계신 기기의 다크모드를 켜주시면 검은 배경에 예쁜 연보라색을 포인트로 한 소파를 이용할 수 있어요! 저는 개인적으로 다크모드가 더 좋아서 항상 켜놓고 있는답니다.
