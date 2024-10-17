import { ENTabsProps } from "@/lib/global/declarations/interfaces";
import { FactorAtletaValue, NafTypeValue } from "@/lib/global/declarations/testVars";
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
  factorAtleta: "peso",
  edGenValue: "masculino",
  tiw: null,
  tih: null,
  tiimc: null,
  timlg: null,
  titmb: null,
  tiget: null,
  tipgc: null,
  tidc: null,
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
      state.factorAtvLvl = action.payload as NafTypeValue;
    },
    setFactorAtleta: (state, action: PayloadAction<string>) => {
      state.factorAtleta = action.payload as FactorAtletaValue;
    },
    settiw: (state, action: PayloadAction<Element | null>) => {
      state.tiw = action.payload as any;
    },
    settih: (state, action: PayloadAction<Element | null>) => {
      state.tih = action.payload as any;
    },
    settiimc: (state, action: PayloadAction<Element | null>) => {
      state.tiimc = action.payload as any;
    },
    settimlg: (state, action: PayloadAction<Element | null>) => {
      state.timlg = action.payload as any;
    },
    settitmb: (state, action: PayloadAction<Element | null>) => {
      state.titmb = action.payload as any;
    },
    settiget: (state, action: PayloadAction<Element | null>) => {
      state.tiget = action.payload as any;
    },
    settipgc: (state, action: PayloadAction<Element | null>) => {
      state.tipgc = action.payload as any;
    },
    settidc: (state, action: PayloadAction<Element | null>) => {
      state.tidc = action.payload as any;
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
    cleartiw: state => {
      state.tiw = initialState.tiw as any;
    },
    cleartih: state => {
      state.tih = initialState.tih as any;
    },
    cleartiimc: state => {
      state.tiimc = initialState.tiimc as any;
    },
    cleartimlg: state => {
      state.timlg = initialState.timlg as any;
    },
    cleartitmb: state => {
      state.titmb = initialState.titmb as any;
    },
    cleartiget: state => {
      state.tiget = initialState.tiget as any;
    },
    cleartipgc: state => {
      state.tipgc = initialState.tipgc as any;
    },
    cleartidc: state => {
      state.tidc = initialState.tidc as any;
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
  settiw,
  settih,
  settiimc,
  settimlg,
  settitmb,
  settiget,
  settipgc,
  settidc,
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
  cleartiw,
  cleartih,
  cleartiimc,
  cleartimlg,
  cleartitmb,
  cleartiget,
  cleartipgc,
  cleartidc,
} = tabPropsSlice.actions;
export default tabPropsSlice.reducer;
