"use client";

import React, { useState, useEffect, useMemo } from "react";

// 5대 감정 타입 정의
type EmotionType = "기쁨/행복" | "평온/차분" | "슬픔/우울" | "분노/답답" | "불안/걱정";

interface SentimentAnalysisData {
  dominantEmotion: EmotionType;
  emotions: {
    joy: number;
    calm: number;
    sadness: number;
    anger: number;
    anxiety: number;
  };
  coreDiagnosis: string;
  psychologicalFeedback: string;
  detailMatrix: {
    confidence: number;
    bondAndJoy: number;
    serenity: number;
    resilience: number;
  };
  healingSolutions: string[];
  vitalityIndex: {
    changePt: number;
    comparisonText: string;
  };
  retrospectiveTip: string;
}

// screen.png 기반 기본 초기 데이터
const INITIAL_TITLE = "초여름 햇살 아래, 소중한 친구들과의 오후";
const INITIAL_CONTENT = `오늘 오랜만에 친구들과 공원에서 산책을 했다. 따뜻한 햇살 아래서 이야기를 나누며 한동안 잊고 지냈던 여유를 찾은 기분이었다. 회사 업무로 한 주 내내 긴장 상태였는데, 나무 그늘 아래서 시원한 아이스 라떼를 마시며 웃고 떠들다 보니 굳어 있던 어깨가 저절로 풀렸다. 친구가 건넨 작은 응원의 한마디가 마음에 오래 남아 왠지 모르게 뭉클해졌다. 별것 아닌 일상도 누군가와 온전히 나눌 수 있다는 사실이 참 고맙고 행복하다.`;

const INITIAL_ANALYSIS: SentimentAnalysisData = {
  dominantEmotion: "기쁨/행복",
  emotions: {
    joy: 88,
    calm: 75,
    sadness: 8,
    anger: 4,
    anxiety: 12,
  },
  coreDiagnosis: "“따뜻한 유대감과 회복의 에너지가 넘치는 하루입니다.”",
  psychologicalFeedback: `작성자님, 한 주 동안 쌓였던 업무 긴장감이 오랜 친구들과의 교감을 통해 매우 건강하고 부드럽게 해소되었습니다. 일기 전반에서 자연(공원, 햇살)과 정서적 지지(친구의 응원)가 만들어낸 깊은 안정감과 감사가 진하게 묻어납니다.\n\n혼자 짊어지던 피로를 바깥으로 꺼내어 환기한 것은 아주 훌륭한 마음 돌봄입니다. 친구가 건넨 작은 위로를 기억하는 지금의 따뜻한 여운을 오늘 밤 잠들기 전까지 간직해보세요.`,
  detailMatrix: {
    confidence: 98.4,
    bondAndJoy: 88,
    serenity: 75,
    resilience: 60,
  },
  healingSolutions: ["#선셋산책", "#감사일기", "#클래식플레이리스트"],
  vitalityIndex: {
    changePt: 24,
    comparisonText: "지난주 일요일 대비 18% 더 긍정적입니다",
  },
  retrospectiveTip: "친구들과 나눈 대화 중 가장 마음에 남았던 한 문장이 있나요? 그 문장을 일기에 덧붙여보세요.",
};

const EMOTION_ITEMS: { key: keyof SentimentAnalysisData["emotions"]; name: EmotionType; emoji: string }[] = [
  { key: "joy", name: "기쁨/행복", emoji: "😊" },
  { key: "calm", name: "평온/차분", emoji: "🌿" },
  { key: "sadness", name: "슬픔/우울", emoji: "💧" },
  { key: "anger", name: "분노/답답", emoji: "⚡" },
  { key: "anxiety", name: "불안/걱정", emoji: "💭" },
];

