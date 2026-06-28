/**
 * 프로필 데이터 로더
 * ---------------------------------------------------------------------------
 * 1) .env 에 VITE_GOOGLE_SHEET_ID 가 설정돼 있으면 구글 시트에서 불러옵니다.
 * 2) 시트가 없거나 로딩에 실패하면 sampleProfile 로 자동 대체합니다.
 *
 * 페이지/컴포넌트는 이 함수(또는 useProfile 훅)만 사용하면 되고,
 * 데이터가 어디서 오는지는 신경 쓸 필요가 없습니다.
 */
import {
  fetchSheetKeyValue,
  fetchSheetTab,
  getSheetId,
  hasSheetConfigured,
} from "@/lib/googleSheets";
import {
  mapAbout,
  mapAwards,
  mapBasics,
  mapEducation,
  mapExperience,
  mapProjects,
  mapSkills,
  mapSocials,
} from "./mappers";
import { sampleProfile } from "./sampleProfile";
import { SHEET_TABS, type ProfileData } from "./types";

export interface LoadResult {
  data: ProfileData;
  /** 데이터 출처: 실제 시트인지 샘플인지 */
  source: "sheet" | "sample";
  /** 시트 로딩 중 발생한 오류 메시지 (있으면) */
  error?: string;
}

/** 구글 시트의 모든 탭을 병렬로 읽어 ProfileData 로 조립 */
async function loadFromSheet(sheetId: string): Promise<ProfileData> {
  const [basicsKv, aboutKv, socials, skills, experience, education, projects, awards] =
    await Promise.all([
      fetchSheetKeyValue(sheetId, SHEET_TABS.basics),
      fetchSheetKeyValue(sheetId, SHEET_TABS.about),
      fetchSheetTab(sheetId, SHEET_TABS.socials),
      fetchSheetTab(sheetId, SHEET_TABS.skills),
      fetchSheetTab(sheetId, SHEET_TABS.experience),
      fetchSheetTab(sheetId, SHEET_TABS.education),
      fetchSheetTab(sheetId, SHEET_TABS.projects),
      fetchSheetTab(sheetId, SHEET_TABS.awards),
    ]);

  return {
    basics: mapBasics(basicsKv),
    about: mapAbout(aboutKv),
    socials: mapSocials(socials),
    skills: mapSkills(skills),
    experience: mapExperience(experience),
    education: mapEducation(education),
    projects: mapProjects(projects),
    awards: mapAwards(awards),
  };
}

export async function loadProfile(): Promise<LoadResult> {
  if (!hasSheetConfigured()) {
    return { data: sampleProfile, source: "sample" };
  }

  try {
    const data = await loadFromSheet(getSheetId());
    // 시트는 연결됐지만 이름조차 비어 있으면 설정 오류로 보고 샘플 사용
    if (!data.basics.name) {
      return {
        data: sampleProfile,
        source: "sample",
        error: "시트의 Basics 탭에서 name 값을 찾지 못했습니다.",
      };
    }
    return { data, source: "sheet" };
  } catch (err) {
    return {
      data: sampleProfile,
      source: "sample",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
