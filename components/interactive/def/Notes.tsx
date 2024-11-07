"use client";
import { nlHtEl } from "@/lib/global/declarations/types";
import { useRef, useEffect, useState, useCallback } from "react";
export default function Notes(): JSX.Element {
  const r = useRef<HTMLTextAreaElement | null>(null),
    b = useRef<nlHtEl>(null),
    it = useRef<nlHtEl>(null),
    ul = useRef<nlHtEl>(null),
    arrUp = useRef<nlHtEl>(null),
    arrDown = useRef<nlHtEl>(null),
    arrEq = useRef<nlHtEl>(null),
    kbdStyle = { maxHeight: "min-content", transition: "transform 0.2s ease-in-out" },
    [t, setT] = useState(""),
    [w, setW] = useState<number>(400),
    [i, setI] = useState<boolean>(false),
    [u, setU] = useState<boolean>(false),
    [bolded, setBolded] = useState<boolean>(false),
    [s, setS] = useState<number>(1),
    handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (!(r.current instanceof HTMLTextAreaElement)) return;
        if (e.ctrlKey || e.altKey) e.preventDefault();
        if (e.ctrlKey) {
          if (e.key === "b") {
            if (e.altKey) setW(cur => (cur = cur * 0 + 400));
            else setW(cur => (cur + 100 <= 900 ? cur + 100 : 100));
          } else if (e.key === "i") setI(i => (i = !i));
          else if (e.key === "u") setU(u => (u = !u));
        } else if (e.altKey) {
          if (e.key === "=" && e.shiftKey) setS(cur => (cur = cur * 0 + 1));
          else if ((e.key === "+" || e.key === "=") && !e.shiftKey) setS(cur => (cur + 0.1 <= 2 ? cur + 0.1 : 1));
          else if (e.key === "-") setS(cur => (cur - 0.1 >= 0.1 ? cur - 0.1 : 1));
        }
      },
      [setW, setI, setU, setS],
    ),
    applyMatrixTransform = useCallback((element: HTMLElement, incrementY: number = 1) => {
      const style = getComputedStyle(element);
      let transform = style.transform;
      console.log(transform);
      if (transform === "none" || transform === "") transform = "matrix(1, 0, 0, 1, 0, 0)";
      element.style.transform = `matrix(1, 0, 0, 1, 0, ${incrementY})`;
      setTimeout(() => {
        element.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
      }, 200);
    }, []);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    r.current.dataset.form = r.current.form?.id || "undefined";
  }, [r]);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    if (bolded) setW(cur => cur * 0 + 700);
    else setW(cur => cur * 0 + 400);
    setTimeout(() => {
      if (!(b.current instanceof HTMLElement)) return;
      if (bolded) {
        b.current.style.fontWeight = "bold";
        b.current.style.backgroundColor = "rgb(199, 196, 196)";
      } else {
        b.current.style.fontWeight = "normal";
        b.current.style.backgroundColor = "rgb(238, 238, 238)";
      }
    }, 200);
  }, [bolded, setW, b]);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    r.current.style.fontWeight = `${w}`;
  }, [w]);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    i ? (r.current.style.fontStyle = "italic") : (r.current.style.fontStyle = "normal");
    setTimeout(() => {
      if (!(it.current instanceof HTMLElement)) return;
      if (i) {
        it.current.style.fontWeight = "bold";
        it.current.style.backgroundColor = "rgb(199, 196, 196)";
      } else {
        it.current.style.fontWeight = "normal";
        it.current.style.backgroundColor = "rgb(238, 238, 238)";
      }
    }, 200);
  }, [i]);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    u ? (r.current.style.textDecoration = "underline") : (r.current.style.textDecoration = "none");
    setTimeout(() => {
      if (!(ul.current instanceof HTMLElement)) return;
      if (u) {
        ul.current.style.fontWeight = "bold";
        ul.current.style.backgroundColor = "rgb(199, 196, 196)";
      } else {
        ul.current.style.fontWeight = "normal";
        ul.current.style.backgroundColor = "rgb(238, 238, 238)";
      }
    }, 200);
  }, [u]);
  useEffect(() => {
    if (!(r.current instanceof HTMLTextAreaElement)) return;
    r.current.style.fontSize = `${s}rem`;
  }, [s]);
  return (
    <fieldset id='notesFs' name='notes_fs' data-elements={`notes`}>
      <label
        htmlFor='notes'
        id='notesLab'
        style={{ marginBottom: "0.5rem", display: "flex", gap: "0.3rem", alignItems: "baseline" }}>
        Prontuário
        <kbd
          ref={b}
          title='Pressione Crtl + B para aumentar o peso da fonte enquanto escreve (ou Crtl + Alt + B para resetar o peso)'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setBolded(cur => (cur = !cur));
          }}>
          B
        </kbd>
        <kbd
          ref={it}
          title='Pressione Ctrl + I para tornar o texto itálico enquanto escreve'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setI(i => (i = !i));
          }}>
          I
        </kbd>
        <kbd
          ref={ul}
          title='Pressione Ctrl + U para sublinhar enquanto escreve'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setU(i => (i = !i));
          }}>
          <span style={{ textDecoration: "underline" }}>U</span>
        </kbd>
        <kbd
          ref={arrUp}
          title='Pressione Alt com + para aumentar o tamanho da fonte'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setS(cur => (cur + 0.1 <= 2 ? cur + 0.1 : 1));
          }}>
          <span>+</span>
        </kbd>
        <kbd
          ref={arrDown}
          title='Pressione Alt com - para diminuir o tamanho da fonte'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setS(cur => (cur - 0.1 >= 0.1 ? cur - 0.1 : 1));
          }}>
          <span>-</span>
        </kbd>
        <kbd
          ref={arrEq}
          title='Pressione = com Shift para resetar o tamanho da fonte'
          style={kbdStyle}
          onClick={ev => {
            applyMatrixTransform(ev.currentTarget);
            setS(cur => (cur = cur * 0 + 1));
          }}>
          <span>=</span>
        </kbd>
      </label>
      <textarea
        className='form-control'
        style={{ maxWidth: "85vw" }}
        ref={r}
        value={t}
        data-weight={w}
        onInput={e => setT(e.currentTarget.value)}
        onKeyDown={e => handleKeyDown(e)}
        autoComplete='off'
        id='notes'
        name='notes'
        wrap='hard'
        rows={10}
        placeholder='Preencha aqui as notas de prontuário'></textarea>
    </fieldset>
  );
}