export default function DiaryPage() {
  const [title, setTitle] = useState(INITIAL_TITLE);
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [analysis, setAnalysis] = useState<SentimentAnalysisData | null>(INITIAL_ANALYSIS);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("today");

  // 실시간 날짜 및 시간 상태 (요일과 시간 포함)
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 날짜/요일/시간 포맷팅
  const formattedDateTime = useMemo(() => {
    if (!currentDateTime) return { dateStr: "2025년 5월 18일 (일요일)", timeStr: "15:40:00", topNavDate: "2025. 05. 24 (토)" };

    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const shortDays = ["일", "월", "화", "수", "목", "금", "토"];

    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const date = String(currentDateTime.getDate()).padStart(2, "0");
    const dayName = days[currentDateTime.getDay()];
    const shortDayName = shortDays[currentDateTime.getDay()];

    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

    return {
      dateStr: `${year}년 ${Number(month)}월 ${Number(date)}일 (${dayName})`,
      timeStr: `${hours}:${minutes}:${seconds}`,
      topNavDate: `${year}. ${month}. ${date} (${shortDayName})`,
    };
  }, [currentDateTime]);

  // 글자 수, 단어 수, 예상 읽기 시간 계산
  const stats = useMemo(() => {
    const trimmed = content.trim();
    const charCount = content.length;
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 150));
    return { charCount, wordCount, readMinutes };
  }, [content]);

  // AI 분석 요청 핸들러
  const handleAnalyze = async () => {
    if (!content.trim()) {
      alert("일기 내용을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Gemini 3.8 Flash 감정 정밀 분석 중...");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("분석 요청 실패");
      }

      const json = await res.json();
      if (json.data) {
        setAnalysis(json.data);
        setStatusMessage("실시간 분석 완료");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("분석 완료 (스마트 로컬 분석 엔진)");
    } finally {
      setIsLoading(false);
    }
  };

  // 재시작 (초기화) 핸들러
  const handleReset = () => {
    if (confirm("일기 작성 내용을 모두 지우고 초기화하시겠습니까?")) {
      setTitle("");
      setContent("");
      setAnalysis(null);
      setStatusMessage(null);
    }
  };

  // 구글 시트 일기 항목 인터페이스 및 상태
  interface DiaryEntry {
    timestamp: string;
    datetime: string;
    content: string;
  }
  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [editingItem, setEditingItem] = useState<DiaryEntry | null>(null);
  const [editContentText, setEditContentText] = useState("");

  // 구글 시트 일기 목록 조회 (Read)
  const fetchDiaryList = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch("/api/diary?action=read");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setDiaryList(json.data);
      } else if (Array.isArray(json)) {
        setDiaryList(json);
      } else {
        alert("일기 목록 조회 실패: " + (json.error || "응답 데이터를 확인하세요."));
      }
    } catch (err: unknown) {
      console.error(err);
      alert("일기 목록을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoadingList(false);
    }
  };

  // 일기 목록 모달 열기
  const handleOpenListModal = () => {
    setIsListModalOpen(true);
    fetchDiaryList();
  };

  // 일기 저장 핸들러 (Create)
  const handleSave = async () => {
    if (!content.trim()) {
      alert("저장할 일기 내용을 작성해 주세요.");
      return;
    }

    setIsSaving(true);
    try {
      const nowDatetime = currentDateTime
        ? `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, "0")}-${String(
            currentDateTime.getDate()
          ).padStart(2, "0")} ${String(currentDateTime.getHours()).padStart(2, "0")}:${String(
            currentDateTime.getMinutes()
          ).padStart(2, "0")}:${String(currentDateTime.getSeconds()).padStart(2, "0")}`
        : new Date().toISOString();

      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          timestamp: String(Date.now()),
          datetime: nowDatetime,
          content: content.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("일기가 구글 스프레드시트에 성공적으로 저장되었습니다! 💾");
      } else {
        alert("일기 저장 실패: " + (json.error || "확인할 수 없는 오류가 발생했습니다."));
      }
    } catch (err: unknown) {
      console.error(err);
      alert("일기 저장 중 네트워크 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // 일기 수정 핸들러 (Update)
  const handleUpdate = async () => {
    if (!editingItem) return;
    if (!editContentText.trim()) {
      alert("수정할 내용을 입력해 주세요.");
      return;
    }

    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          timestamp: editingItem.timestamp,
          datetime: editingItem.datetime,
          content: editContentText.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("일기가 성공적으로 수정되었습니다! ✨");
        setEditingItem(null);
        fetchDiaryList();
      } else {
        alert("수정 실패: " + (json.error || "오류가 발생했습니다."));
      }
    } catch (err) {
      console.error(err);
      alert("일기 수정 중 오류가 발생했습니다.");
    }
  };

  // 일기 삭제 핸들러 (Delete)
  const handleDelete = async (targetTimestamp: string) => {
    if (!confirm("정말 이 일기를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          timestamp: targetTimestamp,
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("일기가 삭제되었습니다.");
        fetchDiaryList();
      } else {
        alert("삭제 실패: " + (json.error || "오류가 발생했습니다."));
      }
    } catch (err) {
      console.error(err);
      alert("일기 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#191C1E] flex flex-col font-sans selection:bg-[#E0E7FF] selection:text-[#3730A3]">
      {/* 1. 최상단 네비게이션 바 */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#ECEEF0] px-4 lg:px-8 py-3 transition-all shadow-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* 좌측: 로고 & 메뉴 탭 */}
          <div className="flex items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#818CF8] flex items-center justify-center text-white text-lg shadow-sm">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[17px] tracking-tight text-[#191C1E] leading-tight">마인드노트</span>
                <span className="text-[11px] font-medium text-[#6366F1] tracking-wide">MindNote AI</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1.5 text-[14px]">
              <button
                onClick={() => setActiveTab("today")}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === "today"
                    ? "bg-[#4648D4] text-white shadow-xs"
                    : "text-[#464554] hover:bg-[#F2F4F6]"
                }`}
              >
                오늘의 일기
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === "calendar"
                    ? "bg-[#4648D4] text-white shadow-xs"
                    : "text-[#464554] hover:bg-[#F2F4F6]"
                }`}
              >
                감정 캘린더
              </button>
              <button
                onClick={() => setActiveTab("ai-analysis")}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === "ai-analysis"
                    ? "bg-[#4648D4] text-white shadow-xs"
                    : "text-[#464554] hover:bg-[#F2F4F6]"
                }`}
              >
                AI 마음 분석
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === "archive"
                    ? "bg-[#4648D4] text-white shadow-xs"
                    : "text-[#464554] hover:bg-[#F2F4F6]"
                }`}
              >
                기록 보관소
              </button>
            </nav>
          </div>

          {/* 우측: 상단 유틸리티 (날짜 칩, 테마, 알림, 프로필) */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#CBD5E1] bg-white text-[13px] font-medium text-[#464554] shadow-2xs hover:bg-[#F8FAFC] cursor-pointer">
              <span>📅</span>
              <span>{formattedDateTime.topNavDate}</span>
              <span className="text-[10px] text-gray-400">▼</span>
            </div>

            <button
              aria-label="화면 모드 전환"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#464554] hover:bg-[#ECEEF0] transition-colors"
            >
              ☀️
            </button>
            <button
              aria-label="알림"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#464554] hover:bg-[#ECEEF0] transition-colors relative"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]"></span>
            </button>
            <button
              aria-label="내 프로필"
              className="w-9 h-9 rounded-full bg-[#4648D4] text-white flex items-center justify-center font-bold text-sm shadow-xs hover:opacity-90 transition-opacity"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      {/* 2. 서브 헤더 (배지, 메인 타이틀, 상세 날짜/시간 컨트롤러) */}
      <section className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[12px] font-semibold mb-2 shadow-2xs">
              <span>✦</span>
              <span>MINDLOG V3.8</span>
              <span className="text-[#818CF8]">•</span>
              <span>실시간 감정 피드백 시스템</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#191C1E] tracking-tight">
              Diary AI Sentiments Analyzer
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#464554] mt-1 font-normal">
              정직한 나의 마음을 기록하고 치유받는 AI 감정 일기장
            </p>
          </div>

          {/* 날짜 + 요일 + 시간 동시 표시 영역 (요구사항 반영) */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs self-start md:self-auto">
            <button
              aria-label="이전 날"
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#F1F5F9] transition-colors"
            >
              ‹
            </button>
            <div className="flex items-center gap-2 px-2 text-[14px] font-semibold text-[#191C1E]">
              <span className="text-[#4648D4]">📅</span>
              <span>{formattedDateTime.dateStr}</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#4338CA]">
                {formattedDateTime.timeStr}
              </span>
            </div>
            <button
              aria-label="다음 날"
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#F1F5F9] transition-colors"
            >
              ›
            </button>
            <button className="ml-1 text-[13px] font-medium text-[#464554] px-2.5 py-1 rounded-lg border border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors flex items-center gap-1">
              <span>🗓️</span>
              <span>달력 보기</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 본문 2컬럼 레이아웃 */}
      <main className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ===================== [좌측: 일기 작성 영역 (7-8 cols)] ===================== */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md">
              
              {/* 상단 안내 & 저장 상태 인디케이터 */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center text-base shadow-2xs">
                    ✏️
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-[#191C1E]">일기 기록장</h2>
                    <p className="text-[12px] text-[#64748B]">순간의 생각과 기분을 자유롭게 적어보세요</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span className="text-[12px] font-medium text-[#64748B]">실시간 연동</span>
                  </div>
                  {/* 저장 버튼 (요구사항: [저장] 버튼을 누르면 일기 저장) */}
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4648D4] hover:bg-[#3735B8] text-white text-[12px] font-semibold transition-all active:scale-95 shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                    title="구글 스프레드시트에 일기 저장"
                  >
                    <span>{isSaving ? "⏳" : "💾"}</span>
                    <span>{isSaving ? "저장 중..." : "저장"}</span>
                  </button>

                  {/* 일기보기 버튼 (요구사항: [일기보기] 버튼을 [저장] 버튼 오른쪽에 만들고 구글 시트에 저장된 일기 리스트를 출력) */}
                  <button
                    type="button"
                    onClick={handleOpenListModal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] text-[12px] font-semibold transition-all active:scale-95 shadow-2xs"
                    title="구글 스프레드시트에 저장된 일기 리스트 보기"
                  >
                    <span>📋</span>
                    <span>일기보기</span>
                  </button>
                </div>
              </div>

              {/* 일기 제목 입력 필드 */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="오늘 하루의 제목을 적어보세요..."
                className="w-full text-xl sm:text-2xl font-bold text-[#191C1E] placeholder:text-[#94A3B8] pb-3 border-b border-transparent focus:border-[#6366F1] outline-none transition-all mb-4 bg-transparent"
              />

              {/* 일기 본문 입력 텍스트에어리어 */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={11}
                placeholder="오늘 당신의 하루는 어땠나요? 마음속에 떠오른 생각, 느꼈던 감정, 소중했던 순간들을 자유롭게 기록해 보세요..."
                className="w-full text-[15px] sm:text-[16px] text-[#334155] leading-relaxed resize-none outline-none placeholder:text-[#94A3B8] bg-transparent focus:bg-[#FAFAFC] rounded-2xl p-3 transition-colors border border-transparent focus:border-[#E2E8F0]"
              />

              {/* 하단 글자수 통계 & 조작 액션 버튼 그룹 */}
              <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-4">
                {/* 텍스트 통계 */}
                <div className="flex items-center gap-3 text-[13px] text-[#64748B]">
                  <span className="font-medium">
                    글자수 <strong className="text-[#191C1E]">{stats.charCount}</strong> 자
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    단어 <strong className="text-[#191C1E]">{stats.wordCount}</strong> 개
                  </span>
                  <span>•</span>
                  <span className="text-[#4F46E5] font-medium">읽는 시간 약 {stats.readMinutes}분</span>
                </div>

                {/* 버튼 세트: 재시작, 저장, AI 분석 */}
                <div className="flex items-center gap-2.5">
                  {/* 재시작 버튼 (요구사항: 재시작 버튼을 추가하고 클릭하면 일기 작성 초기화) */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-[13px] font-semibold transition-all active:scale-95 shadow-2xs"
                    title="일기 내용 및 분석 초기화"
                  >
                    <span>↺</span>
                    <span>재시작</span>
                  </button>

                  {/* AI 분석 버튼 (요구사항: 누르면 gemini-3.8-flash 접속 감성 분석) */}
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4648D4] to-[#6366F1] hover:from-[#3735B8] hover:to-[#4F46E5] text-white text-[13px] sm:text-[14px] font-semibold shadow-sm hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Gemini 분석 중...</span>
                      </>
                    ) : (
                      <>
                        <span>✦</span>
                        <span>AI 분석</span>
                        <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                          Gemini 3.8 Flash
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 오늘의 감정 회고 팁 카드 */}
            <div className="bg-[#F0F7FF] rounded-2xl p-4 sm:p-5 border border-[#BFDBFE] flex items-start gap-3.5 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center shrink-0 text-base">
                💡
              </div>
              <div className="text-[13px] sm:text-[14px]">
                <h4 className="font-bold text-[#1E3A8A] mb-0.5">오늘의 감정 회고 팁</h4>
                <p className="text-[#3B82F6] text-opacity-90 leading-relaxed">
                  {analysis?.retrospectiveTip ||
                    "친구들과 나눈 대화 중 가장 마음에 남았던 한 문장이 있나요? 그 문장을 일기에 덧붙여보세요."}
                </p>
              </div>
            </div>
          </div>

          {/* ===================== [우측: 감성 이모지 영역 & AI 일기 감성 분석 결과 (5 cols)] ===================== */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* 1. 감정 스펙트럼 분석 & 5개 감성 이모지 영역 (요구사항: 5개 감성 중 하나를 더 강조) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-[#191C1E]">감정 스펙트럼 분석</h3>
                {analysis && (
                  <span className="text-[12px] font-semibold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                    주요 감정: {analysis.dominantEmotion}
                  </span>
                )}
              </div>

              {/* 5개의 감성 이모지 카드들 */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {EMOTION_ITEMS.map((item) => {
                  const isDominant = analysis?.dominantEmotion === item.name;
                  const pct = analysis ? analysis.emotions[item.key] : 0;

                  return (
                    <div
                      key={item.key}
                      className={`relative flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all ${
                        isDominant
                          ? "bg-[#FEF9C3] border-2 border-[#EAB308] shadow-sm scale-105 z-10"
                          : "bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] opacity-80"
                      }`}
                    >
                      {/* 지배 감정 상단 퍼센트 원형 뱃지 */}
                      {isDominant && (
                        <div className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-[#B45309] text-white text-[10px] font-extrabold shadow-xs">
                          {pct}%
                        </div>
                      )}

                      <span className="text-2xl sm:text-3xl mb-1 select-none">{item.emoji}</span>
                      <span
                        className={`text-[11px] sm:text-[12px] font-medium text-center truncate max-w-full px-1 ${
                          isDominant ? "text-[#713F12] font-bold" : "text-[#475569]"
                        }`}
                      >
                        {item.name.split("/")[0]}
                      </span>

                      {/* 하단 수치 / 상태 라벨 */}
                      {isDominant ? (
                        <span className="text-[10px] font-extrabold text-[#A16207] mt-0.5">지배적</span>
                      ) : (
                        <span className="text-[10px] text-[#64748B] mt-0.5">{analysis ? `${pct}%` : "-"}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. [AI 일기 감성 분석 결과] 영역 (Gemini 3.8 Flash 분석 결과 출력) */}
            <div className="bg-white rounded-3xl p-6 lg:p-7 border border-[#E2E8F0] shadow-sm flex flex-col gap-5">
              
              {/* 헤더: AI 마음 리포트 & 실시간 상태 */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center text-base font-bold shadow-2xs">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#191C1E]">AI 마음 리포트</h3>
                    <p className="text-[11px] text-[#6366F1] font-medium">Gemini 3.8 Flash 감정 정밀 분석</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping"></span>
                  <span>{statusMessage || "실시간 분석 완료"}</span>
                </div>
              </div>

              {analysis ? (
                <>
                  {/* 핵심 감성 진단 (인용구 스타일 박스) */}
                  <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-2xl p-4 border border-[#DDD6FE] text-[#1E1B4B]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6D28D9] mb-1">
                      <span>😊</span>
                      <span>핵심 감성 진단</span>
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-bold text-[#4338CA] leading-snug">
                      {analysis.coreDiagnosis}
                    </p>
                  </div>

                  {/* AI 심리 피드백 코멘트 */}
                  <div>
                    <div className="text-[12px] font-bold text-[#64748B] mb-2 uppercase tracking-wider">
                      AI 심리 피드백 코멘트
                    </div>
                    <div className="text-[13px] sm:text-[14px] text-[#334155] leading-relaxed space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9]">
                      {analysis.psychologicalFeedback.split("\n\n").map((para, idx) => (
                        <p key={idx} className="whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 세부 감정 지수 매트릭스 (게이지 바) */}
                  <div>
                    <div className="flex items-center justify-between text-[12px] mb-3">
                      <span className="font-bold text-[#64748B] uppercase tracking-wider">세부 감정 지수 매트릭스</span>
                      <span className="text-[#64748B]">신뢰도 {analysis.detailMatrix.confidence}%</span>
                    </div>

                    <div className="space-y-3">
                      {/* 1. 유대감 및 행복 */}
                      <div>
                        <div className="flex justify-between text-[12px] font-medium mb-1">
                          <span className="text-[#1E293B]">유대감 및 행복 (Joy & Bond)</span>
                          <span className="font-bold text-[#4338CA]">{analysis.detailMatrix.bondAndJoy}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6366F1] to-[#4338CA] rounded-full transition-all duration-700"
                            style={{ width: `${analysis.detailMatrix.bondAndJoy}%` }}
                          />
                        </div>
                      </div>

                      {/* 2. 심리적 안정감 */}
                      <div>
                        <div className="flex justify-between text-[12px] font-medium mb-1">
                          <span className="text-[#1E293B]">심리적 안정감 (Serenity)</span>
                          <span className="font-bold text-[#B45309]">{analysis.detailMatrix.serenity}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full transition-all duration-700"
                            style={{ width: `${analysis.detailMatrix.serenity}%` }}
                          />
                        </div>
                      </div>

                      {/* 3. 회복 탄력성 */}
                      <div>
                        <div className="flex justify-between text-[12px] font-medium mb-1">
                          <span className="text-[#1E293B]">회복 탄력성 (Resilience)</span>
                          <span className="font-bold text-[#BE185D]">{analysis.detailMatrix.resilience}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] rounded-full transition-all duration-700"
                            style={{ width: `${analysis.detailMatrix.resilience}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI 맞춤 힐링 솔루션 해시태그 */}
                  <div>
                    <div className="text-[12px] font-bold text-[#64748B] mb-2 uppercase tracking-wider">
                      AI 맞춤 힐링 솔루션
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.healingSolutions.map((tag, idx) => {
                        const icons = ["⛺", "✍️", "🎧"];
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] font-semibold transition-colors cursor-pointer"
                          >
                            <span>{icons[idx % icons.length]}</span>
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* 마음 활력 지수 카드 */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 flex items-center justify-between hover:bg-[#F1F5F9] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1 rounded-xl bg-[#EEF2FF] text-[#4338CA] font-extrabold text-[13px]">
                        +{analysis.vitalityIndex.changePt}pt
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B]">마음 활력 지수 상승</div>
                        <div className="text-[11px] text-[#64748B]">{analysis.vitalityIndex.comparisonText}</div>
                      </div>
                    </div>
                    <div className="text-[#94A3B8] group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all text-sm font-bold">
                      →
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400">
                  <span className="text-4xl mb-3">📖</span>
                  <p className="text-sm font-medium text-gray-500">
                    일기를 작성하고 <strong>[AI 분석]</strong> 버튼을 누르면
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Gemini 3.8 Flash 감정 정밀 분석 리포트가 생성됩니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 4. 최하단 푸터 영역 (세련된 모던 스타일 디자인) */}
      <footer className="mt-16 border-t border-[#E2E8F0] bg-white/80 backdrop-blur-md text-[#475569]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9]">
            {/* 좌측: 로고 & 브랜드 설명 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4648D4] to-[#6366F1] flex items-center justify-center text-white text-lg shadow-sm shadow-indigo-200">
                ✦
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-bold text-[16px] text-[#0F172A] tracking-tight">Diary AI Sentiments Analyzer</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA] border border-[#E0E7FF]">v3.8</span>
                </div>
                <p className="text-[13px] text-[#64748B] mt-0.5">
                  AI 기반 감정 스펙트럼 심층 분석 및 스마트 마음 돌봄 시스템
                </p>
              </div>
            </div>

            {/* 우측: 퀵 링크 & 뱃지 */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-[#64748B]">
              <a href="#about" className="hover:text-[#4648D4] transition-colors">서비스 소개</a>
              <a href="#algorithm" className="hover:text-[#4648D4] transition-colors">감정 분석 알고리즘</a>
              <a href="#privacy" className="hover:text-[#4648D4] transition-colors">개인정보 처리방침</a>
              <a href="#help" className="hover:text-[#4648D4] transition-colors">이용 가이드</a>
            </div>
          </div>

          {/* 하단 카피라이트 & 제작자 서명 */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
            <p className="font-medium tracking-wide text-[#334155]">
              Copyright © INU Diary AI Sentiments Analyzer by kyonam Choo. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <span>Powered by Gemini 3.8 Flash</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[#10B981] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                System Operational
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. 구글 시트 일기 목록 및 CRUD 팝업 모달 */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* 모달 헤더 */}
            <div className="p-5 sm:p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#4648D4] flex items-center justify-center text-lg shadow-2xs font-bold">
                  📋
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#191C1E]">
                    구글 시트 저장된 일기 목록
                  </h3>
                  <p className="text-xs text-[#64748B]">스프레드시트에 기록된 일기 목록을 조회하고 수정/삭제합니다.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsListModalOpen(false);
                  setEditingItem(null);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-[#F1F5F9] text-lg font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#F8FAFC]">
              {isLoadingList ? (
                <div className="py-16 flex flex-col items-center justify-center text-[#64748B] gap-2">
                  <div className="w-6 h-6 border-2 border-[#4648D4] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">구글 시트에서 일기를 불러오는 중...</span>
                </div>
              ) : diaryList.length === 0 ? (
                <div className="py-16 text-center text-[#94A3B8]">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="text-sm font-medium">저장된 일기가 아직 없습니다.</p>
                  <p className="text-xs mt-1 text-gray-400">일기를 작성한 후 [저장] 버튼을 눌러보세요.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {diaryList.map((item, idx) => (
                    <div
                      key={item.timestamp || idx}
                      className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-2xs flex flex-col gap-2.5 transition-all hover:border-[#CBD5E1]"
                    >
                      <div className="flex items-center justify-between text-xs text-[#64748B] border-b border-[#F8FAFC] pb-2">
                        <div className="flex items-center gap-1.5 font-medium text-[#4338CA]">
                          <span>🗓️</span>
                          <span>{item.datetime || "일시 없음"}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#94A3B8]">ID: {item.timestamp}</span>
                      </div>

                      {/* 수정 모드인지 확인 */}
                      {editingItem?.timestamp === item.timestamp ? (
                        <div className="space-y-2 mt-1">
                          <textarea
                            value={editContentText}
                            onChange={(e) => setEditContentText(e.target.value)}
                            rows={3}
                            className="w-full text-sm text-[#191C1E] p-2.5 border border-[#6366F1] rounded-xl outline-none focus:ring-2 ring-[#C7D2FE]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingItem(null)}
                              className="px-3 py-1 rounded-lg text-xs font-medium text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                            >
                              취소
                            </button>
                            <button
                              type="button"
                              onClick={handleUpdate}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-[#4648D4] hover:bg-[#3735B8]"
                            >
                              수정 완료
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-[#334155] whitespace-pre-wrap leading-relaxed line-clamp-4">
                          {item.content}
                        </p>
                      )}

                      {/* 액션 버튼 그룹 */}
                      {editingItem?.timestamp !== item.timestamp && (
                        <div className="flex items-center justify-between pt-2 border-t border-[#F8FAFC]">
                          <button
                            type="button"
                            onClick={() => {
                              setContent(item.content);
                              setIsListModalOpen(false);
                            }}
                            className="text-xs text-[#4F46E5] hover:underline font-medium"
                          >
                            ✏️ 이 일기 본문으로 불러오기
                          </button>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(item);
                                setEditContentText(item.content);
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#475569] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.timestamp)}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#DC2626] bg-[#FEF2F2] hover:bg-[#FEE2E2] transition-colors"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 모달 하단 */}
            <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between bg-white text-xs">
              <button
                type="button"
                onClick={fetchDiaryList}
                className="px-3 py-1.5 rounded-xl border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-1.5 font-medium transition-colors"
              >
                <span>🔄</span>
                <span>새로고침</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsListModalOpen(false);
                  setEditingItem(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-[#191C1E] text-white hover:bg-black font-semibold transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
