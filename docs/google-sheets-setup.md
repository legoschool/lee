# Google Sheets 데이터 설정 가이드

프로필 페이지의 모든 내용은 **하나의 구글 시트**에서 불러옵니다.
시트만 수정하면 페이지가 자동으로 갱신됩니다. (코드 수정 불필요)

---

## 1. 시트 만들기

1. [Google Sheets](https://sheets.new) 에서 새 스프레드시트를 만듭니다.
2. 아래 표대로 **탭(시트) 8개**를 만들고, 각 탭의 **1행을 헤더**로 입력합니다.
   - 탭 이름과 헤더 이름은 **대소문자까지 정확히** 일치해야 합니다.
   - `seed/` 폴더의 CSV 를 각 탭에 그대로 붙여넣으면 빠릅니다.

## 2. 공개 설정

오른쪽 위 **공유 → 일반 액세스 → "링크가 있는 모든 사용자" → 뷰어**로 변경합니다.
(편집 권한은 줄 필요 없습니다. 읽기 전용으로 충분합니다.)

## 3. 시트 ID 연결

시트 URL 에서 ID 를 복사합니다.

```
https://docs.google.com/spreadsheets/d/<이_부분이_ID>/edit
```

프로젝트 루트의 `.env.example` 을 `.env` 로 복사하고 값을 채웁니다.

```
VITE_GOOGLE_SHEET_ID=여기에_시트_ID
```

## 4. 연결 확인

```
npm run data:check
```

각 탭의 행 수가 출력되면 성공입니다.

---

## 탭 / 열 구성

### `Basics` — key/value 형태 (헤더: `key`, `value`)

| key | 설명 |
| --- | --- |
| `name` | 이름 (필수) |
| `headline` | 한 줄 소개 / 직함 |
| `tagline` | 짧은 문구 |
| `avatarUrl` | 프로필 사진 URL |
| `coverUrl` | 커버 이미지 URL |
| `location` | 지역 |
| `email` | 이메일 |
| `phone` | 전화번호 |
| `website` | 웹사이트 URL |
| `available` | 협업 가능 여부 (`TRUE`/`FALSE`) |

### `About` — key/value 형태 (헤더: `key`, `value`)

| key | 설명 |
| --- | --- |
| `heading` | 섹션 제목 (예: 소개) |
| `body` | 본문 (셀 안에서 줄바꿈 = Alt+Enter) |

### `Socials` (헤더: `label`, `url`, `icon`)

| 열 | 설명 |
| --- | --- |
| `label` | 표시 이름 (예: GitHub) |
| `url` | 링크 |
| `icon` | 아이콘 키 (github / instagram / youtube / mail / link) |

### `Skills` (헤더: `name`, `category`, `level`)

| 열 | 설명 |
| --- | --- |
| `name` | 스킬 이름 |
| `category` | 분류 (개발 / 디자인 / 교육 …) |
| `level` | 숙련도 0~100 (숫자) |

### `Experience` (헤더: `organization`, `role`, `startDate`, `endDate`, `location`, `description`, `highlights`)

| 열 | 설명 |
| --- | --- |
| `organization` | 소속 |
| `role` | 역할/직책 |
| `startDate` | 시작 (예: 2022-03) |
| `endDate` | 종료 (비우면 "현재") |
| `location` | 지역/형태 |
| `description` | 설명 |
| `highlights` | 주요 성과 (셀 안에서 줄바꿈 또는 `;` 로 구분) |

### `Education` (헤더: `school`, `degree`, `field`, `startDate`, `endDate`, `description`)

### `Projects` (헤더: `title`, `description`, `imageUrl`, `url`, `repoUrl`, `tags`, `date`, `featured`)

| 열 | 설명 |
| --- | --- |
| `tags` | `,` 로 구분 (예: React,교육) |
| `featured` | 상단 강조 (`TRUE`/`FALSE`) |

### `Awards` (헤더: `title`, `issuer`, `date`, `description`)

---

## 동작 방식

- `.env` 에 시트 ID 가 **있으면** → 시트에서 로드
- 시트 ID 가 **없거나** 로딩 실패 시 → `src/data/sampleProfile.ts` 샘플로 자동 대체
- 데이터 흐름: `Google Sheet` → `src/lib/googleSheets.ts` (fetch/parse) → `src/data/mappers.ts` (타입 변환) → `src/data/loadProfile.ts` (조립) → `useProfile()` 훅 → 화면
