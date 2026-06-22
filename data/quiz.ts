export type ResultTypeId = "A" | "B" | "C" | "D" | "E";

export interface ResultType {
  id: ResultTypeId;
  emoji: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface QuizOption {
  text: string;
  type: ResultTypeId;
}

export interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

export const RESULT_TYPES: ResultType[] = [
  {
    id: "A",
    emoji: "🥾",
    title: "장화 신은 전사형",
    desc: "비가 와도 일정은 취소 안 함. 장화부터 챙기고 우비 컬러까지 맞춰 입는 당신은 장마철 '준비성 만렙' 타입. 남들은 비 핑계로 약속을 미루지만, 당신은 이미 방수 가방까지 풀세팅 완료. 실용성과 스타일을 동시에 잡는 능력자예요.",
    tags: ["#방수실용파", "#준비성만렙", "#장화부심"],
  },
  {
    id: "B",
    emoji: "☕",
    title: "카페 우디 무드형",
    desc: "비 오는 날엔 역시 카페 창가 자리. 빗소리 배경음에 무드등 조명, 거기에 어울리는 차분한 톤의 옷까지 — 당신에게 장마는 '감성 충전 시즌'이에요. 우중충한 날씨도 당신 손에선 분위기 있는 화면이 됩니다.",
    tags: ["#감성충만", "#무드러버", "#비오는날카페"],
  },
  {
    id: "C",
    emoji: "🛋️",
    title: "집순이 홈웨어 사령관형",
    desc: "장마철 최고의 전략은 '안 나가기'. 약속은 웬만하면 다음 주로, 오늘은 이불 밖은 위험합니다. 가장 편한 옷을 입고 집에서 모든 걸 해결하는 당신, 사실 이게 제일 현명한 선택일지도요.",
    tags: ["#본가가편함", "#홈웨어장인", "#불필요한외출거부"],
  },
  {
    id: "D",
    emoji: "💃",
    title: "장마 핵인싸형",
    desc: "비가 와도 약속은 약속! 오히려 장마철이라 더 신나게 약속을 잡는 타입. 우산도 화려한 컬러로, 옷도 포인트 컬러로 — 당신이 지나가면 흐린 날씨도 잠깐 환해지는 느낌이에요.",
    tags: ["#약속부자", "#비도못막는텐션", "#컬러포인트"],
  },
  {
    id: "E",
    emoji:
