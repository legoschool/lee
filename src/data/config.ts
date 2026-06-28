/**
 * 데이터 소스 설정
 * ---------------------------------------------------------------------------
 * 우선순위: .env 의 VITE_GOOGLE_SHEET_ID > 아래 DEFAULT_SHEET_ID
 *
 * 공개(링크 뷰어) 시트의 ID 는 비밀값이 아니므로 기본값으로 코드에 둬도 됩니다.
 * 다른 시트로 바꾸려면 .env 에 VITE_GOOGLE_SHEET_ID 만 넣으면 이 값을 덮어씁니다.
 */
export const DEFAULT_SHEET_ID = "1V9t8kdCnKE-4gJ1-OtKyTjHQRL5kzD1ZkyEXFz8NKyI";
