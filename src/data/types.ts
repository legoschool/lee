/**
 * 교육자 개인 프로필 데이터 모델
 * ---------------------------------------------------------------------------
 * 이 파일은 프로필 페이지가 사용하는 모든 데이터의 "형태(schema)"를 정의합니다.
 * 실제 값은 Google Sheets 에서 불러오며(src/lib/googleSheets.ts),
 * 시트가 없을 때는 src/data/sampleProfile.ts 의 샘플로 대체됩니다.
 *
 * 각 인터페이스는 Google Sheet 의 한 탭(시트)에 대응합니다.
 * 탭/열 구성은 docs/google-sheets-setup.md 를 참고하세요.
 */

/** 외부 링크 (블로그, 유튜브, 인스타, 깃허브 등) — 시트 탭: "Socials" */
export interface SocialLink {
  /** 표시 이름 (예: 블로그) */
  label: string;
  /** 전체 URL */
  url: string;
  /** 아이콘 키 (예: github, instagram, youtube, mail, link, blog) */
  icon?: string;
}

/** 프로필 기본 정보 — 시트 탭: "Basics" (key/value 형태) */
export interface ProfileBasics {
  /** 이름 */
  name: string;
  /** 직함 (예: 레고에듀케이션 공인강사) */
  headline: string;
  /** 소속 (학교/기관) */
  affiliation?: string;
  /** 짧은 소개 문구 */
  tagline?: string;
  /** 프로필 사진 URL */
  avatarUrl?: string;
  /** 상단 배경(커버) 이미지 URL */
  coverUrl?: string;
  /** 지역 (예: 서울) */
  location?: string;
  /** 이메일 */
  email?: string;
  /** 전화번호 */
  phone?: string;
  /** 개인 웹사이트/블로그 URL */
  website?: string;
  /** 강의/협업 가능 여부 (배지 표시용) */
  available?: boolean;
}

/** 자기소개 본문 — 시트 탭: "About" (key/value 형태) */
export interface AboutSection {
  /** 섹션 제목 (예: 소개) */
  heading: string;
  /** 본문 (자기소개 + 교육 철학, 줄바꿈 유지) */
  body: string;
}

/** 전문 분야 / 역량 — 시트 탭: "Skills" */
export interface Skill {
  /** 분야 이름 (예: 블록코딩, 로봇교육) */
  name: string;
  /** 분류 (예: 코딩교육 / 메이커 / 로봇) */
  category?: string;
  /** 숙련도 0~100 (막대 그래프용) */
  level?: number;
}

/** 진행한 연수·강의 (출강 이력) — 시트 탭: "Training" */
export interface TrainingItem {
  /** 연수/강의명 */
  title: string;
  /** 주최 기관 */
  host?: string;
  /** 대상 (예: 초등교사) */
  audience?: string;
  /** 역할 (예: 주강사 / 보조강사) */
  role?: string;
  /** 차시·시간 (예: 15차시 / 30시간) */
  hours?: string;
  /** 인원 */
  participants?: string;
  /** 일자/기간 (예: 2024-07 또는 2024) */
  date?: string;
  /** 장소/형태 (예: 온라인, OO교육청) */
  location?: string;
  /** 설명 */
  description?: string;
}

/** 이수한 연수 (받은 교육) — 시트 탭: "TrainingReceived" */
export interface TrainingReceivedItem {
  /** 연수명 */
  title: string;
  /** 운영 기관 */
  host?: string;
  /** 이수 시간 (예: 30시간) */
  hours?: string;
  /** 이수일 (예: 2023-08) */
  date?: string;
  /** 비고 */
  description?: string;
}

/** 개발 자료 / 콘텐츠 — 시트 탭: "Resources" (연도별 그룹) */
export interface ResourceItem {
  /** 자료명 */
  title: string;
  /** 종류 (예: 교재 / 교안 / 영상 / 키트) */
  type?: string;
  /** 대상 (예: 초등 3~4학년) */
  audience?: string;
  /** 주제 */
  topic?: string;
  /** 링크 (자료/다운로드) */
  url?: string;
  /** 연도 (그룹 기준, 예: 2024) */
  year?: string;
  /** 공개 여부 (배지) */
  isPublic?: boolean;
  /** 설명 */
  description?: string;
}

/** 교단일기 / 성장일기 — 시트 탭: "Journal" (연도별 그룹) */
export interface JournalEntry {
  /** 연도 (그룹 기준, 예: 2024) */
  year: string;
  /** 구체 날짜 (선택, 예: 2024-03-12) */
  date?: string;
  /** 제목 */
  title: string;
  /** 내용 (줄바꿈 유지) */
  body?: string;
  /** 태그 (시트에서는 ',' 로 구분) */
  tags?: string[];
}

/** 경력 / 활동 — 시트 탭: "Experience" */
export interface ExperienceItem {
  /** 소속 (학교/단체/기관) */
  organization: string;
  /** 역할/직책 */
  role: string;
  /** 시작 (예: 2022-03) */
  startDate: string;
  /** 종료 (비우면 "현재"로 처리) */
  endDate?: string;
  /** 지역/형태 */
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
  /** 학위/과정 (예: 학사, 석사) */
  degree?: string;
  /** 전공/분야 */
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

/** 프로젝트 / 운영 프로그램 — 시트 탭: "Projects" */
export interface ProjectItem {
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 대표 이미지 URL */
  imageUrl?: string;
  /** 외부 링크 */
  url?: string;
  /** 저장소/추가 링크 */
  repoUrl?: string;
  /** 태그 (시트에서는 ',' 로 구분) */
  tags?: string[];
  /** 날짜/연도 */
  date?: string;
  /** 상단 강조 노출 여부 */
  featured?: boolean;
}

/** 수상 / 자격증 — 시트 탭: "Awards" */
export interface AwardItem {
  /** 명칭 (예: 정보컴퓨터교사 자격) */
  title: string;
  /** 발급/주최 기관 */
  issuer?: string;
  /** 종류 (예: 자격증 / 수상) */
  kind?: string;
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
  training: TrainingItem[];
  trainingReceived: TrainingReceivedItem[];
  resources: ResourceItem[];
  journal: JournalEntry[];
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
  training: "Training",
  trainingReceived: "TrainingReceived",
  resources: "Resources",
  journal: "Journal",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  awards: "Awards",
} as const;
