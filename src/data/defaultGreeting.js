/* 담임목사 인사말 기본값 — 관리자 페이지에서 저장한 값이 있으면 그 값이 우선 */
export const DEFAULT_GREETING = `"당신은 이미 소중합니다"

세상은 우리에게 자꾸만 증명하라고 말합니다. 더 유능해야 하고, 더 가져야 하고, 더 완벽해야 한다고 말이죠. 하지만 우리 교회가 믿음으로 고백하는 예수님은 다르게 말씀하셨습니다. "너는 존재 자체로 이미 소중하단다"라고요.

사랑의교회는 세상의 평가에 상처받은 마음이 치유되고, 내가 얼마나 사랑받는 존재인지 다시 깨닫는 회복의 공간입니다. 잘나지 않아도, 무언가를 이루지 못했어도 당신은 그 자체로 빛나는 사람입니다.

그 변함없는 사랑을 이곳에서 함께 누렸으면 좋겠습니다. 당신의 깨어진 마음을 만지시고 다시 일으켜 세우실 하나님의 사랑, 그 따뜻한 품으로 당신을 초대합니다.`;

/* 예전 기본 문구(또는 빈 값)가 캐시·DB에 남아 있으면 새 인사말로 대체 */
const LEGACY_GREETINGS = ['사랑의 교회에 오신 것을 환영합니다.'];
export function withDefaultGreeting(greeting) {
  const text = (greeting?.text ?? '').trim();
  if (!text || LEGACY_GREETINGS.includes(text)) return { ...greeting, text: DEFAULT_GREETING };
  return greeting;
}
