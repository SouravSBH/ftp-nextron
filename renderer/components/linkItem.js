import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MainDataContext } from "../provider/mainDataProvider";

export default function LinkItem({ type, media }) {
  const [mainData, setMainData] = useContext(MainDataContext);

  // const [isAlreadyFvrt, setIsAlreadyFvrt] = useState(
  //   mainData.mediaFvrt?.includes(media)
  // );

  return (
    <>
      <div
        href={media}
        onClick={(e) => {
          e.preventDefault();
          window.open(
            media,
            "_blank",
            "fullscreen=true, width=1600, height=900"
          );
        }}
        target="_blank"
        className="cta"
      >
        <span className="span">{media}</span>
        <span className="second">
          <svg
            width="50px"
            height="20px"
            viewBox="0 0 66 43"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="arrow"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                className="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                className="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                className="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
        </span>

        <div
          className={`third ${
            mainData.mediaFvrt != undefined &&
            mainData.mediaFvrt?.includes(media)
              ? "fav"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();

            setMainData((state) => {
              const fav =
                state.mediaFvrt != undefined && state.mediaFvrt
                  ? state.mediaFvrt
                  : [];

              if (
                mainData.mediaFvrt != undefined &&
                !mainData.mediaFvrt?.includes(media)
              ) {
                fav.push(media);
              } else {
                const index = fav.indexOf(media);
                fav.splice(index, 1);
              }

              // const fav = [];

              const newState = { ...state, mediaFvrt: fav };
              window.electron.saveData.send(newState);
              return newState;
            });
            // setIsAlreadyFvrt(!isAlreadyFvrt);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </g>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .fav {
          color: rgb(255, 255, 255);
          fill: rgb(255, 255, 255);
        }
        .cta {
          cursor: pointer;
          display: flex;
          align-items: center;
          text-decoration: none;

          font-size: 1rem;
          background: ${type != null
            ? type == "Working"
              ? "#006b4b"
              : "#ff7b00"
            : "var(--primary-color)"};
          transition: 1s;
          box-shadow: 6px 6px 0 black;

          border: none;
          margin: 1rem;
          padding-block: 1.2rem;
          padding-inline: 1rem;
        }

        .cta:focus {
          outline: none;
        }

        .cta:hover {
          transition: 0.5s;
          box-shadow: 5px 5px 0 #fbc638;

          transform: skewX(-15deg);
          font-size: 1.2rem;
        }

        .cta .second {
          transition: 0.5s;
          margin-right: 0px;
        }

        .cta:hover .second {
          transition: 0.3s;
          margin-right: 45px;
        }

        .second {
          width: 20px;
          margin-left: 30px;
          position: relative;
          top: 12%;
        }

        .one {
          transition: 0.4s;
          transform: translateX(-60%);
        }

        .two {
          transition: 0.5s;
          transform: translateX(-30%);
        }

        .cta:hover .three {
          animation: color_anim 1s infinite 0.2s;
        }

        .cta:hover .one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }

        .cta:hover .two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }
        .third {
          margin-left: auto;
          width: 1.8rem;
          transform: skew(0);
          box-sizing: border-box;
          transition: all 0.3s ease-in-out;
        }
        .cta:hover .third {
          transform: skew(15deg);
        }
        .third > svg {
          box-sizing: content-box;
          width: 1.5rem;
          padding: 0.5rem;
          margin-right: 0.3rem;
          background-color: ${mainData.mediaFvrt?.includes(media)
            ? "crimson"
            : ""};
          border-radius: 1000000px;
        }

         {
          /* .third:hover {
          transform: skewX(15deg);
        } */
        }

        .third:hover > svg {
          background-color: rgba(220, 20, 60, 0.253);
          fill: crimson;

          padding: 0.5rem;
        }
        @keyframes color_anim {
          0% {
            fill: white;
          }

          50% {
            fill: #fbc638;
          }

          100% {
            fill: white;
          }
        }
      `}</style>
    </>
  );
}

// .span {
// }
// .span:hover {
//   transform: skewX(15deg);
// }
