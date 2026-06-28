# 개인 프로필 페이지 · 🧱 LEGO 스타일

범용 개인 프로필 페이지입니다. 모든 내용을 **Google Sheets 에 저장하고, 페이지가 자동으로 불러오는** 구조로 만들어 코드 수정 없이 시트만 고치면 페이지가 갱신됩니다.

> 현재 단계: **데이터 구성 + 레고 스타일 UI 완료** — 8개 섹션을 레고 브릭/스터드/베이스플레이트 모티프로 구성. 데이터 소스 연결만 하면 바로 동작합니다.

## 디자인

레고 디자인 언어를 적용했습니다.
- 초록 **베이스플레이트** 배경(스터드 격자)
- 색색의 **브릭 카드** + 상단 **스터드(돌기)** + 입체 그림자
- 둥근 디스플레이 폰트(Fredoka / Baloo 2), 레고 팔레트(빨강/노랑/파랑/초록/주황/보라)
- 스킬 숙련도를 채워진 스터드 줄로 표현
- 레고 컴포넌트는 `src/components/lego/`, 섹션은 `src/components/sections/`

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

## 데이터 섹션 (교육자 프로필)

프로필 · 소개 · 전문분야 · **연수·강의(진행)** · **개발 자료(연도별)** · **교단일기·성장일기(연도별)** · 경력/활동 · 프로젝트/운영 · **이수 연수** · 학력 · 수상/자격증

> 시트 탭 12개: `Basics · About · Socials · Skills · Training · TrainingReceived · Resources · Journal · Experience · Education · Projects · Awards`
> 자세한 열 구성은 `docs/google-sheets-setup.md`, 붙여넣을 예시는 `seed/*.csv`.
