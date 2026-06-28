/**
 * 범용 개인 프로필 데이터 모델
 * ---------------------------------------------------------------------------
 * 이 파일은 프로필 페이지가 사용하는 모든 데이터의 "형태(schema)"를 정의합니다.
 * 실제 값은 Google Sheets 에서 불러오며(src/lib/googleSheets.ts),
 * 시트가 없을 때는 src/data/sampleProfile.ts 의 샘플로 대체됩니다.
 *
 * 각 인터페이스는 Google Sheet 의 한 탭(시트)에 대응합니다.
 * 탭/열 구성은 docs/google-sheets-setup.md 를 참고하세요.
 */

/** 외부 링크 (GitHub, Instagram, YouTube, 블로그 등) — 시트 탭: "Socials" */
export interface SocialLink {
  /** 표시 이름 (예: GitHub) */
  label: string;
  /** 전체 URL */
  url: string;
  /** 아이콘 키 (예: github, instagram, youtube, mail, link) */
  icon?: string;
}

/** 프로필 기본 정보 — 시트 탭: "Basics" (key/value 형태) */
export interface ProfileBasics {
  /** 이름 */
  name: string;
  /** 한 줄 소개 / 직함 (예: "교육자 · 메이커") */
  headline: string;
  /** 짧은 소개 문구 */
  tagline?: string;
  /** 프로필 사진 URL */
  avatarUrl?: string;
  /** 상단 배경(커버) 이미지 URL */
  coverUrl?: string;
  /** 지역 (예: 서울, 대한민국) */
  location?: string;
  /** 이메일 */
  email?: string;
  /** 전화번호 */
  phone?: string;
  /** 개인 웹사이트 URL */
  website?: string;
  /** 협업/연락 가능 여부 (배지 표시용) */
  available?: boolean;
}

/** 자기소개 본문 — 시트 탭: "About" (key/value 형태) */
export interface AboutSection {
  /** 섹션 제목 (예: "소개") */
  heading: string;
  /** 본문 (여러 문단, 줄바꿈 유지) */
  body: string;
}

/** 보유 역량 — 시트 탭: "Skills" */
export interface Skill {
  /** 스킬 이름 (예: React, 그래픽 디자인) */
  name: string;
  /** 분류 (예: 개발, 디자인, 교육) */
  category?: string;
  /** 숙련도 0~100 (막대 그래프용) */
  level?: number;
}

/** 경력 / 활동 — 시트 탭: "Experience" */
export interface ExperienceItem {
  /** 소속 (회사/단체/학교) */
  organization: string;
  /** 역할/직책 */
  role: string;
  /** 시작 (예: 2022-03) */
  startDate: string;
  /** 종료 (비우면 "현재"로 처리) */
  endDate?: string;
  /** 근무 지역/형태 */
  location?: string;
  /** 설명 */
  description?: string;
  /** 주요 성과 (시트에서는 줄바꿈 또는 ';' 로 구분) */
  highlights?: string[];
}

/** 학력 — 시트 탭: "Education" */
export interface EducationItem {
  /** 학교/기관 */
  school: string;
  /** 학위/과정 (예: 학사) */
  degree?: string;
  /** 전공/분야 */
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

/** 프로젝트 / 작품 — 시트 탭: "Projects" */
export interface ProjectItem {
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 대표 이미지 URL */
  imageUrl?: string;
  /** 외부 링크(데모/페이지) */
  url?: string;
  /** 저장소 링크 */
  repoUrl?: string;
  /** 태그 (시트에서는 ',' 로 구분) */
  tags?: string[];
  /** 날짜/기간 (예: 2024) */
  date?: string;
  /** 상단 강조 노출 여부 */
  featured?: boolean;
}

/** 수상 / 자격증 — 시트 탭: "Awards" */
export interface AwardItem {
  /** 제목 (예: 정보처리기사) */
  title: string;
  /** 발급/주최 기관 */
  issuer?: string;
  /** 취득/수상일 */
  date?: string;
  description?: string;
}

/** 페이지 전체가 사용하는 최종 프로필 데이터 묶음 */
export interface ProfileData {
  basics: ProfileBasics;
  about?: AboutSection;
  socials: SocialLink[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
}

/** 각 시트 탭 이름 — googleSheets.ts 와 시트 구조가 공유하는 단일 출처 */
export const SHEET_TABS = {
  basics: "Basics",
  about: "About",
  socials: "Socials",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  awards: "Awards",
} as const;
