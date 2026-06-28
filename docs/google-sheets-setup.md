# Google Sheets 데이터 설정 가이드 (교육자 프로필)

프로필 페이지의 모든 내용은 **하나의 구글 시트**에서 불러옵니다.
시트만 수정하면 페이지가 자동으로 갱신됩니다. (코드 수정 불필요)

> 💡 이 빌드 환경(CI)에서는 구글 접속이 막혀 있어 개발자가 시트를 미리 못 읽지만,
> **실제 페이지는 브라우저에서 시트를 직접 읽으므로** 로컬 실행/배포 시 정상 동작합니다.

---

## 1. 시트 만들기

1. [Google Sheets](https://sheets.new) 에서 새 스프레드시트를 만듭니다.
2. 아래 표대로 **탭(시트) 12개**를 만들고, 각 탭의 **1행을 헤더**로 입력합니다.
   - 탭 이름과 헤더 이름은 **대소문자까지 정확히** 일치해야 합니다.
   - `seed/` 폴더의 CSV 를 각 탭에 그대로 붙여넣으면 빠릅니다.
   - 필요 없는 탭은 비워두거나 만들지 않아도 됩니다(해당 섹션은 자동으로 숨김).

## 2. 공개 설정

오른쪽 위 **공유 → 일반 액세스 → "링크가 있는 모든 사용자" → 뷰어**로 변경합니다.

## 3. 시트 ID 연결

기본 시트 ID 는 `src/data/config.ts` 에 들어 있습니다. 다른 시트를 쓰려면
`.env.example` 을 `.env` 로 복사하고 값을 채웁니다(이 값이 우선합니다).

```
VITE_GOOGLE_SHEET_ID=여기에_시트_ID
```

## 4. 연결 확인 (로컬에서)

```
npm run data:check
```

---

## 탭 / 열 구성

### `Basics` — key/value (헤더: `key`, `value`)

| key | 설명 |
| --- | --- |
| `name` | 이름 (필수) |
| `headline` | 직함 (예: 레고에듀케이션 공인강사) |
| `affiliation` | 소속(학교/기관) |
| `tagline` | 짧은 문구 |
| `avatarUrl` | 프로필 사진 URL |
| `coverUrl` | 커버 이미지 URL |
| `location` | 지역 |
| `email` / `phone` / `website` | 연락처·링크 |
| `available` | 강의/협업 가능 여부 (`TRUE`/`FALSE`) |

### `About` — key/value (헤더: `key`, `value`)

| key | 설명 |
| --- | --- |
| `heading` | 섹션 제목 (예: 소개) |
| `body` | 본문 (셀 안 줄바꿈 = Alt+Enter) |

### `Socials` (헤더: `label`, `url`, `icon`)

`icon` 키: `github` / `instagram` / `youtube` / `mail` / `link` / `blog`

### `Skills` — 전문분야 (헤더: `name`, `category`, `level`)

`level` 은 0~100 숫자(스터드 막대로 표시).

### `Training` — 진행한 연수·강의 (헤더: `title`, `host`, `audience`, `role`, `hours`, `participants`, `date`, `location`, `description`)

| 열 | 설명 |
| --- | --- |
| `title` | 연수/강의명 |
| `host` | 주최 기관 |
| `audience` | 대상 (예: 초등교사) |
| `role` | 역할 (주강사/보조강사) |
| `hours` | 차시·시간 (예: 15차시) |
| `participants` | 인원 |
| `date` | 일자/연도 |
| `location` | 장소/형태 (온라인 등) |

### `TrainingReceived` — 이수한 연수 (헤더: `title`, `host`, `hours`, `date`, `description`)

### `Resources` — 개발 자료 (헤더: `title`, `type`, `audience`, `topic`, `url`, `year`, `isPublic`, `description`)

| 열 | 설명 |
| --- | --- |
| `type` | 종류 (교재/교안/영상/키트) |
| `year` | 연도 — **이 값으로 연도별 그룹** |
| `isPublic` | 공개 자료 여부 (`TRUE`/`FALSE`) |

### `Journal` — 교단일기·성장일기 (헤더: `year`, `date`, `title`, `body`, `tags`)

| 열 | 설명 |
| --- | --- |
| `year` | 연도 — **이 값으로 연도별 그룹** (비우면 date 앞 4자리 사용) |
| `date` | 구체 날짜 (선택) |
| `title` | 제목 |
| `body` | 내용 (셀 안 줄바꿈 가능) |
| `tags` | 태그 (`,` 로 구분) |

### `Experience` (헤더: `organization`, `role`, `startDate`, `endDate`, `location`, `description`, `highlights`)

`highlights` 는 셀 안 줄바꿈 또는 `;` 로 구분. `endDate` 를 비우면 "현재".

### `Education` (헤더: `school`, `degree`, `field`, `startDate`, `endDate`, `description`)

### `Projects` (헤더: `title`, `description`, `imageUrl`, `url`, `repoUrl`, `tags`, `date`, `featured`)

`tags` 는 `,` 로 구분. `featured` 가 `TRUE` 면 상단 강조.

### `Awards` (헤더: `title`, `issuer`, `kind`, `date`, `description`)

`kind` 예: 자격증 / 수상.

---

## 동작 방식

- 데이터 흐름: `Google Sheet` → `src/lib/googleSheets.ts` (fetch/parse) → `src/data/mappers.ts` (타입 변환) → `src/data/loadProfile.ts` (조립) → `useProfile()` 훅 → 화면
- 특정 탭이 없거나 비어 있어도 그 섹션만 숨고 나머지는 정상 표시됩니다.
- `Basics` 의 `name` 조차 못 읽으면 전체가 `src/data/sampleProfile.ts` 샘플로 대체됩니다.
