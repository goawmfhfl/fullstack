import bcrypt from "bcryptjs";

// salt + hash 방식으로 비밀번호 암호화

export const saltAndHashPassword = async (password: string) => {
  // 몇 번 해시를 돌릴지 결정
  const saltRounds = 10;

  // 솔트 생성
  const salt = bcrypt.genSaltSync(saltRounds);

  // 비밀번호 암호화
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

// DB에 있는 비밀번호 vs 입력받은 비밀번호를 비교하는 함수다.
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(password, hashedPassword);
};
