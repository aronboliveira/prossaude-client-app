"use client";
import ReactSpinner from "./ReactSpinner";
export default function ReactBrand(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        paddingBottom: "5rem",
      }}>
      <h2
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
        }}>
        Built with Next.js ©
      </h2>
      <ReactSpinner scale={1} width={50} height={50} />
    </div>
  );
}
