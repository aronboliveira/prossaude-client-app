import { ENTabsProps } from "@/lib/global/declarations/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  edIsAutoCorrectOn: true,
  isAutoFillActive: true,
  areColGroupsSimilar: false,
  areNumConsOpsValid: false,
  numColsCons: 1,
  numCons: 1,
  numConsLastOp: 1,
  numCol: 1,
  IMC: 0,
  MLG: 0,
  TMB: 0,
  GET: 0,
  PGC: 0,
  factorAtvLvl: 1.4,
  factorAtleta: "Peso",
  edGenValue: "masculino",
  targInpWeigth: null,
  targInpHeigth: null,
  targInpIMC: null,
  targInpMLG: null,
  targInpTMB: null,
  targInpGET: null,
  targInpPGC: null,
  targInpSumDCut: null,
} as ENTabsProps;
export const tabPropsSlice = createSlice({
  name: "tabProps",
  initialState,
  reducers: {
    setEdIsAutoCorrectOn: (state, action: PayloadAction<boolean>) => {
      state.edIsAutoCorrectOn = action.payload;
    },
    setIsAutoFillActive: (state, action: PayloadAction<boolean>) => {
      state.isAutoFillActive = action.payload;
    },
    setAreColGroupsSimilar: (state, action: PayloadAction<boolean>) => {
      state.areColGroupsSimilar = action.payload;
    },
    setAreNumConsOpsValid: (state, action: PayloadAction<boolean>) => {
      state.areNumConsOpsValid = action.payload;
    },
    setNumColsCons: (state, action: PayloadAction<number>) => {
      state.numColsCons = action.payload;
    },
    setNumCons: (state, action: PayloadAction<number>) => {
      state.numCons = action.payload;
    },
    setNumConsLastOp: (state, action: PayloadAction<number>) => {
      state.numConsLastOp = action.payload;
    },
    setNumCol: (state, action: PayloadAction<number>) => {
      state.numCol = action.payload;
    },
    setIMC: (state, action: PayloadAction<number>) => {
      state.IMC = action.payload;
    },
    setMLG: (state, action: PayloadAction<number>) => {
      state.MLG = action.payload;
    },
    setTMB: (state, action: PayloadAction<number>) => {
      state.TMB = action.payload;
    },
    setGET: (state, action: PayloadAction<number>) => {
      state.GET = action.payload;
    },
    setPGC: (state, action: PayloadAction<number>) => {
      state.PGC = action.payload;
    },
    setFactorAtvLvl: (state, action: PayloadAction<number>) => {
      state.factorAtvLvl = action.payload;
    },
    setFactorAtleta: (state, action: PayloadAction<string>) => {
      state.factorAtleta = action.payload;
    },
    setEdGenValue: (state, action: PayloadAction<string>) => {
      state.edGenValue = action.payload;
    },
    setTargInpWeigth: (state, action: PayloadAction<Element | null>) => {
      state.targInpWeigth = action.payload as any;
    },
    setTargInpHeigth: (state, action: PayloadAction<Element | null>) => {
      state.targInpHeigth = action.payload as any;
    },
    setTargInpIMC: (state, action: PayloadAction<Element | null>) => {
      state.targInpIMC = action.payload as any;
    },
    setTargInpMLG: (state, action: PayloadAction<Element | null>) => {
      state.targInpMLG = action.payload as any;
    },
    setTargInpTMB: (state, action: PayloadAction<Element | null>) => {
      state.targInpTMB = action.payload as any;
    },
    setTargInpGET: (state, action: PayloadAction<Element | null>) => {
      state.targInpGET = action.payload as any;
    },
    setTargInpPGC: (state, action: PayloadAction<Element | null>) => {
      state.targInpPGC = action.payload as any;
    },
    setTargInpSumDCut: (state, action: PayloadAction<Element | null>) => {
      state.targInpSumDCut = action.payload as any;
    },
    clearEdIsAutoCorrectOn: state => {
      state.edIsAutoCorrectOn = initialState.edIsAutoCorrectOn;
    },
    clearIsAutoFillActive: state => {
      state.isAutoFillActive = initialState.isAutoFillActive;
    },
    clearAreColGroupsSimilar: state => {
      state.areColGroupsSimilar = initialState.areColGroupsSimilar;
    },
    clearAreNumConsOpsValid: state => {
      state.areNumConsOpsValid = initialState.areNumConsOpsValid;
    },
    clearNumColsCons: state => {
      state.numColsCons = initialState.numColsCons;
    },
    clearNumCons: state => {
      state.numCons = initialState.numCons;
    },
    clearNumConsLastOp: state => {
      state.numConsLastOp = initialState.numConsLastOp;
    },
    clearNumCol: state => {
      state.numCol = initialState.numCol;
    },
    clearIMC: state => {
      state.IMC = initialState.IMC;
    },
    clearMLG: state => {
      state.MLG = initialState.MLG;
    },
    clearTMB: state => {
      state.TMB = initialState.TMB;
    },
    clearGET: state => {
      state.GET = initialState.GET;
    },
    clearPGC: state => {
      state.PGC = initialState.PGC;
    },
    clearFactorAtvLvl: state => {
      state.factorAtvLvl = initialState.factorAtvLvl;
    },
    clearFactorAtleta: state => {
      state.factorAtleta = initialState.factorAtleta;
    },
    clearEdGenValue: state => {
      state.edGenValue = initialState.edGenValue;
    },
    clearTargInpWeigth: state => {
      state.targInpWeigth = initialState.targInpWeigth as any;
    },
    clearTargInpHeigth: state => {
      state.targInpHeigth = initialState.targInpHeigth as any;
    },
    clearTargInpIMC: state => {
      state.targInpIMC = initialState.targInpIMC as any;
    },
    clearTargInpMLG: state => {
      state.targInpMLG = initialState.targInpMLG as any;
    },
    clearTargInpTMB: state => {
      state.targInpTMB = initialState.targInpTMB as any;
    },
    clearTargInpGET: state => {
      state.targInpGET = initialState.targInpGET as any;
    },
    clearTargInpPGC: state => {
      state.targInpPGC = initialState.targInpPGC as any;
    },
    clearTargInpSumDCut: state => {
      state.targInpSumDCut = initialState.targInpSumDCut as any;
    },
  },
});
export const {
  setEdIsAutoCorrectOn,
  setIsAutoFillActive,
  setAreColGroupsSimilar,
  setAreNumConsOpsValid,
  setNumColsCons,
  setNumCons,
  setNumConsLastOp,
  setNumCol,
  setIMC,
  setMLG,
  setTMB,
  setGET,
  setPGC,
  setFactorAtvLvl,
  setFactorAtleta,
  setEdGenValue,
  setTargInpWeigth,
  setTargInpHeigth,
  setTargInpIMC,
  setTargInpMLG,
  setTargInpTMB,
  setTargInpGET,
  setTargInpPGC,
  setTargInpSumDCut,
  clearEdIsAutoCorrectOn,
  clearIsAutoFillActive,
  clearAreColGroupsSimilar,
  clearAreNumConsOpsValid,
  clearNumColsCons,
  clearNumCons,
  clearNumConsLastOp,
  clearNumCol,
  clearIMC,
  clearMLG,
  clearTMB,
  clearGET,
  clearPGC,
  clearFactorAtvLvl,
  clearFactorAtleta,
  clearEdGenValue,
  clearTargInpWeigth,
  clearTargInpHeigth,
  clearTargInpIMC,
  clearTargInpMLG,
  clearTargInpTMB,
  clearTargInpGET,
  clearTargInpPGC,
  clearTargInpSumDCut,
} = tabPropsSlice.actions;
export default tabPropsSlice.reducer;
