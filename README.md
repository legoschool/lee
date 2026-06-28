# 개인 프로필 페이지

범용 개인 프로필 페이지입니다. 모든 내용을 **Google Sheets 에 저장하고, 페이지가 자동으로 불러오는** 구조로 만들어 코드 수정 없이 시트만 고치면 페이지가 갱신됩니다.

> 현재 단계: **데이터 구성(Data setup)** — 데이터 모델/로딩 파이프라인과 데이터 확인용 미리보기 화면까지 완료. 본격적인 UI/디자인은 다음 단계.

## 기술 스택

- React + Vite + TypeScript (Lovable 앱과 동일 계열)
- Tailwind CSS
- 데이터 소스: 공개 Google Sheet (gviz 엔드포인트, 인증 불필요)

## 빠른 시작

```bash
npm install
npm run dev        # 시트 미연결 시 샘플 데이터로 미리보기
```

시트를 연결하려면 `docs/google-sheets-setup.md` 를 따라 하세요.

```bash
cp .env.example .env   # VITE_GOOGLE_SHEET_ID 입력
npm run data:check     # 시트 연결/탭 점검
npm run dev
```

## 데이터 흐름

```
Google Sheet (8개 탭)
   └─ src/lib/googleSheets.ts   gviz 로 fetch + 파싱
        └─ src/data/mappers.ts  행 → 타입 모델 변환
             └─ src/data/loadProfile.ts  조립 + 샘플 fallback
                  └─ src/hooks/useProfile.ts  React 훅
                       └─ src/App.tsx  화면 렌더
```

## 폴더 구조

| 경로 | 설명 |
| --- | --- |
| `src/data/types.ts` | 프로필 데이터 모델(스키마) — 단일 출처 |
| `src/data/sampleProfile.ts` | 시트 미연결 시 사용하는 샘플 데이터 |
| `src/data/mappers.ts` | 시트 행 → 타입 변환기 |
| `src/data/loadProfile.ts` | 로딩 + fallback 로직 |
| `src/lib/googleSheets.ts` | 구글 시트 fetch/파싱 |
| `src/lib/parse.ts` | 셀 값 변환 헬퍼 |
| `src/hooks/useProfile.ts` | 데이터 로딩 React 훅 |
| `seed/*.csv` | 시트 탭에 붙여넣을 예시 데이터 |
| `docs/google-sheets-setup.md` | 시트 설정 가이드 |
| `scripts/checkSheet.ts` | 시트 연결 점검 CLI |

## 데이터 섹션 (범용 개인 프로필)

기본 정보 · 소개 · 소셜 링크 · 스킬 · 경력/활동 · 학력 · 프로젝트/작품 · 수상/자격증
