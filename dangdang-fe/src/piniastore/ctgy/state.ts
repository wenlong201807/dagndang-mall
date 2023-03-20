// 1
export interface FirstCtgy {
  firstCtgyId: number
  firstctgyname: string
}

// 2
export interface SecondCtgy {
  secondctgyid: number
  secctgyname: string
  thirdctgys: ThirdCtgy[]
  subThirdctgys: ThirdCtgy[]
  isReadyOpen: boolean
}

// 3
export interface ThirdCtgy {
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
}
export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[]
}
export const initCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: [],
}
