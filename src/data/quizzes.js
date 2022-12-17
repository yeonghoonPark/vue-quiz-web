const quizzes = [
  {
    count: "01",
    genre: "",
    question:
      "'당신'과 '브라운관'의 합성어로 google이 현재까지도 운영하는 동영상 공유 서비스 사이트의 이름은 무엇인가요?",
    example1: "afreecaTV(아프리카TV)",
    example2: "YouTube(유튜브)",
    example3: "Twitch(트위치)",
    correct: "YouTube(유튜브)",
  },
  {
    count: "02",
    genre: "",
    question:
      "인조반정으로 폐위된 조선의 제 15대 왕으로 임진왜란 이후 부국강병의 기틀을 다졌습니다, 이 조선의 왕은 누구인가요?",
    example1: "광해군",
    example2: "연산군",
    example3: "인조",
    correct: "광해군",
  },
  {
    count: "03",
    genre: "",
    question:
      "독일의 철학자 '니체'의 운명관을 나타내는 용어인 이것은 자신의 운명을 사랑하라는 의미로 가수 '김연자'가 부르는 노래제목이기도 한 이 용어는 무엇인가요?",
    example1: "디너파티",
    example2: "댄스파티",
    example3: "아모르파티",
    correct: "아모르파티",
  },
  {
    count: "04",
    genre: "",
    question:
      "미국 제32대 대통령 'F.D.루스벨트'의 지도아래 대공항 극복을 위하여 추진하였던 이 제반 정책은 무엇인가요?",
    example1: "뉴딜(New Deal)",
    example2: "뉴브랜다이스(New Brandeis)",
    example3: "티파티(Tea Party)",
    correct: "뉴딜(New Deal)",
  },
  {
    count: "05",
    genre: "",
    question:
      "기업이 임직원에게 일정수량의 자기 회사의 주식을 일정한 가격으로 매수할 수 있는 권리를 부여하는 제도는 무엇인가요?",
    example1: "마진 콜(Margin Call)",
    example2: "스톡 옵션(Stock Option)",
    example3: "블루 칩 스톡(Blue Chip Stocks)",
    correct: "스톡 옵션(Stock Option)",
  },
  {
    count: "06",
    genre: "",
    question:
      "밤에 잠을 충분히 잤어도 낮에 갑자기 졸음이 빠져드는 증세, 낮에 이유없이 졸리고 무기력감을 느끼는 증세는 무엇인가요?",
    example1: "기면증",
    example2: "불면증",
    example3: "식곤증",
    correct: "기면증",
  },
  {
    count: "07",
    genre: "",
    question:
      "인슐린의 분비량이 부족하거나 정상적인 기능이 이루어지지 않는 등의 대사질환의 일종으로 혈중 포도당 농도가 높은것이 특징인 이 질환은 무엇인가요?",
    example1: "정신병",
    example2: "도벽병",
    example3: "당뇨병",
    correct: "당뇨병",
  },
  {
    count: "08",
    genre: "",
    question:
      "목의 한가운데에서 앞으로 튀어나온 물렁뼈의 아래쪽 기도의 주위를 감싸고 있는 날개를 편 나비모양의 내분비선인 이 조직의 이름은 무엇인가요?",
    example1: "갑상선",
    example2: "설편도",
    example3: "구개편도",
    correct: "갑상선",
  },
  {
    count: "09",
    genre: "",
    question:
      "일정 기간 동안 사용한 전력의 양을 전력량이라고 한다, 다음 중 우리가 실생활에서 전기료를 측정하는 데 사용하는 전력량의 단위는 무엇인가요?",
    example1: "Wh(와트아워)",
    example2: "A(암페어)",
    example3: "AV(암페어볼트)",
    correct: "Wh(와트아워)",
  },
  {
    count: "10",
    genre: "",
    question:
      "조선시대 조정에서 일본에 보낸 사신을 '통신사'라고 명했었습니다, 그렇다면 조선이 중국 베이징에 보냈던 외교사절의 이름은 무엇일까요?",
    example1: "비변사",
    example2: "수신사",
    example3: "연행사",
    correct: "연행사",
  },
  {
    count: "11",
    genre: "",
    question: "세계 최초로 안락사를 합법화한 국가는 어디일까요?",
    example1: "미국",
    example2: "스위스",
    example3: "네덜란드",
    correct: "네덜란드",
  },
  {
    count: "12",
    genre: "",
    question:
      "처음에는 점원이나 비서직에 종사하는 여성들을 뜻하였으나, 가정의 생계를 위하여 사회로 진출하는 주부 전체를 의미하는 이 용어는 무엇인가요?",
    example1: "화이트칼라",
    example2: "핑크칼라",
    example3: "그레이칼라",
    correct: "핑크칼라",
  },
  {
    count: "13",
    genre: "",
    question:
      "근로기준법에서 모성 보호에 관련된 내용중 '여성'과 '18세 미만자'에게 시킬 수 없는 업무는 무엇인가요?",
    example1: "생산 관리, 감독 업무",
    example2: "갱 내 근로 업무",
    example3: "학술 연구 조사 업무",
    correct: "갱 내 근로 업무",
  },
  {
    count: "14",
    genre: "",
    question:
      "대기층에서 더운 공기로 인해 그 아래로 찬 공기가 누적되는 현상을 무엇이라고 하나요?",
    example1: "스모그 현상",
    example2: "역전층 현상",
    example3: "푄 현상",
    correct: "역전층 현상",
  },
  {
    count: "15",
    genre: "",
    question: "리콜제도에 대한 설명으로 틀린 것을 찾으세요",
    example1: "적극적 소비자 보호 제도",
    example2: "피해 재발 방지",
    example3: "손해 배상 책임 제도",
    correct: "손해 배상 책임 제도",
  },
  {
    count: "16",
    genre: "",
    question:
      "조국의 이익을 위해서는 수단과 방법을 가리지 않으며 국제 정의조차 부정하는 맹목적 애국주의를 뜻하는 말은 무엇인가요?",
    example1: "니헐리즘",
    example2: "쇼비니즘",
    example3: "페시미즘",
    correct: "쇼비니즘",
  },
  {
    count: "17",
    genre: "",
    question:
      "현대인들의 기호식품 가운데 신경조직이나 심장 근육을 자극하여 피로를 일으키는 것으로 '커피', '홍차', '각종 드링크제'에 들어있는 중독성 물질은 무엇일까요?",
    example1: "암페타민",
    example2: "니코틴",
    example3: "카페인",
    correct: "카페인",
  },
  {
    count: "18",
    genre: "",
    question:
      "우리나라는 여름에는 '남동풍'이 불고 겨울에는 '북서풍'이 주로 붑니다, 이렇게 1년을 주기로 반복되는 바람을 무엇이라고 부르나요?",
    example1: "계절풍",
    example2: "산곡풍",
    example3: "해륙풍",
    correct: "계절풍",
  },
  {
    count: "19",
    genre: "",
    question: "다음 중 식물이 아닌 것은 무엇일까요?",
    example1: "동충하초",
    example2: "두릅",
    example3: "미더덕",
    correct: "미더덕",
  },
  {
    count: "20",
    genre: "",
    question:
      "스프레이 방식으로 만들어진 페인트의 경우에 스프레이통 안에서 구슬이 들어 있어 흔들면 소리가 납니다, 스프레이 통 안에 구슬을 넣는 이유는 무엇일까요?",
    example1: "잘 섞이라고",
    example2: "폭발방지 작용",
    example3: "남은 양 측정",
    correct: "잘 섞이라고",
  },
];

export default quizzes;
