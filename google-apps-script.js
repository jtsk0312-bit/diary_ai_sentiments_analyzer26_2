/**
 * Google Apps Script (GAS) - Google Sheets CRUD API
 * 
 * 시트 ID: 1U1kWWyP15epYq9-EGkb-GEIS7RjI2c7OGbGM7t1O9lY
 * 필드: timestamp, datetime, content
 * 
 * 배포 방법:
 * 1. 스프레드시트 메뉴 > 확장 프로그램 > Apps Script 클릭
 * 2. 기존 코드 전체를 지우고 아래 코드를 붙여넣기
 * 3. 오른쪽 상단 [배포] > [새 배포] 클릭
 * 4. 유형 선택: [웹 앱]
 * 5. 설정:
 *    - 설명: Diary CRUD API
 *    - 다음 사용자로 실행: 나(내 계정)
 *    - 액세스 권한이 있는 사용자: 모든 사용자 (Anyone)
 * 6. [배포] 클릭 후 부여된 "웹 앱 URL"을 Next.js 환경변수나 클라이언트에서 사용
 */

const SPREADSHEET_ID = "1U1kWWyP15epYq9-EGkb-GEIS7RjI2c7OGbGM7t1O9lY";
const SHEET_NAME = "Sheet1"; // 시트 탭 이름이 다를 경우 변경하세요 (예: "시트1")

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  
  // 헤더가 없을 경우 자동 초기화
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["timestamp", "datetime", "content"]);
  }
  return sheet;
}

/**
 * GET 요청 처리 (Read / List)
 * 파라미터 예시:
 * - 전체 조회: GET ?action=read
 * - 특정 timestamp 조회: GET ?action=read&timestamp=1716000000000
 */
function doGet(e) {
  try {
    const action = e.parameter.action || "read";
    const timestamp = e.parameter.timestamp;

    if (action === "read") {
      const result = readEntries(timestamp);
      return createJsonResponse({ success: true, data: result });
    }

    return createJsonResponse({ success: false, error: "알 수 없는 GET 액션입니다." });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * POST 요청 처리 (Create, Update, Delete)
 * 요청 Body (JSON):
 * - Create: { "action": "create", "content": "일기 내용", "datetime": "2025-05-18 15:40:00" } (timestamp는 생략 시 자동 생성)
 * - Update: { "action": "update", "timestamp": "...", "content": "수정할 내용", "datetime": "..." }
 * - Delete: { "action": "delete", "timestamp": "..." }
 */
function doPost(e) {
  try {
    let body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else {
      body = e.parameter;
    }

    const action = body.action || "create";

    switch (action) {
      case "create": {
        const item = createEntry(body);
        return createJsonResponse({ success: true, data: item });
      }
      case "update": {
        const updated = updateEntry(body);
        return createJsonResponse({ success: true, data: updated });
      }
      case "delete": {
        const deleted = deleteEntry(body.timestamp);
        return createJsonResponse({ success: true, data: deleted });
      }
      default:
        return createJsonResponse({ success: false, error: "유효하지 않은 POST 액션입니다: " + action });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

// ==================== CRUD 함수 정의 ====================

/**
 * [Create] 새 일기 기록 추가
 */
function createEntry(data) {
  const sheet = getSheet();
  const timestamp = data.timestamp ? String(data.timestamp) : String(new Date().getTime());
  const datetime = data.datetime || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
  const content = data.content || "";

  sheet.appendRow([timestamp, datetime, content]);

  return {
    timestamp: timestamp,
    datetime: datetime,
    content: content,
  };
}

/**
 * [Read] 일기 목록 조회 또는 특정 timestamp 조회
 */
function readEntries(targetTimestamp) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return []; // 헤더만 있거나 빈 시트

  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const entries = values.map((row) => ({
    timestamp: String(row[0]),
    datetime: String(row[1]),
    content: String(row[2]),
  }));

  if (targetTimestamp) {
    return entries.filter((item) => item.timestamp === String(targetTimestamp));
  }

  // 최신 순 정렬
  return entries.reverse();
}

/**
 * [Update] timestamp 일치하는 행의 datetime 및 content 수정
 */
function updateEntry(data) {
  if (!data.timestamp) {
    throw new Error("수정할 대상의 timestamp가 필요합니다.");
  }

  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error("데이터가 없습니다.");

  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const targetTimestamp = String(data.timestamp);

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === targetTimestamp) {
      const rowIdx = i + 2; // 1-indexed, 헤더 다음 행
      const updatedDatetime = data.datetime || values[i][1];
      const updatedContent = data.content !== undefined ? data.content : values[i][2];

      sheet.getRange(rowIdx, 2).setValue(updatedDatetime);
      sheet.getRange(rowIdx, 3).setValue(updatedContent);

      return {
        timestamp: targetTimestamp,
        datetime: updatedDatetime,
        content: updatedContent,
      };
    }
  }

  throw new Error("해당 timestamp에 일치하는 기록을 찾을 수 없습니다: " + targetTimestamp);
}

/**
 * [Delete] timestamp 일치하는 행 삭제
 */
function deleteEntry(targetTimestamp) {
  if (!targetTimestamp) {
    throw new Error("삭제할 대상의 timestamp가 필요합니다.");
  }

  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error("데이터가 없습니다.");

  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const strTarget = String(targetTimestamp);

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === strTarget) {
      const rowIdx = i + 2;
      sheet.deleteRow(rowIdx);
      return { timestamp: strTarget, deleted: true };
    }
  }

  throw new Error("삭제할 대상 기록을 찾을 수 없습니다: " + targetTimestamp);
}

// ==================== 응답 헬퍼 함수 ====================
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
