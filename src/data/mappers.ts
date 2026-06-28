/**
 * 시트 행(SheetRow) -> 타입 모델 매퍼
 * ---------------------------------------------------------------------------
 * Google Sheet 의 각 탭에서 읽은 원시 행/맵을 types.ts 의 모델로 변환합니다.
 * 시트 열 이름이 바뀌면 이 파일만 수정하면 됩니다.
 */
import type { SheetRow } from "@/lib/googleSheets";
import { orUndefined, toBool, toList, toNumber } from "@/lib/parse";
import type {
  AboutSection,
  AwardItem,
  EducationItem,
  ExperienceItem,
  ProfileBasics,
  ProjectItem,
  Skill,
  SocialLink,
} from "./types";

export function mapBasics(kv: Record<string, string>): ProfileBasics {
  return {
    name: kv.name ?? "",
    headline: kv.headline ?? "",
    tagline: orUndefined(kv.tagline),
    avatarUrl: orUndefined(kv.avatarUrl),
    coverUrl: orUndefined(kv.coverUrl),
    location: orUndefined(kv.location),
    email: orUndefined(kv.email),
    phone: orUndefined(kv.phone),
    website: orUndefined(kv.website),
    available: kv.available !== undefined ? toBool(kv.available) : undefined,
  };
}

export function mapAbout(kv: Record<string, string>): AboutSection | undefined {
  const body = orUndefined(kv.body);
  if (!body) return undefined;
  return {
    heading: kv.heading?.trim() || "소개",
    body,
  };
}

export function mapSocials(rows: SheetRow[]): SocialLink[] {
  return rows
    .filter((r) => r.url)
    .map((r) => ({
      label: r.label ?? r.url,
      url: r.url,
      icon: orUndefined(r.icon),
    }));
}

export function mapSkills(rows: SheetRow[]): Skill[] {
  return rows
    .filter((r) => r.name)
    .map((r) => ({
      name: r.name,
      category: orUndefined(r.category),
      level: toNumber(r.level),
    }));
}

export function mapExperience(rows: SheetRow[]): ExperienceItem[] {
  return rows
    .filter((r) => r.organization || r.role)
    .map((r) => ({
      organization: r.organization ?? "",
      role: r.role ?? "",
      startDate: r.startDate ?? "",
      endDate: orUndefined(r.endDate),
      location: orUndefined(r.location),
      description: orUndefined(r.description),
      highlights: toList(r.highlights, /[;\n]/),
    }));
}

export function mapEducation(rows: SheetRow[]): EducationItem[] {
  return rows
    .filter((r) => r.school)
    .map((r) => ({
      school: r.school,
      degree: orUndefined(r.degree),
      field: orUndefined(r.field),
      startDate: orUndefined(r.startDate),
      endDate: orUndefined(r.endDate),
      description: orUndefined(r.description),
    }));
}

export function mapProjects(rows: SheetRow[]): ProjectItem[] {
  return rows
    .filter((r) => r.title)
    .map((r) => ({
      title: r.title,
      description: orUndefined(r.description),
      imageUrl: orUndefined(r.imageUrl),
      url: orUndefined(r.url),
      repoUrl: orUndefined(r.repoUrl),
      tags: toList(r.tags, /[,;]/),
      date: orUndefined(r.date),
      featured: toBool(r.featured),
    }));
}

export function mapAwards(rows: SheetRow[]): AwardItem[] {
  return rows
    .filter((r) => r.title)
    .map((r) => ({
      title: r.title,
      issuer: orUndefined(r.issuer),
      date: orUndefined(r.date),
      description: orUndefined(r.description),
    }));
}
