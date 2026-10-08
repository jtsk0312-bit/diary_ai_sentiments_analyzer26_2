import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { success: false, error: ".env.local에 NEXT_PUBLIC_GOOGLE_SCRIPT_URL이 설정되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "read";
    const timestamp = searchParams.get("timestamp");

    let targetUrl = `${scriptUrl}?action=${encodeURIComponent(action)}`;
    if (timestamp) {
      targetUrl += `&timestamp=${encodeURIComponent(timestamp)}`;
    }

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // GAS 리다이렉트 자동 추적
      redirect: "follow",
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: `Google Sheets API 호출 중 오류: ${message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { success: false, error: ".env.local에 NEXT_PUBLIC_GOOGLE_SCRIPT_URL이 설정되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // GAS 웹앱에 가장 안정적인 Content-Type
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const text = await response.text();
    console.log("[GAS POST Response Raw]:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, error: "구글 스크립트가 JSON이 아닌 응답을 반환했습니다: " + text.slice(0, 100) };
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: `Google Sheets API 호출 중 오류: ${message}` },
      { status: 500 }
    );
  }
}
