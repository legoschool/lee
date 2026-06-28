/**
 * 샘플 프로필 데이터 (Fallback)
 * ---------------------------------------------------------------------------
 * Google Sheet 가 아직 연결되지 않았거나(.env 미설정) 로딩에 실패했을 때
 * 페이지가 비어 보이지 않도록 사용하는 예시 데이터입니다.
 * 시트 열 구성을 이해하는 "살아있는 예시" 역할도 합니다.
 */
import type { ProfileData } from "./types";

export const sampleProfile: ProfileData = {
  basics: {
    name: "홍길동",
    headline: "레고에듀케이션 공인강사 · 메이커 교사",
    affiliation: "OO초등학교",
    tagline: "만들면서 배우고, 가르치며 함께 자랍니다.",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Hong",
    coverUrl: "",
    location: "대한민국, 서울",
    email: "hello@example.com",
    phone: "",
    website: "https://example.com/blog",
    available: true,
  },
  about: {
    heading: "소개",
    body: "안녕하세요. 아이들과 함께 만들고 코딩하며 배우는 교사 홍길동입니다.\n블록·로봇·피지컬 컴퓨팅으로 '실패해도 괜찮은 배움'을 추구합니다.\n현장에서 쌓은 경험을 연수와 자료로 나눕니다.",
  },
  socials: [
    { label: "블로그", url: "https://example.com/blog", icon: "blog" },
    { label: "YouTube", url: "https://youtube.com/@example", icon: "youtube" },
    { label: "GitHub", url: "https://github.com/example", icon: "github" },
    { label: "Email", url: "mailto:hello@example.com", icon: "mail" },
  ],
  skills: [
    { name: "블록코딩(스크래치/엔트리)", category: "코딩교육", level: 90 },
    { name: "로봇·피지컬 컴퓨팅", category: "메이커", level: 85 },
    { name: "레고 에듀케이션(SPIKE)", category: "메이커", level: 80 },
    { name: "교육과정·수업 설계", category: "수업", level: 85 },
    { name: "교육자료 디자인", category: "디자인", level: 65 },
  ],
  training: [
    {
      title: "초등 교사를 위한 블록코딩 입문 연수",
      host: "OO교육청",
      audience: "초등교사",
      role: "주강사",
      hours: "15차시",
      participants: "30명",
      date: "2024-07",
      location: "OO교육연수원",
      description: "엔트리로 시작하는 수업 설계와 실습 중심 연수.",
    },
    {
      title: "메이커 교육 직무연수",
      host: "한국교원연수원",
      audience: "초·중등 교사",
      role: "주강사",
      hours: "30시간",
      participants: "온라인 120명",
      date: "2023",
      location: "온라인",
      description: "피지컬 컴퓨팅 키트 활용 프로젝트 수업.",
    },
  ],
  trainingReceived: [
    {
      title: "AI·데이터 교육 선도교원 연수",
      host: "교육부",
      hours: "60시간",
      date: "2023-08",
      description: "AI 융합교육 수업 사례 연구.",
    },
    {
      title: "레고 에듀케이션 SPIKE 인증 과정",
      host: "LEGO Education",
      hours: "20시간",
      date: "2022-02",
      description: "",
    },
  ],
  resources: [
    {
      title: "센서로 배우는 피지컬 컴퓨팅 교안",
      type: "교안",
      audience: "초등 5~6학년",
      topic: "메이커",
      url: "https://example.com/resource/sensor",
      year: "2024",
      isPublic: true,
      description: "센서·모터 기초 12차시 분량.",
    },
    {
      title: "엔트리 게임 만들기 워크북",
      type: "교재",
      audience: "초등 3~4학년",
      topic: "블록코딩",
      url: "",
      year: "2024",
      isPublic: false,
      description: "",
    },
    {
      title: "수업용 로봇 미션 카드 세트",
      type: "키트",
      audience: "초등",
      topic: "로봇",
      url: "https://example.com/resource/mission",
      year: "2023",
      isPublic: true,
      description: "난이도별 미션 30종.",
    },
  ],
  journal: [
    {
      year: "2024",
      date: "2024-03-12",
      title: "새 학년, 첫 메이커 수업",
      body: "처음엔 어색해하던 아이들이 모터가 돌아가자 눈이 반짝였다.\n실패를 두려워하지 않는 교실을 만들고 싶다.",
      tags: ["메이커", "수업일기"],
    },
    {
      year: "2023",
      date: "2023-11-02",
      title: "연수에서 만난 선생님들",
      body: "가르치러 갔다가 더 많이 배우고 돌아왔다. 현장의 고민은 비슷했다.",
      tags: ["연수", "성장"],
    },
  ],
  experience: [
    {
      organization: "OO초등학교",
      role: "교사 · 메이커교육 담당",
      startDate: "2019-03",
      endDate: "",
      location: "서울",
      description: "코딩·메이커 동아리 운영 및 교육과정 연계 수업.",
      highlights: [
        "학교 메이커스페이스 구축",
        "교내 코딩 동아리 3년 운영",
      ],
    },
    {
      organization: "교육청 영재교육원",
      role: "강사(위촉)",
      startDate: "2021-03",
      endDate: "2023-02",
      location: "서울",
      description: "초등 정보영재 로봇·코딩 지도.",
      highlights: [],
    },
  ],
  education: [
    {
      school: "OO교육대학교",
      degree: "학사",
      field: "초등교육(컴퓨터교육 심화)",
      startDate: "2011",
      endDate: "2015",
      description: "",
    },
  ],
  projects: [
    {
      title: "우리 학교 메이커 페스티벌",
      description: "학생 주도 메이커 작품 전시·체험 행사 기획·운영.",
      imageUrl: "",
      url: "https://example.com/festival",
      repoUrl: "",
      tags: ["행사운영", "메이커"],
      date: "2024",
      featured: true,
    },
    {
      title: "학습 진도 대시보드",
      description: "구글 시트 데이터를 시각화하는 수업 관리 도구.",
      imageUrl: "",
      url: "",
      repoUrl: "https://github.com/example/dashboard",
      tags: ["도구", "Google Sheets"],
      date: "2023",
      featured: false,
    },
  ],
  awards: [
    {
      title: "정보·컴퓨터 교사 자격",
      issuer: "교육부",
      kind: "자격증",
      date: "2015",
      description: "",
    },
    {
      title: "올해의 메이커 교사상",
      issuer: "OO교육청",
      kind: "수상",
      date: "2023",
      description: "지역 메이커 교육 기여 공로.",
    },
  ],
};
