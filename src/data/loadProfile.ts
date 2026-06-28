/**
 * 프로필 데이터 로더
 * ---------------------------------------------------------------------------
 * 1) .env 의 VITE_GOOGLE_SHEET_ID(또는 config.ts 의 기본 시트)에서 불러옵니다.
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
  mapJournal,
  mapProjects,
  mapResources,
  mapSkills,
  mapSocials,
  mapTraining,
  mapTrainingReceived,
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

/** 탭 하나를 읽되, 그 탭이 없거나 실패해도 전체를 막지 않도록 빈 배열 반환 */
async function safeTab(sheetId: string, tab: string) {
  try {
    return await fetchSheetTab(sheetId, tab);
  } catch {
    return [];
  }
}

async function safeKeyValue(sheetId: string, tab: string) {
  try {
    return await fetchSheetKeyValue(sheetId, tab);
  } catch {
    return {};
  }
}

/** 구글 시트의 모든 탭을 병렬로 읽어 ProfileData 로 조립 */
async function loadFromSheet(sheetId: string): Promise<ProfileData> {
  const [
    basicsKv,
    aboutKv,
    socials,
    skills,
    training,
    trainingReceived,
    resources,
    journal,
    experience,
    education,
    projects,
    awards,
  ] = await Promise.all([
    fetchSheetKeyValue(sheetId, SHEET_TABS.basics), // 필수 탭은 실패 시 throw → 샘플 폴백
    safeKeyValue(sheetId, SHEET_TABS.about),
    safeTab(sheetId, SHEET_TABS.socials),
    safeTab(sheetId, SHEET_TABS.skills),
    safeTab(sheetId, SHEET_TABS.training),
    safeTab(sheetId, SHEET_TABS.trainingReceived),
    safeTab(sheetId, SHEET_TABS.resources),
    safeTab(sheetId, SHEET_TABS.journal),
    safeTab(sheetId, SHEET_TABS.experience),
    safeTab(sheetId, SHEET_TABS.education),
    safeTab(sheetId, SHEET_TABS.projects),
    safeTab(sheetId, SHEET_TABS.awards),
  ]);

  return {
    basics: mapBasics(basicsKv),
    about: mapAbout(aboutKv),
    socials: mapSocials(socials),
    skills: mapSkills(skills),
    training: mapTraining(training),
    trainingReceived: mapTrainingReceived(trainingReceived),
    resources: mapResources(resources),
    journal: mapJournal(journal),
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
