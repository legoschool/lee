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
    headline: "교육자 · 메이커 · 평생 학습자",
    tagline: "배움을 나누고, 만들면서 배웁니다.",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Hong",
    coverUrl: "",
    location: "대한민국, 서울",
    email: "hello@example.com",
    phone: "",
    website: "https://example.com",
    available: true,
  },
  about: {
    heading: "소개",
    body: "안녕하세요. 사람과 기술, 교육이 만나는 지점에서 일하는 홍길동입니다.\n새로운 것을 배우고, 배운 것을 쉽게 풀어 나누는 일을 좋아합니다.\n현재는 메이커 교육과 디지털 도구를 활용한 학습 콘텐츠를 만들고 있습니다.",
  },
  socials: [
    { label: "GitHub", url: "https://github.com/example", icon: "github" },
    { label: "Instagram", url: "https://instagram.com/example", icon: "instagram" },
    { label: "Blog", url: "https://example.com/blog", icon: "link" },
    { label: "Email", url: "mailto:hello@example.com", icon: "mail" },
  ],
  skills: [
    { name: "교육 콘텐츠 기획", category: "교육", level: 90 },
    { name: "메이커 / 피지컬 컴퓨팅", category: "교육", level: 80 },
    { name: "React", category: "개발", level: 70 },
    { name: "TypeScript", category: "개발", level: 65 },
    { name: "그래픽 디자인", category: "디자인", level: 60 },
  ],
  experience: [
    {
      organization: "레고스쿨",
      role: "교육 콘텐츠 리드",
      startDate: "2022-03",
      endDate: "",
      location: "서울",
      description: "초·중등 대상 메이커/코딩 교육 커리큘럼 기획 및 운영.",
      highlights: [
        "연간 20+ 워크숍 기획 및 진행",
        "교육 자료 디지털화로 준비 시간 40% 단축",
      ],
    },
    {
      organization: "오픈 커뮤니티",
      role: "자원봉사 멘토",
      startDate: "2020-01",
      endDate: "2022-02",
      location: "온라인",
      description: "입문자 대상 코딩/메이킹 멘토링.",
      highlights: ["누적 50명 이상 멘티 지도"],
    },
  ],
  education: [
    {
      school: "OO대학교",
      degree: "학사",
      field: "컴퓨터교육",
      startDate: "2014",
      endDate: "2018",
      description: "",
    },
  ],
  projects: [
    {
      title: "메이커 키트 교안",
      description: "센서와 모터로 배우는 입문용 피지컬 컴퓨팅 교안 모음.",
      imageUrl: "",
      url: "https://example.com/maker-kit",
      repoUrl: "",
      tags: ["교육", "메이커", "Arduino"],
      date: "2024",
      featured: true,
    },
    {
      title: "학습 진도 대시보드",
      description: "구글 시트 데이터를 시각화하는 간단한 웹 대시보드.",
      imageUrl: "",
      url: "",
      repoUrl: "https://github.com/example/dashboard",
      tags: ["React", "Google Sheets"],
      date: "2023",
      featured: false,
    },
  ],
  awards: [
    {
      title: "우수 교육자상",
      issuer: "OO교육청",
      date: "2023",
      description: "지역 메이커 교육 기여 공로.",
    },
    {
      title: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2019",
      description: "",
    },
  ],
};
