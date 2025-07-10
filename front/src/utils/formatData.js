// snake_case to camelCase
export const snakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

// camelCase to snake_case
export const camelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      acc[snakeKey] = camelToSnake(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

//주소 필터링
export const extractRegionFromEnd = (text) => {
  const units = ['시', '군', '구'];
  const words = text.trim().split(/\s+/); // 공백 기준으로 나누기

  for (let i = words.length - 1; i >= 0; i--) {
    const lastChar = words[i].slice(-1);
    if (units.includes(lastChar)) {
      // 해당 단어까지 포함하여 앞부분만 추출
      return words.slice(0, i + 1).join(' ');
    }
  }

  // 해당 단어가 없을 경우 전체 반환
  return text;
}
